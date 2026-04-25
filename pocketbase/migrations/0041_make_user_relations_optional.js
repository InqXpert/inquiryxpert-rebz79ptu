migrate(
  (app) => {
    const collections = [
      { name: 'usuarios_historico', field: 'user_id' },
      { name: 'usuarios_sessoes', field: 'user_id' },
      { name: 'processos_favoritos', field: 'user_id' },
      { name: 'audit_log', field: 'usuario_id' },
      { name: 'notificacoes_sistema', field: 'user_id' },
      { name: 'sindicancia_encaminhamentos', field: 'user_id' },
      { name: 'sindicancia_rascunhos', field: 'user_id' },
    ]

    for (const item of collections) {
      try {
        const col = app.findCollectionByNameOrId(item.name)
        const field = col.fields.getByName(item.field)
        if (field) {
          field.required = false
          app.save(col)
        }
      } catch (err) {
        console.log('Error updating ' + item.name, err)
      }
    }
  },
  (app) => {
    const collections = [
      { name: 'usuarios_historico', field: 'user_id' },
      { name: 'usuarios_sessoes', field: 'user_id' },
      { name: 'processos_favoritos', field: 'user_id' },
      { name: 'audit_log', field: 'usuario_id' },
      { name: 'notificacoes_sistema', field: 'user_id' },
      { name: 'sindicancia_encaminhamentos', field: 'user_id' },
      { name: 'sindicancia_rascunhos', field: 'user_id' },
    ]

    for (const item of collections) {
      try {
        const col = app.findCollectionByNameOrId(item.name)
        const field = col.fields.getByName(item.field)
        if (field) {
          field.required = true
          app.save(col)
        }
      } catch (err) {}
    }
  },
)
