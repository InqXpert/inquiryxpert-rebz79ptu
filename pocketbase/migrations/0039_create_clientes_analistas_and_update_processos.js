migrate(
  (app) => {
    const analistas = new Collection({
      name: 'clientes_analistas',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'",
      updateRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'",
      deleteRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'",
      fields: [
        {
          name: 'cliente_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('clientes_contratos').id,
          maxSelect: 1,
        },
        { name: 'nome', type: 'text', required: true },
        { name: 'email', type: 'email' },
        { name: 'telefone', type: 'text' },
        { name: 'cargo', type: 'text' },
        { name: 'ativo', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(analistas)

    const processos = app.findCollectionByNameOrId('processos_operacionais')
    processos.fields.add(new TextField({ name: 'cpf_segurado' }))
    processos.fields.add(new TextField({ name: 'nome_condutor' }))
    processos.fields.add(new TextField({ name: 'cpf_condutor' }))
    processos.fields.add(
      new RelationField({ name: 'analista_cliente_id', collectionId: analistas.id, maxSelect: 1 }),
    )
    processos.fields.add(new JSONField({ name: 'dados_terceiros' }))
    app.save(processos)
  },
  (app) => {
    const processos = app.findCollectionByNameOrId('processos_operacionais')
    processos.fields.removeByName('cpf_segurado')
    processos.fields.removeByName('nome_condutor')
    processos.fields.removeByName('cpf_condutor')
    processos.fields.removeByName('analista_cliente_id')
    processos.fields.removeByName('dados_terceiros')
    app.save(processos)

    const analistas = app.findCollectionByNameOrId('clientes_analistas')
    app.delete(analistas)
  },
)
