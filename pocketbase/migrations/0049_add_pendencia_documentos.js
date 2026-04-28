migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('processos_operacionais')
    col.fields.add(new BoolField({ name: 'documentos_recebidos' }))
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('processos_operacionais')
    col.fields.removeByName('documentos_recebidos')
    app.save(col)
  },
)
