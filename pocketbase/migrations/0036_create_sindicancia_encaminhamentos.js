migrate(
  (app) => {
    const collection = new Collection({
      name: 'sindicancia_encaminhamentos',
      type: 'base',
      listRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id",
      viewRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id",
      createRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id",
      updateRule: "@request.auth.role = 'c-level' || @request.auth.role = 'admin'",
      deleteRule: "@request.auth.role = 'c-level' || @request.auth.role = 'admin'",
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
        { name: 'orientacoes', type: 'text', required: true },
        { name: 'documentos', type: 'file', maxSelect: 5, maxSize: 10485760 },
        { name: 'email_enviado', type: 'bool' },
        { name: 'whatsapp_enviado', type: 'bool' },
        { name: 'email_destinatario', type: 'text' },
        { name: 'whatsapp_destinatario', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_sind_enc_proc ON sindicancia_encaminhamentos (processo_id)'],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('sindicancia_encaminhamentos')
    app.delete(collection)
  },
)
