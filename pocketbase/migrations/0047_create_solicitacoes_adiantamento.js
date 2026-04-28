migrate(
  (app) => {
    const collection = new Collection({
      name: 'solicitacoes_adiantamento',
      type: 'base',
      listRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id",
      viewRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id",
      createRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || @request.auth.role = 'analista'",
      updateRule: "@request.auth.role = 'c-level' || @request.auth.role = 'admin'",
      deleteRule: "@request.auth.role = 'c-level' || @request.auth.role = 'admin'",
      fields: [
        {
          name: 'processo_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('processos_operacionais').id,
          maxSelect: 1,
        },
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          maxSelect: 1,
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          values: ['pendente', 'autorizado', 'negado'],
          maxSelect: 1,
        },
        { name: 'valor_solicitado', type: 'number', required: true },
        { name: 'valor_autorizado', type: 'number' },
        { name: 'data_autorizacao', type: 'date' },
        { name: 'motivo_negacao', type: 'text' },
        { name: 'data_negacao', type: 'date' },
        { name: 'observacoes', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('solicitacoes_adiantamento')
    app.delete(collection)
  },
)
