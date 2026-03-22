migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('processos_operacionais')
    if (!col.fields.getByName('lido')) {
      col.fields.add(new BoolField({ name: 'lido' }))
      app.save(col)
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('processos_operacionais')
    if (col.fields.getByName('lido')) {
      col.fields.removeByName('lido')
      app.save(col)
    }
  },
)
