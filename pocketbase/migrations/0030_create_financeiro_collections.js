migrate(
  (app) => {
    const listViewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'"
    const writeRule = "@request.auth.role = 'c-level' || @request.auth.role = 'admin'"

    const clientesContratos = new Collection({
      name: 'clientes_contratos',
      type: 'base',
      listRule: listViewRule,
      viewRule: listViewRule,
      createRule: writeRule,
      updateRule: writeRule,
      deleteRule: writeRule,
      fields: [
        { name: 'razao_social', type: 'text', required: true },
        { name: 'cnpj', type: 'text', required: true },
        { name: 'email_contato', type: 'text' },
        { name: 'tipo_emissao', type: 'select', values: ['unitaria_processo', 'unitaria_lote'] },
        {
          name: 'periodo_faturamento',
          type: 'select',
          values: ['mensal', 'trimestral', 'por_demanda'],
        },
        { name: 'dia_corte', type: 'number' },
        {
          name: 'agrupamento',
          type: 'select',
          values: ['por_supervisor', 'por_tipo', 'por_regiao', 'sem_agrupamento'],
        },
        { name: 'condicao_pagamento', type: 'text' },
        { name: 'tipo_imposto', type: 'select', values: ['ISS', 'ICMS', 'INSS', 'IR', 'nenhum'] },
        { name: 'aliquota_imposto', type: 'number' },
        { name: 'retencao_na_fonte', type: 'bool' },
        { name: 'aliquota_retencao', type: 'number' },
        { name: 'status', type: 'select', values: ['ativo', 'inativo'] },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE UNIQUE INDEX idx_clientes_contratos_cnpj ON clientes_contratos (cnpj)'],
    })
    app.save(clientesContratos)

    const periodosFaturamento = new Collection({
      name: 'periodos_faturamento',
      type: 'base',
      listRule: listViewRule,
      viewRule: listViewRule,
      createRule: writeRule,
      updateRule: writeRule,
      deleteRule: writeRule,
      fields: [
        {
          name: 'cliente_id',
          type: 'relation',
          collectionId: clientesContratos.id,
          required: true,
          maxSelect: 1,
        },
        { name: 'data_inicio', type: 'date', required: true },
        { name: 'data_fim', type: 'date', required: true },
        { name: 'status', type: 'select', values: ['aberto', 'fechado', 'faturado', 'pago'] },
        { name: 'total_processos', type: 'number' },
        { name: 'faturamento_total', type: 'number' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(periodosFaturamento)

    const notasFiscais = new Collection({
      name: 'notas_fiscais',
      type: 'base',
      listRule: listViewRule,
      viewRule: listViewRule,
      createRule: writeRule,
      updateRule: writeRule,
      deleteRule: writeRule,
      fields: [
        { name: 'numero_nf', type: 'text', required: true },
        {
          name: 'cliente_id',
          type: 'relation',
          collectionId: clientesContratos.id,
          required: true,
          maxSelect: 1,
        },
        {
          name: 'periodo_id',
          type: 'relation',
          collectionId: periodosFaturamento.id,
          required: true,
          maxSelect: 1,
        },
        { name: 'data_emissao', type: 'date', required: true },
        { name: 'valor_total', type: 'number' },
        { name: 'impostos', type: 'number' },
        { name: 'valor_liquido', type: 'number' },
        { name: 'status', type: 'select', values: ['emitida', 'enviada', 'paga', 'cancelada'] },
        { name: 'data_vencimento', type: 'date' },
        { name: 'data_pagamento', type: 'date' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE UNIQUE INDEX idx_notas_fiscais_numero_nf ON notas_fiscais (numero_nf)'],
    })
    app.save(notasFiscais)
  },
  (app) => {
    try {
      const nf = app.findCollectionByNameOrId('notas_fiscais')
      app.delete(nf)
    } catch (_) {}
    try {
      const pf = app.findCollectionByNameOrId('periodos_faturamento')
      app.delete(pf)
    } catch (_) {}
    try {
      const cc = app.findCollectionByNameOrId('clientes_contratos')
      app.delete(cc)
    } catch (_) {}
  },
)
