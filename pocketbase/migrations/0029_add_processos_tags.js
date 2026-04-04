migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('processos_operacionais')
    if (!col.fields.getByName('tags')) {
      col.fields.add(new JSONField({ name: 'tags', maxSize: 2000000 }))
    }
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('processos_operacionais')
    col.fields.removeByName('tags')
    app.save(col)
  },
)
