migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('movimentacao_inter')
    col.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id"
    col.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id"
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('movimentacao_inter')
    col.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || user_id = @request.auth.id"
    col.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || user_id = @request.auth.id"
    app.save(col)
  },
)
