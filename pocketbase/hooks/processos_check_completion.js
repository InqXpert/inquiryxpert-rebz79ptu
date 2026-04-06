routerAdd(
  'POST',
  '/backend/v1/processos/{id}/check-completion',
  (e) => {
    const id = e.request.pathValue('id')

    const result = new DynamicModel({
      audio_count: 0,
      despesas_count: 0,
    })

    $app
      .db()
      .newQuery(
        "SELECT COUNT(CASE WHEN tipo_arquivo='audio' AND status='validado' THEN 1 END) as audio_count, COUNT(CASE WHEN tipo_arquivo='despesas' AND status='enviado' THEN 1 END) as despesas_count FROM arquivos_processo WHERE processo_id = {:id}",
      )
      .bind({ id: id })
      .one(result)

    const audio_count = result.audio_count || 0
    const despesas_count = result.despesas_count || 0

    return e.json(200, {
      audio_count: audio_count,
      despesas_count: despesas_count,
      can_conclude: audio_count > 0 && despesas_count > 0,
    })
  },
  $apis.requireAuth(),
)
