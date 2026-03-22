onRecordAfterUpdateSuccess((e) => {
  const record = e.record
  try {
    const relatorios = $app.findRecordsByFilter(
      'relatorios_processo',
      'processo_id = {:pid}',
      '-created',
      1,
      0,
      { pid: record.id },
    )
    if (relatorios.length > 0) {
      const rel = relatorios[0]
      const status = record.get('status')
      const audioVal = record.get('audio_validado')
      const relStatus = record.get('relatorio_status')

      const pode = status === 'concluido' && audioVal === true && relStatus === 'aprovado'

      if (rel.get('pode_faturar') !== pode) {
        rel.set('pode_faturar', pode)
        $app.saveNoValidate(rel)
      }
    }
  } catch (err) {
    console.error('Erro sync faturamento', err)
  }
  e.next()
}, 'processos_operacionais')

onRecordAfterUpdateSuccess((e) => {
  const record = e.record
  try {
    const proc = $app.findRecordById('processos_operacionais', record.get('processo_id'))
    const status = proc.get('status')
    const audioVal = proc.get('audio_validado')
    const relStatus = record.get('status')

    const pode = status === 'concluido' && audioVal === true && relStatus === 'aprovado'

    let shouldSaveProc = false

    if (record.get('pode_faturar') !== pode) {
      record.set('pode_faturar', pode)
      $app.saveNoValidate(record)
    }

    if (proc.get('relatorio_status') !== relStatus) {
      proc.set('relatorio_status', relStatus)
      shouldSaveProc = true
    }

    if (shouldSaveProc) {
      $app.saveNoValidate(proc)
    }
  } catch (err) {
    console.error('Erro sync relatorio faturamento', err)
  }
  e.next()
}, 'relatorios_processo')
