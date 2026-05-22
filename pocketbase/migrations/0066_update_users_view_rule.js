migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')

    // Adjust viewRule to allow any authenticated user to view profiles and their foto_url
    // This enables authenticated file requests from the Dashboard to succeed without 403 errors
    users.viewRule = "@request.auth.id != ''"

    app.save(users)
  },
  (app) => {
    const users = app.findCollectionByNameOrId('users')

    users.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || id = @request.auth.id"

    app.save(users)
  },
)
