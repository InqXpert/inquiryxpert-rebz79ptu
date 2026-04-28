onRecordAfterUpdateSuccess((e) => {
  const record = e.record
  const original = record.original()

  if (record.getString('status') === original.getString('status')) {
    return e.next()
  }

  const status = record.getString('status')

  if (status === 'autorizado') {
    const processoId = record.getString('processo_id')
    let despesas

    try {
      despesas = $app.findFirstRecordByData('processos_despesas', 'processo_id', processoId)
    } catch (_) {
      const despesasCol = $app.findCollectionByNameOrId('processos_despesas')
      despesas = new Record(despesasCol)
      despesas.set('processo_id', processoId)
      despesas.set('total_a_receber', 0)
    }

    try {
      const valorAutorizado = record.get('valor_autorizado') || 0
      const totalAPagar = despesas.get('total_a_pagar') || 0

      despesas.set('adiantamento', valorAutorizado)
      despesas.set('data_adiantamento', record.getString('data_autorizacao'))
      despesas.set('saldo_a_pagar', totalAPagar - valorAutorizado)

      $app.save(despesas)
    } catch (err) {
      $app
        .logger()
        .error('Error saving processos_despesas on adiantamento auth', 'error', err.message)
    }
  } else if (status === 'negado') {
    try {
      const notificacoes = $app.findCollectionByNameOrId('notificacoes_sistema')
      const notif = new Record(notificacoes)
      const valorSolicitado = record.get('valor_solicitado') || 0

      notif.set('user_id', record.getString('user_id'))
      notif.set('tipo', 'adiantamento_negado')
      notif.set(
        'mensagem',
        `Sua solicitação de adiantamento no valor de R$ ${valorSolicitado.toFixed(2)} foi negada. Motivo: ${record.getString('motivo_negacao')}`,
      )
      notif.set('lida', false)
      notif.set('timestamp', new Date().toISOString())

      $app.save(notif)
    } catch (err) {
      $app.logger().error('Error creating notificacao on adiantamento denial', 'error', err.message)
    }
  }

  return e.next()
}, 'solicitacoes_adiantamento')
