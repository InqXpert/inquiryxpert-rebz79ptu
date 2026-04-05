migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('processos_operacionais')

    const newRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || @request.auth.role = 'analista' || (@request.auth.role = 'agente' && agente_id.user_id = @request.auth.id)"

    collection.listRule = newRule
    collection.viewRule = newRule

    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('processos_operacionais')

    const oldRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || (@request.auth.role = 'agente' && agente_id.user_id = @request.auth.id)"

    collection.listRule = oldRule
    collection.viewRule = oldRule

    app.save(collection)
  },
)
