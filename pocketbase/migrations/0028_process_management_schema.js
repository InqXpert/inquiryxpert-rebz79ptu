migrate(
  (app) => {
    const processos = app.findCollectionByNameOrId('processos_operacionais')

    if (!processos.fields.getByName('cliente_id')) {
      processos.fields.add(
        new RelationField({ name: 'cliente_id', collectionId: 'clientes', maxSelect: 1 }),
      )
    }
    if (!processos.fields.getByName('seguradora_id')) {
      processos.fields.add(
        new RelationField({ name: 'seguradora_id', collectionId: 'seguradoras', maxSelect: 1 }),
      )
    }
    if (!processos.fields.getByName('natureza_sinistro_id')) {
      processos.fields.add(
        new RelationField({
          name: 'natureza_sinistro_id',
          collectionId: 'naturezas_sinistro',
          maxSelect: 1,
        }),
      )
    }
    if (!processos.fields.getByName('tipo_investigacao_id')) {
      processos.fields.add(
        new RelationField({
          name: 'tipo_investigacao_id',
          collectionId: 'tipos_investigacao',
          maxSelect: 1,
        }),
      )
    }

    const statusField = processos.fields.getByName('status')
    if (statusField && statusField.type === 'text') {
      processos.fields.removeByName('status')
      processos.fields.add(
        new SelectField({
          name: 'status',
          values: ['ANALISE_INICIAL', 'EM_EXECUCAO', 'EM_ELABORACAO', 'FINALIZADO', 'CANCELADO'],
        }),
      )
    } else if (!statusField) {
      processos.fields.add(
        new SelectField({
          name: 'status',
          values: ['ANALISE_INICIAL', 'EM_EXECUCAO', 'EM_ELABORACAO', 'FINALIZADO', 'CANCELADO'],
        }),
      )
    } else if (statusField) {
      statusField.values = [
        'ANALISE_INICIAL',
        'EM_EXECUCAO',
        'EM_ELABORACAO',
        'FINALIZADO',
        'CANCELADO',
      ]
    }

    processos.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || (@request.auth.role = 'agente' && agente_id.user_id = @request.auth.id)"
    processos.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || (@request.auth.role = 'agente' && agente_id.user_id = @request.auth.id)"
    processos.createRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'"
    processos.updateRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || (@request.auth.role = 'supervisor' && supervisor_id = @request.auth.id)"
    processos.deleteRule = "@request.auth.role = 'c-level' || @request.auth.role = 'admin'"

    app.save(processos)

    const auditLog = app.findCollectionByNameOrId('audit_log')
    if (auditLog) {
      auditLog.listRule =
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || (@request.auth.role = 'agente' && processo_id.agente_id.user_id = @request.auth.id)"
      auditLog.viewRule =
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || (@request.auth.role = 'agente' && processo_id.agente_id.user_id = @request.auth.id)"
      app.save(auditLog)
    }
  },
  (app) => {
    const processos = app.findCollectionByNameOrId('processos_operacionais')

    if (processos.fields.getByName('cliente_id')) processos.fields.removeByName('cliente_id')
    if (processos.fields.getByName('seguradora_id')) processos.fields.removeByName('seguradora_id')
    if (processos.fields.getByName('natureza_sinistro_id'))
      processos.fields.removeByName('natureza_sinistro_id')
    if (processos.fields.getByName('tipo_investigacao_id'))
      processos.fields.removeByName('tipo_investigacao_id')

    const statusField = processos.fields.getByName('status')
    if (statusField && statusField.type === 'select') {
      processos.fields.removeByName('status')
      processos.fields.add(new TextField({ name: 'status' }))
    }

    processos.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || (@request.auth.role = 'agente' && agente_id.user_id = @request.auth.id)"
    processos.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || (@request.auth.role = 'agente' && agente_id.user_id = @request.auth.id)"
    processos.createRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'"
    processos.updateRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || (@request.auth.role = 'supervisor' && supervisor_id = @request.auth.id)"
    processos.deleteRule = "@request.auth.role = 'c-level' || @request.auth.role = 'admin'"

    app.save(processos)
  },
)
