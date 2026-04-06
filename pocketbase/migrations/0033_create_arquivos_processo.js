migrate(
  (app) => {
    const collection = new Collection({
      name: 'arquivos_processo',
      type: 'base',
      listRule:
        "@request.auth.id != '' && (agente_id.user_id = @request.auth.id || @request.auth.role = 'supervisor' || @request.auth.role = 'admin' || @request.auth.role = 'c-level')",
      viewRule:
        "@request.auth.id != '' && (agente_id.user_id = @request.auth.id || @request.auth.role = 'supervisor' || @request.auth.role = 'admin' || @request.auth.role = 'c-level')",
      createRule: "@request.auth.id != '' && agente_id.user_id = @request.auth.id",
      updateRule:
        "@request.auth.role = 'admin' || @request.auth.role = 'c-level' || (agente_id.user_id = @request.auth.id && status = 'enviado')",
      deleteRule:
        "@request.auth.role = 'admin' || @request.auth.role = 'c-level' || (agente_id.user_id = @request.auth.id && status = 'enviado')",
      fields: [
        {
          name: 'processo_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('processos_operacionais').id,
          maxSelect: 1,
        },
        {
          name: 'agente_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('agentes').id,
          maxSelect: 1,
        },
        { name: 'arquivo', type: 'file', required: true, maxSelect: 1, maxSize: 52428800 },
        { name: 'nome_arquivo', type: 'text' },
        {
          name: 'tipo_arquivo',
          type: 'select',
          values: ['foto', 'audio', 'documento', 'despesas'],
        },
        { name: 'tamanho_bytes', type: 'number' },
        {
          name: 'status',
          type: 'select',
          values: ['enviado', 'validando', 'validado', 'rejeitado'],
        },
        { name: 'motivo_rejeicao', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('arquivos_processo')
    app.delete(collection)
  },
)
