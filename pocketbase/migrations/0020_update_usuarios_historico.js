migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('usuarios_historico')

    if (!col.fields.getByName('usuario_afetado_id')) {
      col.fields.add(
        new RelationField({
          name: 'usuario_afetado_id',
          collectionId: '_pb_users_auth_',
          maxSelect: 1,
        }),
      )
    }

    const acaoField = col.fields.getByName('acao')
    if (acaoField) {
      const existingValues = acaoField.values || []
      const newValues = [
        'login',
        'logout',
        'criar_usuario',
        'editar_usuario',
        'deletar_usuario',
        'alterar_role',
        'resetar_senha',
        'habilitar_2fa',
        'criar_agente',
        'editar_agente',
        'deletar_agente',
        'criar_processo',
        'editar_processo',
        'deletar_processo',
        'exportar_dados',
        'importar_dados',
        'alterar_status_usuario',
        'alterar_status_agente',
      ]
      acaoField.values = Array.from(new Set([...existingValues, ...newValues]))
    }

    col.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id"
    col.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id"

    app.save(col)

    col.addIndex('idx_ushist_user_id', false, 'user_id', '')
    col.addIndex('idx_ushist_created', false, 'created', '')
    col.addIndex('idx_ushist_acao', false, 'acao', '')
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('usuarios_historico')
    col.fields.removeByName('usuario_afetado_id')
    col.removeIndex('idx_ushist_user_id')
    col.removeIndex('idx_ushist_created')
    col.removeIndex('idx_ushist_acao')
    app.save(col)
  },
)
