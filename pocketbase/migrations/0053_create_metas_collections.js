migrate(
  (app) => {
    const metasGerais = new Collection({
      name: 'metas_gerais',
      type: 'base',
      listRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || (@request.auth.role = 'supervisor' && user_id = @request.auth.id)",
      viewRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || (@request.auth.role = 'supervisor' && user_id = @request.auth.id)",
      createRule: "@request.auth.role = 'c-level' || @request.auth.role = 'admin'",
      updateRule: "@request.auth.role = 'c-level' || @request.auth.role = 'admin'",
      deleteRule: "@request.auth.role = 'c-level' || @request.auth.role = 'admin'",
      fields: [
        { name: 'mes', type: 'number', required: true, min: 1, max: 12 },
        { name: 'ano', type: 'number', required: true },
        { name: 'meta_receita', type: 'number', required: true, min: 0 },
        { name: 'meta_custo_operacional', type: 'number', required: true, min: 0 },
        { name: 'meta_margem_liquida', type: 'number', required: true, min: 0, max: 100 },
        { name: 'meta_prazo_medio', type: 'number', required: true, min: 0 },
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE UNIQUE INDEX idx_metas_gerais_mes_ano ON metas_gerais (mes, ano)'],
    })
    app.save(metasGerais)

    const metasIndividuais = new Collection({
      name: 'metas_individuais',
      type: 'base',
      listRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || (@request.auth.role = 'supervisor' && usuario_id = @request.auth.id)",
      viewRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || (@request.auth.role = 'supervisor' && usuario_id = @request.auth.id)",
      createRule: "@request.auth.role = 'c-level' || @request.auth.role = 'admin'",
      updateRule: "@request.auth.role = 'c-level' || @request.auth.role = 'admin'",
      deleteRule: "@request.auth.role = 'c-level' || @request.auth.role = 'admin'",
      fields: [
        {
          name: 'usuario_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'meta_receita', type: 'number', required: true, min: 0 },
        { name: 'meta_processos', type: 'number', required: true, min: 0, onlyInt: true },
        { name: 'meta_margem', type: 'number', required: true, min: 0, max: 100 },
        {
          name: 'periodo',
          type: 'select',
          required: true,
          values: ['mensal', 'trimestral', 'anual'],
          maxSelect: 1,
        },
        { name: 'mes_inicio', type: 'number', required: true, min: 1, max: 12 },
        { name: 'ano_inicio', type: 'number', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE UNIQUE INDEX idx_metas_indiv_usr_per ON metas_individuais (usuario_id, periodo, mes_inicio, ano_inicio)',
      ],
    })
    app.save(metasIndividuais)
  },
  (app) => {
    try {
      const m1 = app.findCollectionByNameOrId('metas_individuais')
      app.delete(m1)
    } catch (e) {}
    try {
      const m2 = app.findCollectionByNameOrId('metas_gerais')
      app.delete(m2)
    } catch (e) {}
  },
)
