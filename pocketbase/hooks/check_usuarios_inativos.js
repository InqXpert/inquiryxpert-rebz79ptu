cronAdd('check-usuarios-inativos', '0 8 * * *', () => {
  try {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const dateStr = thirtyDaysAgo.toISOString().replace('T', ' ').substring(0, 19) + 'Z'

    const inativos = $app.findRecordsByFilter(
      'users',
      `ultimo_login < '${dateStr}' && status_conta = 'ativo'`,
      '-created',
      100,
      0,
    )

    if (!inativos || inativos.length === 0) return

    const histCollection = $app.findCollectionByNameOrId('usuarios_historico')

    let systemUser
    try {
      systemUser = $app.findFirstRecordByFilter('users', "role = 'admin' || role = 'c-level'")
    } catch (e) {}

    if (systemUser) {
      for (let user of inativos) {
        const histRecord = new Record(histCollection)
        histRecord.set('user_id', systemUser.id)
        histRecord.set('acao', 'alerta_sistema')
        histRecord.set('descricao', 'Alerta gerado: Usuário inativo por mais de 30 dias')
        histRecord.set('usuario_afetado_id', user.id)
        histRecord.set('ip_address', '127.0.0.1')
        histRecord.set('user_agent', 'Cron Job')

        $app.save(histRecord)
      }
    }
  } catch (err) {
    console.log('Erro no cron check-usuarios-inativos:', err)
  }
})
