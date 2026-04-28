migrate(
  (app) => {
    const processos = app.findRecordsByFilter(
      'processos_operacionais',
      "status = 'Concluído' || status ~ 'Pendente de Documentos'",
      '-created',
      10,
      0,
    )
    const col = app.findCollectionByNameOrId('processos_despesas')

    for (const proc of processos) {
      try {
        app.findFirstRecordByData('processos_despesas', 'processo_id', proc.id)
      } catch (_) {
        const record = new Record(col)
        record.set('processo_id', proc.id)
        record.set('honorario_agente', 150)
        record.set('despesas_agente', 50)

        const agenteId = proc.getString('agente_id')
        record.set('total_a_pagar', agenteId ? 200 : 0)

        record.set('adiantamento', 0)
        record.set('saldo_a_pagar', agenteId ? 200 : 0)

        record.set('honorario_a_receber', 500)
        record.set('despesas_a_receber', 100)
        record.set('iss', 25)
        record.set('total_a_receber', 600)
        record.set('liquido', 375)
        record.set('margem', 66.67)
        record.set('nf_numero', 'NF-2026-' + proc.id.substring(0, 4))

        app.save(record)
      }
    }
  },
  (app) => {
    const records = app.findRecordsByFilter('processos_despesas', '1=1', '', 1000, 0)
    for (const record of records) {
      app.delete(record)
    }
  },
)
