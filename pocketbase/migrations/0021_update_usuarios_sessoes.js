migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('usuarios_sessoes')

    const rules =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || (@request.auth.role = 'supervisor' && @request.method = 'GET') || user_id = @request.auth.id"

    col.listRule = rules
    col.viewRule = rules
    col.createRule = rules
    col.updateRule = rules
    col.deleteRule = rules

    app.save(col)

    col.addIndex('idx_usess_user_id', false, 'user_id', '')
    col.addIndex('idx_usess_expirada', false, 'expirada', '')
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('usuarios_sessoes')

    col.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id"
    col.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id"
    col.createRule = "@request.auth.id != ''"
    col.updateRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || user_id = @request.auth.id"
    col.deleteRule = "@request.auth.role = 'c-level' || @request.auth.role = 'admin'"

    col.removeIndex('idx_usess_user_id')
    col.removeIndex('idx_usess_expirada')
    app.save(col)
  },
)
