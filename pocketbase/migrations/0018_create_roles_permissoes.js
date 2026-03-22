migrate(
  (app) => {
    const col = new Collection({
      name: 'roles_permissoes',
      type: 'base',
      listRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || role = @request.auth.role",
      viewRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || role = @request.auth.role",
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        {
          name: 'role',
          type: 'select',
          required: true,
          values: ['c-level', 'admin', 'supervisor', 'analista'],
        },
        {
          name: 'permissoes',
          type: 'json',
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_roles_permissoes_role ON roles_permissoes (role)'],
    })

    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('roles_permissoes')
    app.delete(col)
  },
)
