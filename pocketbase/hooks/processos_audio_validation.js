onRecordBeforeUpdateRequest((e) => {
  const record = e.record

  // Auto-block logic if marked as concluded without validated audio
  if (record.get('status') === 'concluido' && record.get('audio_validado') !== true) {
    record.set('status', 'bloqueado_sem_audio')
  }

  e.next()
}, 'processos_operacionais')

onRecordBeforeCreateRequest((e) => {
  const record = e.record

  // Prevent creating as concluded without audio validated
  if (record.get('status') === 'concluido' && record.get('audio_validado') !== true) {
    record.set('status', 'bloqueado_sem_audio')
  }

  e.next()
}, 'processos_operacionais')
