migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('processos_operacionais')
    col.fields.add(new DateField({ name: 'data_entrada_pendencia' }))
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('processos_operacionais')
    col.fields.removeByName('data_entrada_pendencia')
    app.save(col)
  },
)
