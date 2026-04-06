routerAdd('POST', '/backend/v1/sync-agent-auth', (e) => {
  e.response.header().set('Access-Control-Allow-Origin', '*')
  e.response
    .header()
    .set('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
  e.response.header().set('Access-Control-Allow-Methods', 'POST, OPTIONS')

  const auth = e.auth
  if (!auth) {
    return e.json(401, { success: false, error: 'Não autorizado', code: 401 })
  }

  try {
    const body = e.requestInfo().body
    const agente_id = body.agente_id
    const user_id = body.user_id
    const email = body.email

    if (!agente_id || !user_id || !email) {
      return e.json(400, { success: false, error: 'Dados invalidos', code: 400 })
    }

    const role = auth.get('role')
    if (role !== 'c-level' && role !== 'admin' && role !== 'supervisor') {
      if (auth.id !== user_id) {
        return e.json(403, { success: false, error: 'Permissão negada', code: 403 })
      }
    }

    let agente
    try {
      agente = $app.findRecordById('agentes', agente_id)
    } catch (_) {
      return e.json(400, { success: false, error: 'Dados invalidos', code: 400 })
    }

    let user
    try {
      user = $app.findRecordById('users', user_id)
    } catch (_) {
      return e.json(400, { success: false, error: 'Dados invalidos', code: 400 })
    }

    agente.set('user_id', user_id)
    $app.save(agente)

    return e.json(200, {
      success: true,
      agente_id: agente_id,
      user_id: user_id,
      message: 'Sincronização concluída com sucesso',
    })
  } catch (err) {
    console.log(err)
    return e.json(500, { success: false, error: 'Erro interno do servidor', code: 500 })
  }
})
