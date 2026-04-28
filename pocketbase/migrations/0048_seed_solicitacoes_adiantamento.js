migrate(
  (app) => {
    try {
      app.findFirstRecordByData('solicitacoes_adiantamento', 'status', 'pendente')
      return // already seeded
    } catch (_) {}

    try {
      const processos = app.findRecordsByFilter('processos_operacionais', "status != ''", '', 1, 0)
      if (processos.length === 0) return

      const users = app.findRecordsByFilter('_pb_users_auth_', "role = 'analista'", '', 1, 0)
      if (users.length === 0) return

      const col = app.findCollectionByNameOrId('solicitacoes_adiantamento')
      const r1 = new Record(col)
      r1.set('processo_id', processos[0].id)
      r1.set('user_id', users[0].id)
      r1.set('status', 'pendente')
      r1.set('valor_solicitado', 500.0)
      app.save(r1)
    } catch (e) {}
  },
  (app) => {
    // down not needed for seed
  },
)
