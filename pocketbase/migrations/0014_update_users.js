migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')

    users.fields.add(
      new SelectField({ name: 'role', values: ['c-level', 'admin', 'supervisor', 'analista'] }),
    )
    users.fields.add(
      new SelectField({ name: 'status_conta', values: ['ativo', 'suspenso', 'bloqueado'] }),
    )
    users.fields.add(new DateField({ name: 'ultimo_login' }))
    users.fields.add(new NumberField({ name: 'tempo_uso_total' }))
    users.fields.add(
      new FileField({
        name: 'foto_perfil',
        maxSelect: 1,
        maxSize: 5242880,
        mimeTypes: ['image/jpeg', 'image/png'],
      }),
    )
    users.fields.add(new BoolField({ name: 'two_fa_enabled' }))
    users.fields.add(new TextField({ name: 'two_fa_secret' }))

    app.saveNoValidate(users)

    // Define defaults para usuários existentes
    app
      .db()
      .newQuery(
        "UPDATE users SET role = 'analista', status_conta = 'ativo' WHERE role IS NULL OR role = ''",
      )
      .execute()

    // Atualiza regras de acesso baseadas em papéis
    users.listRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || id = @request.auth.id"
    users.viewRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || id = @request.auth.id"
    users.updateRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || id = @request.auth.id"
    users.deleteRule = "@request.auth.role = 'c-level' || @request.auth.role = 'admin'"

    app.save(users)

    // Índices para performance
    users.addIndex('idx_users_role', false, 'role', '')
    users.addIndex('idx_users_status_conta', false, 'status_conta', '')
    users.addIndex('idx_users_ultimo_login', false, 'ultimo_login', '')
    app.save(users)
  },
  (app) => {
    // Downgrade omitido para segurança de dados estruturais
  },
)
