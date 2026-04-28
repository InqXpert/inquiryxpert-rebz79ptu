onRecordAfterUpdateSuccess((e) => {
  const isPendenteNow = e.record.getString('status') === 'concluido_pendente_documentos'
  const wasPendenteBefore =
    e.record.original().getString('status') === 'concluido_pendente_documentos'

  const isFinalizadoNow =
    e.record.getString('status') === 'FINALIZADO' || e.record.getString('status') === 'concluido'
  const isDocRecebidoNow = e.record.getBool('documentos_recebidos')
  const wasDocRecebidoBefore = e.record.original().getBool('documentos_recebidos')

  const numero_processo = e.record.getString('numero_controle') || e.record.id

  if (isPendenteNow && !wasPendenteBefore) {
    const agenteId = e.record.getString('agente_id')
    if (agenteId) {
      try {
        const notifAgente = new Record($app.findCollectionByNameOrId('notificacoes_agente'))
        notifAgente.set('agente_id', agenteId)
        notifAgente.set('tipo', 'mensagem')
        notifAgente.set('titulo', 'Documentos Pendentes')
        notifAgente.set(
          'descricao',
          `Envie os documentos do processo ${numero_processo} para conclusão.`,
        )
        notifAgente.set('lida', false)
        notifAgente.set('processo_id', e.record.id)
        $app.save(notifAgente)
      } catch (err) {
        console.log('Error notifying agent', err)
      }
    }

    const supervisorId = e.record.getString('supervisor_id')
    const solicitanteId = e.record.getString('solicitante_id')

    const notifyUser = (uid) => {
      if (!uid) return
      try {
        const notifSys = new Record($app.findCollectionByNameOrId('notificacoes_sistema'))
        notifSys.set('user_id', uid)
        notifSys.set('tipo', 'pendente_documentos')
        notifSys.set('mensagem', `Processo ${numero_processo} marcado como pendente de documentos.`)
        notifSys.set('lida', false)
        $app.save(notifSys)
      } catch (err) {
        console.log('Error notifying sys', err)
      }
    }

    notifyUser(supervisorId)
    notifyUser(solicitanteId)
  }

  if ((isFinalizadoNow && wasPendenteBefore) || (isDocRecebidoNow && !wasDocRecebidoBefore)) {
    try {
      const financeUsers = $app.findRecordsByFilter(
        'users',
        "role = 'c-level' || role = 'admin'",
        '',
        0,
        0,
      )
      for (const u of financeUsers) {
        const notifSys = new Record($app.findCollectionByNameOrId('notificacoes_sistema'))
        notifSys.set('user_id', u.id)
        notifSys.set('tipo', 'pronto_faturamento')
        notifSys.set('mensagem', `Processo ${numero_processo} pronto para faturamento.`)
        notifSys.set('lida', false)
        $app.save(notifSys)
      }
    } catch (err) {
      console.log('Error notifying finance', err)
    }
  }

  e.next()
}, 'processos_operacionais')
