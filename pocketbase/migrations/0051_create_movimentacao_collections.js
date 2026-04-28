migrate(
  (app) => {
    const usersId = '_pb_users_auth_'

    const inter = new Collection({
      name: 'movimentacao_inter',
      type: 'base',
      listRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || user_id = @request.auth.id",
      viewRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || user_id = @request.auth.id",
      createRule: "@request.auth.id != ''",
      updateRule:
        "user_id = @request.auth.id || @request.auth.role = 'c-level' || @request.auth.role = 'admin'",
      deleteRule:
        "user_id = @request.auth.id || @request.auth.role = 'c-level' || @request.auth.role = 'admin'",
      fields: [
        { name: 'user_id', type: 'relation', required: true, collectionId: usersId, maxSelect: 1 },
        { name: 'data', type: 'date', required: true },
        { name: 'fornecedor', type: 'text', required: true },
        { name: 'identificacao', type: 'text' },
        { name: 'debito', type: 'number' },
        { name: 'credito', type: 'number' },
        { name: 'status', type: 'select', values: ['processado', 'pendente', 'cancelado'] },
        { name: 'saldo_atual', type: 'number' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_mov_inter_data ON movimentacao_inter (data)'],
    })
    app.save(inter)

    const itau = new Collection({
      name: 'movimentacao_itau',
      type: 'base',
      listRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || user_id = @request.auth.id",
      viewRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || user_id = @request.auth.id",
      createRule: "@request.auth.id != ''",
      updateRule:
        "user_id = @request.auth.id || @request.auth.role = 'c-level' || @request.auth.role = 'admin'",
      deleteRule:
        "user_id = @request.auth.id || @request.auth.role = 'c-level' || @request.auth.role = 'admin'",
      fields: [
        { name: 'user_id', type: 'relation', required: true, collectionId: usersId, maxSelect: 1 },
        { name: 'data_retirada', type: 'date', required: true },
        {
          name: 'c_level_id',
          type: 'relation',
          required: true,
          collectionId: usersId,
          maxSelect: 1,
        },
        { name: 'tipo', type: 'select', values: ['retirada', 'devolucao'] },
        { name: 'valor', type: 'number', required: true },
        { name: 'motivo', type: 'text', required: true },
        {
          name: 'status',
          type: 'select',
          values: ['pendente_devolucao', 'devolvido', 'cancelado'],
        },
        { name: 'data_devolucao', type: 'date' },
        { name: 'saldo', type: 'number' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_mov_itau_data ON movimentacao_itau (data_retirada)'],
    })
    app.save(itau)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('movimentacao_inter'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('movimentacao_itau'))
    } catch (_) {}
  },
)
