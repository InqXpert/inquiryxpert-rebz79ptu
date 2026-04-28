migrate(
  (app) => {
    const collection = new Collection({
      name: 'processos_despesas',
      type: 'base',
      listRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'",
      viewRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'",
      createRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'",
      updateRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'",
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
        { name: 'honorario_agente', type: 'number' },
        { name: 'despesas_agente', type: 'number' },
        { name: 'total_a_pagar', type: 'number' },
        { name: 'adiantamento', type: 'number' },
        { name: 'data_adiantamento', type: 'date' },
        { name: 'saldo_a_pagar', type: 'number' },
        { name: 'data_pagamento', type: 'date' },
        { name: 'honorario_a_receber', type: 'number' },
        { name: 'despesas_a_receber', type: 'number' },
        { name: 'iss', type: 'number' },
        { name: 'total_a_receber', type: 'number', required: true, min: 0.01 },
        { name: 'despesas_extras', type: 'number' },
        { name: 'data_recebimento', type: 'date' },
        { name: 'despesa_complemento', type: 'text' },
        { name: 'data_recebimento_2', type: 'date' },
        { name: 'iss_20', type: 'number' },
        { name: 'liquido', type: 'number' },
        { name: 'margem', type: 'number' },
        { name: 'nf_numero', type: 'text' },
        { name: 'data_emissao_nf', type: 'date' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE UNIQUE INDEX idx_proc_desp_processo_id ON processos_despesas (processo_id)',
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('processos_despesas')
    app.delete(collection)
  },
)
