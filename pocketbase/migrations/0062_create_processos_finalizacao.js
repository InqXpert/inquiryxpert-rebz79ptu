migrate(
  (app) => {
    const collection = new Collection({
      name: 'processos_finalizacao',
      type: 'base',
      listRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'",
      viewRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'",
      createRule: "@request.auth.id != ''",
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
        { name: 'honorario_valor', type: 'number', required: true },
        { name: 'despesas_valor', type: 'number', required: false },
        { name: 'despesas_recebidas', type: 'bool', required: false },
        { name: 'gravacoes_recebidas', type: 'bool', required: false },
        {
          name: 'status_pagamento',
          type: 'select',
          required: true,
          values: ['AUTORIZADO', 'NAO_AUTORIZADO'],
          maxSelect: 1,
        },
        { name: 'flag_bloqueio', type: 'bool', required: false },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)

    const procCol = app.findCollectionByNameOrId('processos_operacionais')
    if (!procCol.fields.getByName('status_finalizacao')) {
      procCol.fields.add(
        new SelectField({
          name: 'status_finalizacao',
          values: ['PENDENTE', 'FINALIZADO'],
          maxSelect: 1,
        }),
      )
      app.save(procCol)
    }
  },
  (app) => {
    try {
      const col = app.findCollectionByNameOrId('processos_finalizacao')
      app.delete(col)
    } catch (_) {}

    try {
      const procCol = app.findCollectionByNameOrId('processos_operacionais')
      if (procCol.fields.getByName('status_finalizacao')) {
        procCol.fields.removeByName('status_finalizacao')
        app.save(procCol)
      }
    } catch (_) {}
  },
)
