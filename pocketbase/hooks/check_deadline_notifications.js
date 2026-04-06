cronAdd('check_deadline', '0 8 * * *', () => {
  try {
    const now = new Date()
    const in48h = new Date(now.getTime() + 48 * 60 * 60 * 1000)
    const nowStr = now.toISOString().replace('T', ' ').substring(0, 19) + 'Z'
    const in48hStr = in48h.toISOString().replace('T', ' ').substring(0, 19) + 'Z'

    const records = $app.findRecordsByFilter(
      'processos_operacionais',
      `data_prazo >= {:now} && data_prazo <= {:in48h} && audio_validado = false && status != 'concluido'`,
      '',
      100,
      0,
      { now: nowStr, in48h: in48hStr },
    )

    const notifCol = $app.findCollectionByNameOrId('notificacoes_agente')
    const histCol = $app.findCollectionByNameOrId('usuarios_historico')

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString().replace('T', ' ').substring(0, 19) + 'Z'

    for (const record of records) {
      const agenteId = record.get('agente_id')
      if (!agenteId) continue

      try {
        $app.findFirstRecordByFilter(
          'notificacoes_agente',
          "agente_id = {:agente} && processo_id = {:processo} && tipo = 'prazo_proximo' && created >= {:today}",
          { agente: agenteId, processo: record.id, today: todayStr },
        )
        // Já notificado recentemente
        continue
      } catch (_) {}

      const notif = new Record(notifCol)
      notif.set('agente_id', agenteId)
      notif.set('processo_id', record.id)
      notif.set('tipo', 'prazo_proximo')
      notif.set('titulo', 'Atenção: Prazo Próximo')
      notif.set(
        'descricao',
        `O processo ${record.get('numero_controle') || record.id} vence em menos de 48h e possui pendências.`,
      )
      notif.set('lida', false)
      $app.save(notif)

      try {
        const agente = $app.findRecordById('agentes', agenteId)
        const hist = new Record(histCol)
        hist.set('user_id', agente.get('user_id'))
        hist.set('acao', 'notificacao_prazo_gerada')
        hist.set(
          'descricao',
          `Notificação de prazo gerada para processo ${record.get('numero_controle') || record.id}`,
        )
        $app.save(hist)
      } catch (_) {}
    }
  } catch (err) {
    console.log('Error in check_deadline_notifications cron:', err)
  }
})
