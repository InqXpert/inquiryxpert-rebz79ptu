migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('tipos_investigacao')
    const TIPOS = [
      { codigo: 'T_AUTO', nome: 'AUTO (SINDICÂNCIA COMPLETA)' },
      { codigo: 'T_BUSCA_BO', nome: 'BUSCA B.O / DOCUMENTOS' },
      { codigo: 'T_FAST', nome: 'FAST' },
      { codigo: 'T_PERFIL', nome: 'PERFIL' },
      { codigo: 'T_REMOTO', nome: 'REMOTO (INTERNA)' },
      { codigo: 'T_PROP_ELET', nome: 'PROPERTY RESIDENCIAL DANOS ELÉTRICOS' },
      { codigo: 'T_PROP_EQUIP', nome: 'PROPERTY RESIDENCIAL EQUIPAMENTOS' },
      { codigo: 'T_PROP_FURTO', nome: 'PROPERTY FURTO / ROUBO' },
      { codigo: 'T_PROP_MAQ', nome: 'PROPERTY MÁQUINAS' },
      { codigo: 'T_AFF_ROUBO', nome: 'AFFINITY ROUBO / FURTO' },
      { codigo: 'T_AFF_DANOS', nome: 'AFFINITY DANOS' },
      { codigo: 'T_AFF_PREST', nome: 'AFFINITY PRESTAMISTA' },
      { codigo: 'T_AFF_FIN', nome: 'AFFINITY FINANCEIRO' },
      { codigo: 'T_INV_ESP', nome: 'INVESTIGAÇÃO ESPECIAL' },
    ]

    const allowedNames = TIPOS.map((t) => t.nome)

    // Deactivate all existing types that are not in our 14 items list
    const existingRecords = app.findRecordsByFilter('tipos_investigacao', "id != ''", '', 1000, 0)
    for (const rec of existingRecords) {
      if (!allowedNames.includes(rec.getString('nome'))) {
        if (rec.getBool('ativo') === true) {
          rec.set('ativo', false)
          app.save(rec)
        }
      }
    }

    // Now upsert the 14 allowed types
    for (const t of TIPOS) {
      let record
      try {
        record = app.findFirstRecordByData('tipos_investigacao', 'nome', t.nome)
      } catch (_) {}

      if (record) {
        if (!record.getBool('ativo')) {
          record.set('ativo', true)
          app.save(record)
        }
      } else {
        record = new Record(col)

        let finalCodigo = t.codigo
        try {
          app.findFirstRecordByData('tipos_investigacao', 'codigo', finalCodigo)
          // Avoid unique constraint error if another record had this code
          finalCodigo = finalCodigo + '_' + $security.randomString(4)
        } catch (_) {}

        record.set('codigo', finalCodigo)
        record.set('nome', t.nome)
        record.set('ativo', true)
        app.save(record)
      }
    }
  },
  (app) => {
    // Safe to leave types in DB as down migration
  },
)
