routerAdd('OPTIONS', '/backend/v1/sync-agent-auth', (e) => {
  e.response.header().set('Access-Control-Allow-Origin', '*')
  e.response
    .header()
    .set('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
  e.response.header().set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  return e.noContent(204)
})
