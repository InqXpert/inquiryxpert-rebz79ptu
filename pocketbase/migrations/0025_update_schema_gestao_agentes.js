migrate(
  (app) => {
    // 1. Update Users Collection
    const users = app.findCollectionByNameOrId('users')
    const roleField = users.fields.getByName('role')
    if (roleField) {
      roleField.values = ['c-level', 'admin', 'supervisor', 'analista', 'agente']
    }
    app.saveNoValidate(users)

    // 2. Update Agentes Collection
    const agentes = app.findCollectionByNameOrId('agentes')
    if (!agentes.fields.getByName('user_id')) {
      agentes.fields.add(
        new RelationField({ name: 'user_id', collectionId: users.id, maxSelect: 1 }),
      )
    }
    if (!agentes.fields.getByName('nome')) {
      agentes.fields.add(new TextField({ name: 'nome' }))
    }
    if (!agentes.fields.getByName('status_conta')) {
      agentes.fields.add(
        new SelectField({ name: 'status_conta', values: ['ativo', 'suspenso', 'bloqueado'] }),
      )
    }
    if (!agentes.fields.getByName('foto_perfil')) {
      agentes.fields.add(
        new FileField({
          name: 'foto_perfil',
          maxSelect: 1,
          maxSize: 5242880,
          mimeTypes: ['image/jpeg', 'image/png'],
        }),
      )
    }
    if (!agentes.fields.getByName('criado_por')) {
      agentes.fields.add(
        new RelationField({ name: 'criado_por', collectionId: users.id, maxSelect: 1 }),
      )
    }

    const qnField = agentes.fields.getByName('qualidade_nivel')
    if (qnField)
      qnField.values = ['nivel1', 'nivel2', 'nivel3', 'nivel4', ...(qnField.values || [])]

    const enField = agentes.fields.getByName('experiencia_nivel')
    if (enField)
      enField.values = ['em_treinamento', 'junior', 'pleno', 'senior', ...(enField.values || [])]

    const cnField = agentes.fields.getByName('compliance_nivel')
    if (cnField) cnField.values = ['zero', 'parcial', 'total', ...(cnField.values || [])]

    agentes.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id"
    agentes.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id"
    app.saveNoValidate(agentes)

    try {
      agentes.addIndex('idx_agentes_status_conta_new', false, 'status_conta', '')
    } catch (e) {}
    try {
      agentes.addIndex('idx_agentes_created_new', false, 'created', '')
    } catch (e) {}
    app.save(agentes)

    // 3. Update Processos Operacionais
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
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'"
    app.saveNoValidate(processos)

    try {
      processos.addIndex('idx_proc_agente', false, 'agente_id', '')
    } catch (e) {}
    try {
      processos.addIndex('idx_proc_superv', false, 'supervisor_id', '')
    } catch (e) {}
    try {
      processos.addIndex('idx_proc_status', false, 'status', '')
    } catch (e) {}
    try {
      processos.addIndex('idx_proc_prazo', false, 'data_prazo', '')
    } catch (e) {}
    try {
      processos.addIndex('idx_proc_audio_req', false, 'audio_obrigatorio_presente', '')
    } catch (e) {}
    try {
      processos.addIndex('idx_proc_audio_val', false, 'audio_validado', '')
    } catch (e) {}
    app.save(processos)

    // 4. Create documentos_processo
    const documentos = new Collection({
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
          required: true,
          collectionId: processos.id,
          maxSelect: 1,
        },
        {
          name: 'agente_id',
          type: 'relation',
          required: true,
          collectionId: agentes.id,
          maxSelect: 1,
        },
        { name: 'arquivo_url', type: 'file', required: true, maxSelect: 1, maxSize: 52428800 },
        {
          name: 'tipo',
          type: 'select',
          required: true,
          values: ['cliente', 'agente', 'supervisor', 'audio_entrevista'],
          maxSelect: 1,
        },
        { name: 'duracao_segundos', type: 'number' },
        { name: 'versao', type: 'number' },
        { name: 'validado', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_doc_proc ON documentos_processo (processo_id)',
        'CREATE INDEX idx_doc_agt ON documentos_processo (agente_id)',
        'CREATE INDEX idx_doc_tipo ON documentos_processo (tipo)',
      ],
    })
    app.save(documentos)

    // 5. Create relatorios_processo
    const relatorios = new Collection({
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
          required: true,
          collectionId: processos.id,
          maxSelect: 1,
        },
        {
          name: 'agente_id',
          type: 'relation',
          required: true,
          collectionId: agentes.id,
          maxSelect: 1,
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
      indexes: [
        'CREATE INDEX idx_rel_proc ON relatorios_processo (processo_id)',
        'CREATE INDEX idx_rel_agt ON relatorios_processo (agente_id)',
        'CREATE INDEX idx_rel_status ON relatorios_processo (status)',
        'CREATE INDEX idx_rel_fat ON relatorios_processo (pode_faturar)',
      ],
    })
    app.save(relatorios)

    // 6. Create notificacoes_agente
    const notificacoes = new Collection({
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
          required: true,
          collectionId: agentes.id,
          maxSelect: 1,
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
      indexes: [
        'CREATE INDEX idx_notif_agt ON notificacoes_agente (agente_id)',
        'CREATE INDEX idx_notif_lida ON notificacoes_agente (lida)',
        'CREATE INDEX idx_notif_tipo ON notificacoes_agente (tipo)',
      ],
    })
    app.save(notificacoes)

    // 7. Update usuarios_historico
    const hist = app.findCollectionByNameOrId('usuarios_historico')
    const acaoField = hist.fields.getByName('acao')
    if (acaoField) {
      acaoField.values = [
        ...acaoField.values,
        'criar_agente',
        'editar_agente',
        'deletar_agente',
        'criar_processo',
        'editar_processo',
        'deletar_processo',
        'alterar_status_agente',
        'upload_audio',
        'validar_audio',
        'bloquear_processo_sem_audio',
      ]
    }
    hist.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id || usuario_afetado_id = @request.auth.id"
    app.saveNoValidate(hist)

    try {
      hist.addIndex('idx_ushist_acao_new', false, 'acao', '')
    } catch (e) {}
    app.save(hist)
  },
  (app) => {
    // Revert omitted for data safety
  },
)
