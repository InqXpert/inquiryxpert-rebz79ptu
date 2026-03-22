migrate(
  (app) => {
    // Update Users Collection Rules
    const users = app.findCollectionByNameOrId('users')
    users.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || id = @request.auth.id"
    users.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || id = @request.auth.id"
    users.updateRule =
      "@request.auth.role = 'c-level' || (@request.auth.role = 'admin' && role != 'c-level') || id = @request.auth.id"
    users.deleteRule =
      "@request.auth.role = 'c-level' || (@request.auth.role = 'admin' && role != 'c-level')"
    app.save(users)

    // Update Historico Collection Rules
    const history = app.findCollectionByNameOrId('usuarios_historico')
    history.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id || usuario_afetado_id = @request.auth.id"
    history.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id || usuario_afetado_id = @request.auth.id"
    app.save(history)

    // Update Sessoes Collection Rules
    const sessions = app.findCollectionByNameOrId('usuarios_sessoes')
    sessions.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id"
    sessions.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id"
    app.save(sessions)

    // Update Permissoes Collection Rules
    const permissions = app.findCollectionByNameOrId('roles_permissoes')
    permissions.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || role = @request.auth.role"
    permissions.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || role = @request.auth.role"
    app.save(permissions)
  },
  (app) => {
    // Revert omitted for safety
  },
)
