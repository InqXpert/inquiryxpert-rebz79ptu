migrate(
  (app) => {
    const allPermissions = [
      'crud_completo',
      'dashboard',
      'gestao_usuarios',
      'gestao_agentes',
      'gestao_analistas',
      'editar_status',
      'deletar_processos',
      'exportar_dados',
      'importar_dados',
      'criar_agentes',
      'criar_processos',
      'delegar_investigacao',
      'delegar_processos',
      'editar_proprios',
      'editar_alheios',
      'adicionar_observacoes',
      'adicionar_posicoes',
      'upload_documentos',
      'ler_todos',
      'auditoria_completa',
      'resetar_senha',
      'habilitar_2fa',
      'gerenciar_roles',
      'relatorios_financeiros',
      'configuracao_integracoes',
      'gerenciar_notificacoes',
      'visualizar_logs_seguranca',
    ]

    const adminExclude = ['gerenciar_roles', 'exportar_dados', 'editar_alheios']
    const adminPermissions = allPermissions.filter((p) => !adminExclude.includes(p))

    const supervisorPermissions = [
      'gestao_agentes',
      'gestao_analistas',
      'editar_status',
      'importar_dados',
      'criar_agentes',
      'criar_processos',
      'delegar_investigacao',
      'delegar_processos',
      'editar_proprios',
      'adicionar_observacoes',
      'adicionar_posicoes',
      'upload_documentos',
      'ler_todos',
      'gerenciar_notificacoes',
    ]

    const analistaPermissions = [
      'adicionar_observacoes',
      'adicionar_posicoes',
      'upload_documentos',
      'ler_todos',
    ]

    const roles = [
      { role: 'c-level', permissoes: allPermissions },
      { role: 'admin', permissoes: adminPermissions },
      { role: 'supervisor', permissoes: supervisorPermissions },
      { role: 'analista', permissoes: analistaPermissions },
    ]

    const col = app.findCollectionByNameOrId('roles_permissoes')

    for (const r of roles) {
      const record = new Record(col)
      record.set('role', r.role)
      record.set('permissoes', r.permissoes)
      app.save(record)
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('roles_permissoes')
    const records = app.findRecordsByFilter(col.id, '1=1', '', 100, 0)
    for (const record of records) {
      app.delete(record)
    }
  },
)
