migrate(
  (app) => {
    const processosFinalizacao = app.findCollectionByNameOrId('processos_finalizacao')
    if (!processosFinalizacao.fields.getByName('aviso')) {
      processosFinalizacao.fields.add(new TextField({ name: 'aviso' }))
    }
    if (!processosFinalizacao.fields.getByName('flag_bloqueio')) {
      processosFinalizacao.fields.add(new BoolField({ name: 'flag_bloqueio' }))
    }
    app.save(processosFinalizacao)

    const collection = new Collection({
      name: 'controle_operacional_financeiro',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        {
          name: 'processo_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('processos_operacionais').id,
          maxSelect: 1,
        },
        { name: 'numero_processo', type: 'text', required: true },
        { name: 'data_finalizacao', type: 'date' },
        { name: 'honorario_valor', type: 'number' },
        { name: 'despesas_valor', type: 'number' },
        { name: 'despesas_recebidas', type: 'bool' },
        { name: 'gravacoes_recebidas', type: 'bool' },
        { name: 'status_pagamento', type: 'select', values: ['AUTORIZADO', 'NAO_AUTORIZADO'] },
        { name: 'flag_bloqueio', type: 'bool' },
        { name: 'aviso', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)
  },
  (app) => {
    try {
      const col = app.findCollectionByNameOrId('controle_operacional_financeiro')
      app.delete(col)
    } catch (e) {}

    try {
      const pf = app.findCollectionByNameOrId('processos_finalizacao')
      pf.fields.removeByName('aviso')
      app.save(pf)
    } catch (e) {}
  },
)
