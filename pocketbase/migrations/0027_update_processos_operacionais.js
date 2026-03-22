migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('processos_operacionais')

    // Clean up existing data to avoid UNIQUE constraint violation on numero_processo
    const records = app.findRecordsByFilter('processos_operacionais', '1=1', '', 0, 0)
    const seen = new Set()

    records.forEach((record) => {
      let num = record.get('numero_processo')

      // If empty or already seen, we generate a new unique value
      if (!num || seen.has(num)) {
        num = 'PROC-' + record.id.substring(0, 8).toUpperCase()

        // ensure the new one is not in seen
        while (seen.has(num)) {
          num = num + '-' + Math.floor(Math.random() * 1000)
        }

        record.set('numero_processo', num)
        app.saveNoValidate(record)
      }

      seen.add(num)
    })

    // Create the unique index safely
    try {
      collection.addIndex('idx_processos_numero_processo', true, 'numero_processo', '')
      app.save(collection)
    } catch (err) {
      console.log('Index may already exist or another error occurred:', err)
    }
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('processos_operacionais')
    try {
      collection.removeIndex('idx_processos_numero_processo')
      app.save(collection)
    } catch (err) {
      // ignore if it doesn't exist
    }
  },
)
