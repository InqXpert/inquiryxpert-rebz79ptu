migrate((app) => {
  const naturezas = app.findCollectionByNameOrId('naturezas_sinistro')
  try {
    app.findFirstRecordByData('naturezas_sinistro', 'nome', 'AFFINITY')
  } catch (_) {
    const record = new Record(naturezas)
    record.set('codigo', '04')
    record.set('nome', 'AFFINITY')
    record.set('ativo', true)
    app.save(record)
  }

  const tipos = app.findCollectionByNameOrId('tipos_investigacao')
  const novosTipos = [
    { nome: 'AFFINITY ROUBO/FURTO', codigo: 'AFF_RF' },
    { nome: 'AFFINITY DANOS', codigo: 'AFF_DAN' },
    { nome: 'AFFINITY PRESTAMISTA', codigo: 'AFF_PRE' },
    { nome: 'AFFINITY FINANCEIRO', codigo: 'AFF_FIN' },
  ]

  for (const t of novosTipos) {
    try {
      app.findFirstRecordByData('tipos_investigacao', 'nome', t.nome)
    } catch (_) {
      const record = new Record(tipos)
      record.set('codigo', t.codigo)
      record.set('nome', t.nome)
      record.set('ativo', true)
      app.save(record)
    }
  }
})
