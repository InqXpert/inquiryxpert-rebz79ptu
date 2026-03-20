migrate(
  (app) => {
    const col = new Collection({
      name: 'usuarios_sessoes',
      type: 'base',
      listRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id",
      viewRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id",
      createRule: "@request.auth.id != ''",
      updateRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || user_id = @request.auth.id",
      deleteRule: "@request.auth.role = 'c-level' || @request.auth.role = 'admin'",
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          maxSelect: 1,
        },
        { name: 'token', type: 'text', required: true },
        { name: 'ip_address', type: 'text' },
        { name: 'duracao_minutos', type: 'number' },
        { name: 'expirada', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE UNIQUE INDEX idx_usess_token ON usuarios_sessoes (token)'],
    })
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('usuarios_sessoes')
    app.delete(col)
  },
)
