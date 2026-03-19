migrate(
  (app) => {
    const processos = new Collection({
      name: 'processos_operacionais',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'numero_controle', type: 'text' },
        { name: 'status', type: 'text' },
        { name: 'cia', type: 'text' },
        { name: 'tipo_servico', type: 'text' },
        { name: 'local_sinistro', type: 'text' },
        { name: 'agente_prestador', type: 'text' },
        { name: 'data_entrada', type: 'text' },
        { name: 'dias_uteis', type: 'number' },
        { name: 'data_retorno', type: 'text' },
        { name: 'data_saida', type: 'text' },
        { name: 'resultado', type: 'text' },
        { name: 'dias_totais', type: 'number' },
        { name: 'controle_cia', type: 'text' },
        { name: 'nome_segurado', type: 'text' },
        { name: 'placas_veiculos', type: 'text' },
        { name: 'analista_solicitante', type: 'text' },
        { name: 'revisor', type: 'text' },
        { name: 'observacoes', type: 'text' },
        { name: 'posicao_1', type: 'text' },
        { name: 'posicao_2', type: 'text' },
        { name: 'posicao_3', type: 'text' },
        { name: 'user_id', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(processos)

    const historico = new Collection({
      name: 'processos_historico',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'processo_id', type: 'text' },
        { name: 'tipo_evento', type: 'text' },
        { name: 'descricao', type: 'text' },
        { name: 'user_name', type: 'text' },
        { name: 'data_anteriores', type: 'text' },
        { name: 'data_novos', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(historico)

    const documentos = new Collection({
      name: 'processos_documentos',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'processo_id', type: 'text' },
        { name: 'arquivo', type: 'file', maxSelect: 1, maxSize: 52428800 },
        { name: 'name', type: 'text' },
        { name: 'size', type: 'number' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(documentos)
  },
  (app) => {
    const collections = ['processos_documentos', 'processos_historico', 'processos_operacionais']
    for (const name of collections) {
      try {
        app.delete(app.findCollectionByNameOrId(name))
      } catch (e) {}
    }
  },
)
