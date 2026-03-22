migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')

    if (!users.fields.getByName('permissoes_customizadas')) {
      users.fields.add(new JSONField({ name: 'permissoes_customizadas' }))
    }

    if (!users.fields.getByName('criado_por')) {
      users.fields.add(
        new RelationField({
          name: 'criado_por',
          collectionId: '_pb_users_auth_',
          maxSelect: 1,
        }),
      )
    }

    // Rules Update
    users.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || id = @request.auth.id"
    users.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || id = @request.auth.id"
    users.createRule = "@request.auth.role = 'c-level' || @request.auth.role = 'admin'"
    users.updateRule =
      "@request.auth.role = 'c-level' || (@request.auth.role = 'admin' && role != 'c-level') || id = @request.auth.id"
    users.deleteRule =
      "@request.auth.role = 'c-level' || (@request.auth.role = 'admin' && role != 'c-level')"

    app.save(users)

    // Indexes
    users.addIndex('idx_users_criado_por', false, 'criado_por', '')
    app.save(users)
  },
  (app) => {
    const users = app.findCollectionByNameOrId('users')
    users.fields.removeByName('permissoes_customizadas')
    users.fields.removeByName('criado_por')
    users.removeIndex('idx_users_criado_por')

    users.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || id = @request.auth.id"
    users.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || id = @request.auth.id"
    users.createRule = ''
    users.updateRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || id = @request.auth.id"
    users.deleteRule = "@request.auth.role = 'c-level' || @request.auth.role = 'admin'"

    app.save(users)
  },
)
