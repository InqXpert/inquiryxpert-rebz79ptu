migrate(
  (app) => {
    const oldName = 'prestadores'
    const newName = 'agentes'

    let collection
    try {
      collection = app.findCollectionByNameOrId(oldName)
      collection.name = newName
    } catch (e) {
      collection = app.findCollectionByNameOrId(newName)
    }

    if (!collection.fields.getByName('numero_controle')) {
      collection.fields.add(new TextField({ name: 'numero_controle' }))
    }

    app.save(collection)

    try {
      collection.addIndex('idx_agentes_numero_controle', true, 'numero_controle', '')
      app.save(collection)
    } catch (e) {
      // Index might already exist
    }

    const records = app.findRecordsByFilter(
      collection.id,
      "numero_controle = '' || numero_controle = null",
      '',
      1000,
      0,
    )
    for (const record of records) {
      const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
      const rnd = Math.floor(100000 + Math.random() * 900000)
      record.set('numero_controle', `AGT-${today}-${rnd}`)
      app.saveNoValidate(record)
    }
  },
  (app) => {
    const oldName = 'prestadores'
    const newName = 'agentes'

    let collection
    try {
      collection = app.findCollectionByNameOrId(newName)
      collection.name = oldName
    } catch (e) {
      collection = app.findCollectionByNameOrId(oldName)
    }

    try {
      collection.removeIndex('idx_agentes_numero_controle')
    } catch (e) {}

    const field = collection.fields.getByName('numero_controle')
    if (field) {
      collection.fields.removeByName('numero_controle')
    }
    app.save(collection)
  },
)
