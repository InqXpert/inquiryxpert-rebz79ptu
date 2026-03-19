migrate(
  (app) => {
    const collection = new Collection({
      name: 'prestadores',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'nomeCompleto', type: 'text', required: true },
        { name: 'dataNascimento', type: 'text' },
        { name: 'cpf', type: 'text' },
        { name: 'rg', type: 'text' },
        { name: 'cnpj', type: 'text' },
        { name: 'possuiCnpj', type: 'select', values: ['Sim', 'Não'] },
        { name: 'emiteNotaFiscal', type: 'select', values: ['Sim', 'Não'] },
        { name: 'notaTerceiros', type: 'select', values: ['Sim', 'Não'] },
        { name: 'vinculoTerceiroNf', type: 'text' },
        { name: 'baseAtendimento', type: 'text' },
        { name: 'regiaoAbrangencia', type: 'text' },
        { name: 'cepBase', type: 'text' },
        { name: 'telefone', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'banco', type: 'text' },
        { name: 'agencia', type: 'text' },
        { name: 'conta', type: 'text' },
        { name: 'titularConta', type: 'text' },
        { name: 'chavePix', type: 'text' },
        { name: 'dadosBancariosTerceiros', type: 'select', values: ['Sim', 'Não'] },
        { name: 'vinculoTerceiroBanco', type: 'text' },
        { name: 'valorHonorario', type: 'number' },
        { name: 'valorKm', type: 'number' },
        { name: 'ativo', type: 'select', values: ['Sim', 'Não'] },
        { name: 'dataAtivacao', type: 'text' },
        { name: 'dataInativacao', type: 'text' },
        { name: 'naBlackList', type: 'select', values: ['Sim', 'Não'] },
        { name: 'motivoBlackList', type: 'text' },
        { name: 'outrasEmpresas', type: 'text' },
        { name: 'origemIndicacao', type: 'text' },
        { name: 'observacoes', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('prestadores')
    app.delete(collection)
  },
)
