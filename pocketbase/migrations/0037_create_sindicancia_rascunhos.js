migrate(
  (app) => {
    const collection = new Collection({
      name: 'sindicancia_rascunhos',
      type: 'base',
      listRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id",
      viewRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id",
      createRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id",
      updateRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id",
      deleteRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id",
      fields: [
        {
          name: 'processo_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('processos_operacionais').id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'orientacoes', type: 'text' },
        { name: 'documentos', type: 'file', maxSelect: 5, maxSize: 10485760 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_sind_rasc_proc ON sindicancia_rascunhos (processo_id)'],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('sindicancia_rascunhos')
    app.delete(collection)
  },
)
