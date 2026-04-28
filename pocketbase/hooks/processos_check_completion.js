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

    const despesasResult = new DynamicModel({
      honorario_agente: 0,
      despesas_agente: 0,
    })

    let has_despesas_record = false
    try {
      $app
        .db()
        .newQuery(
          'SELECT honorario_agente, despesas_agente FROM processos_despesas WHERE processo_id = {:id}',
        )
        .bind({ id: id })
        .one(despesasResult)
      if (despesasResult.honorario_agente > 0 || despesasResult.despesas_agente > 0) {
        has_despesas_record = true
      }
    } catch (err) {
      // No despesas record
    }

    const audio_count = result.audio_count || 0
    const despesas_count = result.despesas_count || 0

    const tem_despesas = has_despesas_record || despesas_count > 0

    return e.json(200, {
      audio_count: audio_count,
      despesas_count: tem_despesas ? 1 : 0,
      has_despesas_record: tem_despesas,
      can_conclude: audio_count > 0 && tem_despesas,
    })
  },
  $apis.requireAuth(),
)
