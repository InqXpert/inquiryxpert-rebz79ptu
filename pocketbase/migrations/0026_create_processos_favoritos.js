migrate(
  (app) => {
    const collection = new Collection({
      name: 'processos_favoritos',
      type: 'base',
      listRule: "@request.auth.id != '' && user_id = @request.auth.id",
      viewRule: "@request.auth.id != '' && user_id = @request.auth.id",
      createRule: "@request.auth.id != '' && user_id = @request.auth.id",
      updateRule: "@request.auth.id != '' && user_id = @request.auth.id",
      deleteRule: "@request.auth.id != '' && user_id = @request.auth.id",
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        {
          name: 'processo_id',
          type: 'relation',
          required: true,
          collectionId: 'processos_operacionais',
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE UNIQUE INDEX idx_proc_fav_user_proc ON processos_favoritos (user_id, processo_id)',
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('processos_favoritos')
    app.delete(collection)
  },
)
