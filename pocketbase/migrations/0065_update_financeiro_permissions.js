migrate(
  (app) => {
    const despesas = app.findCollectionByNameOrId('processos_despesas')
    const baseRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || @request.auth.role = 'analista'"

    despesas.listRule = baseRule
    despesas.viewRule = baseRule
    despesas.createRule = baseRule
    despesas.updateRule = baseRule
    app.save(despesas)

    const finalizacao = app.findCollectionByNameOrId('processos_finalizacao')
    finalizacao.listRule = baseRule
    finalizacao.viewRule = baseRule
    finalizacao.updateRule = baseRule
    app.save(finalizacao)
  },
  (app) => {
    const despesas = app.findCollectionByNameOrId('processos_despesas')
    const oldRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'"

    despesas.listRule = oldRule
    despesas.viewRule = oldRule
    despesas.createRule = oldRule
    despesas.updateRule = oldRule
    app.save(despesas)

    const finalizacao = app.findCollectionByNameOrId('processos_finalizacao')
    finalizacao.listRule = oldRule
    finalizacao.viewRule = oldRule
    finalizacao.updateRule = "@request.auth.role = 'c-level' || @request.auth.role = 'admin'"
    app.save(finalizacao)
  },
)
