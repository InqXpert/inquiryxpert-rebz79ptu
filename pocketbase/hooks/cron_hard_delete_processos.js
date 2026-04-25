cronAdd('hard_delete_processos', '0 0 * * *', () => {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const dateStr = thirtyDaysAgo.toISOString().replace('T', ' ').substring(0, 19) + 'Z'

  const records = $app.findRecordsByFilter(
    'processos_operacionais',
    "deleted_at != '' && deleted_at <= {:date}",
    '',
    1000,
    0,
    { date: dateStr },
  )

  for (const record of records) {
    const dados = JSON.parse(JSON.stringify(record))

    try {
      const auditCol = $app.findCollectionByNameOrId('registros_auditoria_adm')
      const audit = new Record(auditCol)
      audit.set('acao', 'HARD_DELETE_PROCESS')
      audit.set('registro_afetado_id', record.id)
      audit.set('dados_registro', dados)
      audit.set('motivo', 'Automated 30-day hard delete')
      $app.save(audit)

      $app.delete(record)
    } catch (e) {
      console.log('Failed to hard delete process ' + record.id, e)
    }
  }
})
