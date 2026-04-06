onRecordAfterUpdateSuccess((e) => {
  const arquivo = e.record
  if (arquivo.get('status') !== 'rejeitado') {
    return e.next()
  }

  try {
    const agenteId = arquivo.get('agente_id')
    const processoId = arquivo.get('processo_id')
    if (!agenteId) return e.next()

    // Evitar duplicatas em um curto período
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    const timeStr = oneHourAgo.toISOString().replace('T', ' ').substring(0, 19) + 'Z'

    try {
      $app.findFirstRecordByFilter(
        'notificacoes_agente',
        "agente_id = {:agente} && processo_id = {:processo} && tipo = 'arquivo_rejeitado' && created >= {:time}",
        { agente: agenteId, processo: processoId, time: timeStr },
      )
      // Já notificado recentemente
      return e.next()
    } catch (_) {}

    const nomeArquivo = arquivo.get('nome_arquivo') || 'Arquivo'
    const motivo = arquivo.get('motivo_rejeicao') || 'Nenhum motivo especificado.'

    const notifCol = $app.findCollectionByNameOrId('notificacoes_agente')
    const notif = new Record(notifCol)
    notif.set('agente_id', agenteId)
    notif.set('processo_id', processoId)
    notif.set('tipo', 'arquivo_rejeitado')
    notif.set('titulo', 'Documento Rejeitado')
    notif.set('descricao', `Seu arquivo "${nomeArquivo}" foi rejeitado. Motivo: ${motivo}`)
    notif.set('lida', false)
    $app.save(notif)

    const histCol = $app.findCollectionByNameOrId('usuarios_historico')
    const hist = new Record(histCol)
    hist.set('user_id', e.auth ? e.auth.id : '')
    hist.set('acao', 'notificacao_rejeicao_enviada')
    hist.set('descricao', `Notificação de arquivo rejeitado enviada (Arquivo: ${nomeArquivo})`)

    try {
      const agente = $app.findRecordById('agentes', agenteId)
      hist.set('usuario_afetado_id', agente.get('user_id'))
    } catch (_) {}

    $app.save(hist)
  } catch (err) {
    console.log('Error in on_file_rejection hook:', err)
  }

  e.next()
}, 'arquivos_processo')
