migrate(
  (app) => {
    let user
    try {
      user = app.findAuthRecordByEmail('_pb_users_auth_', 'valmor.junior@inquiry.com.br')
    } catch (_) {
      const users = app.findCollectionByNameOrId('_pb_users_auth_')
      user = new Record(users)
      user.setEmail('valmor.junior@inquiry.com.br')
      user.setPassword('Skip@Pass')
      user.setVerified(true)
      user.set('name', 'Admin')
      user.set('role', 'c-level')
      app.save(user)
    }

    const interCol = app.findCollectionByNameOrId('movimentacao_inter')
    if (app.countRecords('movimentacao_inter') === 0) {
      const d1 = new Record(interCol)
      d1.set('user_id', user.id)
      d1.set('data', new Date().toISOString())
      d1.set('fornecedor', 'Zurich Seguros')
      d1.set('identificacao', 'PGTO NF 123')
      d1.set('credito', 15000)
      d1.set('debito', 0)
      d1.set('status', 'processado')
      d1.set('saldo_atual', 125000)
      app.save(d1)

      const d2 = new Record(interCol)
      d2.set('user_id', user.id)
      d2.set('data', new Date(Date.now() - 86400000).toISOString())
      d2.set('fornecedor', 'Cooperlink')
      d2.set('identificacao', 'Serviços TI')
      d2.set('credito', 0)
      d2.set('debito', 3500)
      d2.set('status', 'processado')
      d2.set('saldo_atual', 110000)
      app.save(d2)
    }

    const itauCol = app.findCollectionByNameOrId('movimentacao_itau')
    if (app.countRecords('movimentacao_itau') === 0) {
      const i1 = new Record(itauCol)
      i1.set('user_id', user.id)
      i1.set('c_level_id', user.id)
      i1.set('data_retirada', new Date().toISOString())
      i1.set('tipo', 'retirada')
      i1.set('valor', 5000)
      i1.set('motivo', 'Despesa operacional')
      i1.set('status', 'pendente_devolucao')
      i1.set('saldo', 5000)
      app.save(i1)
    }
  },
  (app) => {
    const interCol = app.findCollectionByNameOrId('movimentacao_inter')
    app.truncateCollection(interCol)
    const itauCol = app.findCollectionByNameOrId('movimentacao_itau')
    app.truncateCollection(itauCol)
  },
)
