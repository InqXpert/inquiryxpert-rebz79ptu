migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('clientes_contratos')

    if (!col.fields.getByName('regras_sla')) {
      col.fields.add(
        new JSONField({
          name: 'regras_sla',
          required: false,
          maxSize: 2000000,
        }),
      )
    }

    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('clientes_contratos')

    if (col.fields.getByName('regras_sla')) {
      col.fields.removeByName('regras_sla')
      app.save(col)
    }
  },
)
