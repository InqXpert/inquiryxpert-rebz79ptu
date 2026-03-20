migrate(
  (app) => {
    let collection
    try {
      collection = app.findCollectionByNameOrId('prestadores')
      collection.name = 'agentes'
    } catch (e) {
      collection = app.findCollectionByNameOrId('agentes')
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
      'agentes',
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
    const collection = app.findCollectionByNameOrId('agentes')
    collection.name = 'prestadores'
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
