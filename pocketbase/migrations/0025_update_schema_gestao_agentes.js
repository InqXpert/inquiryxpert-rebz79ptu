migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')
    const roleField = users.fields.getByName('role')
    if (roleField && !roleField.values.includes('agente')) {
      roleField.values.push('agente')
      app.saveNoValidate(users)
    }

    const agentes = app.findCollectionByNameOrId('agentes')
    if (!agentes.fields.getByName('user_id'))
      agentes.fields.add(
        new RelationField({ name: 'user_id', collectionId: users.id, maxSelect: 1 }),
      )
    if (!agentes.fields.getByName('nome')) agentes.fields.add(new TextField({ name: 'nome' }))
    if (!agentes.fields.getByName('status_conta'))
      agentes.fields.add(
        new SelectField({ name: 'status_conta', values: ['ativo', 'suspenso', 'bloqueado'] }),
      )
    if (!agentes.fields.getByName('foto_perfil'))
      agentes.fields.add(
        new FileField({
          name: 'foto_perfil',
          maxSelect: 1,
          maxSize: 5242880,
          mimeTypes: ['image/jpeg', 'image/png'],
        }),
      )
    if (!agentes.fields.getByName('criado_por'))
      agentes.fields.add(
        new RelationField({ name: 'criado_por', collectionId: users.id, maxSelect: 1 }),
      )

    agentes.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id"
    agentes.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id"
    app.saveNoValidate(agentes)

    const processos = app.findCollectionByNameOrId('processos_operacionais')
    if (!processos.fields.getByName('numero_processo'))
      processos.fields.add(new TextField({ name: 'numero_processo' }))
    if (!processos.fields.getByName('agente_id'))
      processos.fields.add(
        new RelationField({ name: 'agente_id', collectionId: agentes.id, maxSelect: 1 }),
      )
    if (!processos.fields.getByName('supervisor_id'))
      processos.fields.add(
        new RelationField({ name: 'supervisor_id', collectionId: users.id, maxSelect: 1 }),
      )
    if (!processos.fields.getByName('data_prazo'))
      processos.fields.add(new DateField({ name: 'data_prazo' }))
    if (!processos.fields.getByName('data_conclusao'))
      processos.fields.add(new DateField({ name: 'data_conclusao' }))
    if (!processos.fields.getByName('prioridade'))
      processos.fields.add(
        new SelectField({ name: 'prioridade', values: ['baixa', 'media', 'alta'] }),
      )
    if (!processos.fields.getByName('descricao'))
      processos.fields.add(new TextField({ name: 'descricao' }))
    if (!processos.fields.getByName('orientacoes'))
      processos.fields.add(new TextField({ name: 'orientacoes' }))
    if (!processos.fields.getByName('relatorio_status'))
      processos.fields.add(
        new SelectField({
          name: 'relatorio_status',
          values: ['rascunho', 'enviado', 'revisado', 'aprovado'],
        }),
      )
    if (!processos.fields.getByName('audio_obrigatorio_presente'))
      processos.fields.add(new BoolField({ name: 'audio_obrigatorio_presente' }))
    if (!processos.fields.getByName('audio_validado'))
      processos.fields.add(new BoolField({ name: 'audio_validado' }))
    if (!processos.fields.getByName('data_validacao_audio'))
      processos.fields.add(new DateField({ name: 'data_validacao_audio' }))

    const stField = processos.fields.getByName('status')
    if (stField) {
      stField.type = 'select'
      stField.maxSelect = 1
      stField.values = [
        'em_andamento',
        'concluido',
        'pendente',
        'bloqueado_sem_audio',
        'em_elaboracao',
        'em_execucao',
        'finalizado',
        'cancelado',
        'analise_inicial',
      ]
    }
    processos.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || agente_id.user_id = @request.auth.id"
    processos.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || agente_id.user_id = @request.auth.id"
    processos.updateRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || agente_id.user_id = @request.auth.id"
    app.saveNoValidate(processos)

    try {
      app.findCollectionByNameOrId('documentos_processo')
    } catch {
      const doc = new Collection({
        name: 'documentos_processo',
        type: 'base',
        listRule:
          "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || agente_id.user_id = @request.auth.id",
        viewRule:
          "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || agente_id.user_id = @request.auth.id",
        createRule:
          "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || agente_id.user_id = @request.auth.id",
        updateRule:
          "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || agente_id.user_id = @request.auth.id",
        deleteRule:
          "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'",
        fields: [
          {
            name: 'processo_id',
            type: 'relation',
            collectionId: processos.id,
            maxSelect: 1,
            required: true,
          },
          {
            name: 'agente_id',
            type: 'relation',
            collectionId: agentes.id,
            maxSelect: 1,
            required: true,
          },
          { name: 'arquivo', type: 'file', maxSelect: 1, maxSize: 104857600, required: true },
          {
            name: 'tipo',
            type: 'select',
            values: ['cliente', 'agente', 'supervisor', 'audio_entrevista'],
            maxSelect: 1,
            required: true,
          },
          { name: 'duracao_segundos', type: 'number' },
          { name: 'versao', type: 'number' },
          { name: 'validado', type: 'bool' },
          { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
          { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
        ],
      })
      app.save(doc)
    }

    try {
      app.findCollectionByNameOrId('relatorios_processo')
    } catch {
      const rel = new Collection({
        name: 'relatorios_processo',
        type: 'base',
        listRule:
          "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || agente_id.user_id = @request.auth.id",
        viewRule:
          "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || agente_id.user_id = @request.auth.id",
        createRule:
          "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || agente_id.user_id = @request.auth.id",
        updateRule:
          "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || agente_id.user_id = @request.auth.id",
        deleteRule:
          "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'",
        fields: [
          {
            name: 'processo_id',
            type: 'relation',
            collectionId: processos.id,
            maxSelect: 1,
            required: true,
          },
          {
            name: 'agente_id',
            type: 'relation',
            collectionId: agentes.id,
            maxSelect: 1,
            required: true,
          },
          { name: 'conteudo', type: 'text' },
          {
            name: 'status',
            type: 'select',
            values: ['rascunho', 'enviado', 'revisado', 'aprovado'],
            maxSelect: 1,
          },
          { name: 'data_envio', type: 'date' },
          { name: 'data_aprovacao', type: 'date' },
          { name: 'feedback_supervisor', type: 'text' },
          { name: 'pode_faturar', type: 'bool' },
          { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
          { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
        ],
      })
      app.save(rel)
    }

    try {
      app.findCollectionByNameOrId('notificacoes_agente')
    } catch {
      const notif = new Collection({
        name: 'notificacoes_agente',
        type: 'base',
        listRule:
          "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || agente_id.user_id = @request.auth.id",
        viewRule:
          "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || agente_id.user_id = @request.auth.id",
        createRule:
          "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'",
        updateRule:
          "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || agente_id.user_id = @request.auth.id",
        deleteRule:
          "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'",
        fields: [
          {
            name: 'agente_id',
            type: 'relation',
            collectionId: agentes.id,
            maxSelect: 1,
            required: true,
          },
          {
            name: 'tipo',
            type: 'select',
            values: [
              'novo_processo',
              'prazo_proximo',
              'mensagem',
              'treinamento',
              'audio_obrigatorio_faltando',
            ],
            maxSelect: 1,
          },
          { name: 'titulo', type: 'text', required: true },
          { name: 'descricao', type: 'text' },
          { name: 'lida', type: 'bool' },
          { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
          { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
        ],
      })
      app.save(notif)
    }

    const hist = app.findCollectionByNameOrId('usuarios_historico')
    const acaoField2 = hist.fields.getByName('acao')
    if (acaoField2) {
      const newActions = [
        'criar_agente',
        'editar_agente',
        'deletar_agente',
        'criar_processo',
        'editar_processo',
        'deletar_processo',
        'upload_audio',
        'validar_audio',
        'bloquear_processo_sem_audio',
        'liberar_para_pagamento',
        'alterar_status_agente',
      ]
      newActions.forEach((a) => {
        if (!acaoField2.values.includes(a)) acaoField2.values.push(a)
      })
    }
    app.saveNoValidate(hist)
  },
  (app) => {},
)
