migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('usuarios_historico')
    if (!collection) return
    const acaoField = collection.fields.getByName('acao')
    if (acaoField) {
      const values = acaoField.selectValues || []
      let updated = false
      if (!values.includes('notificacao_enviada')) {
        values.push('notificacao_enviada')
        updated = true
      }
      if (!values.includes('alerta_sistema')) {
        values.push('alerta_sistema')
        updated = true
      }
      if (updated) {
        acaoField.selectValues = values
        app.save(collection)
      }
    }
  },
  (app) => {
    // Skipping down migration to prevent data loss in a vital enum field
  },
)
