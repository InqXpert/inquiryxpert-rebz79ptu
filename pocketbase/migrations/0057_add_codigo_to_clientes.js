migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('clientes_contratos')
    if (!col.fields.getByName('codigo')) {
      col.fields.add(
        new TextField({
          name: 'codigo',
          required: false,
        }),
      )
      app.save(col)
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('clientes_contratos')
    col.fields.removeByName('codigo')
    app.save(col)
  },
)
