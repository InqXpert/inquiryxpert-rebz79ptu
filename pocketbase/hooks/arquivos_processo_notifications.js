onRecordAfterCreateSuccess((e) => {
  const arquivo = e.record
  const processoId = arquivo.get('processo_id')
  if (!processoId) return e.next()

  try {
    const processo = $app.findRecordById('processos_operacionais', processoId)
    const supervisorId = processo.get('supervisor_id')
    const agenteIdProcesso = processo.get('agente_id')
    const numeroProcesso = processo.get('numero_controle') || processoId
    const nomeArquivo = arquivo.get('nome_arquivo') || 'Arquivo'

    let agenteNome = 'Agente'
    if (agenteIdProcesso) {
      try {
        const agente = $app.findRecordById('agentes', agenteIdProcesso)
        agenteNome = agente.get('nomeCompleto') || agente.get('nome') || 'Agente'
      } catch (_) {}
    }

    let supervisorAgenteId = null
    if (supervisorId) {
      try {
        // Try to find if supervisor is mapped as an agente to satisfy foreign key constraints
        const supAgente = $app.findFirstRecordByData('agentes', 'user_id', supervisorId)
        supervisorAgenteId = supAgente.id
      } catch (_) {
        // Fallback to process agente if supervisor is not an agente
        supervisorAgenteId = agenteIdProcesso
      }
    }

    if (supervisorAgenteId) {
      const notificacoes = $app.findCollectionByNameOrId('notificacoes_agente')
      const notif = new Record(notificacoes)
      notif.set('agente_id', supervisorAgenteId)
      notif.set('tipo', 'arquivo_enviado')
      notif.set('titulo', 'Novo arquivo enviado')
      notif.set(
        'descricao',
        `Agente ${agenteNome} enviou ${nomeArquivo} para processo ${numeroProcesso}.`,
      )
      notif.set('lida', false)
      $app.save(notif)
    }

    const historicoCol = $app.findCollectionByNameOrId('usuarios_historico')
    const hist = new Record(historicoCol)
    hist.set('user_id', e.auth ? e.auth.id : supervisorId || '')
    hist.set('acao', 'notificacao_arquivo_enviado')
    hist.set(
      'descricao',
      `Notificação de arquivo ${nomeArquivo} enviado no processo ${numeroProcesso}`,
    )
    $app.save(hist)
  } catch (err) {
    console.log('Error in arquivos_processo_notifications hook:', err)
  }

  e.next()
}, 'arquivos_processo')
