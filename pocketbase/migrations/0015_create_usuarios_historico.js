migrate(
  (app) => {
    const col = new Collection({
      name: 'usuarios_historico',
      type: 'base',
      listRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id",
      viewRule:
        "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || user_id = @request.auth.id",
      createRule: "@request.auth.id != ''",
      updateRule: null,
      deleteRule: null,
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          maxSelect: 1,
        },
        {
          name: 'acao',
          type: 'select',
          values: [
            'login',
            'logout',
            'cadastro_agente',
            'edicao_agente',
            'sindicancia_enviada',
            'alteracao_perfil',
            'senha_reset',
            'configuracao_app',
          ],
          required: true,
        },
        { name: 'descricao', type: 'text' },
        { name: 'ip_address', type: 'text' },
        { name: 'user_agent', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_ushist_user_acao ON usuarios_historico (user_id, acao)'],
    })
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('usuarios_historico')
    app.delete(col)
  },
)
