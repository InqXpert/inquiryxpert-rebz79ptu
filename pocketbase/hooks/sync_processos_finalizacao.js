onRecordAfterCreateSuccess((e) => {
  const rec = e.record
  const processoId = rec.get('processo_id')
  const honorario = rec.get('honorario_valor') || 0
  const despesas = rec.get('despesas_valor') || 0

  try {
    const despesasRec = $app.findFirstRecordByData('processos_despesas', 'processo_id', processoId)
    despesasRec.set('honorario_agente', honorario)
    despesasRec.set('despesas_agente', despesas)
    despesasRec.set('total_a_pagar', honorario + despesas)
    $app.saveNoValidate(despesasRec)
  } catch (_) {
    try {
      const col = $app.findCollectionByNameOrId('processos_despesas')
      const newDespesas = new Record(col)
      newDespesas.set('processo_id', processoId)
      newDespesas.set('honorario_agente', honorario)
      newDespesas.set('despesas_agente', despesas)
      newDespesas.set('total_a_pagar', honorario + despesas)
      newDespesas.set('total_a_receber', 0)
      $app.saveNoValidate(newDespesas)
    } catch (err) {
      console.error('Error creating processos_despesas', err)
    }
  }

  try {
    const proc = $app.findRecordById('processos_operacionais', processoId)
    try {
      const ctrl = $app.findFirstRecordByData(
        'controle_operacional_financeiro',
        'processo_id',
        processoId,
      )
      ctrl.set('honorario_valor', honorario)
      ctrl.set('despesas_valor', despesas)
      ctrl.set('despesas_recebidas', rec.get('despesas_recebidas'))
      ctrl.set('gravacoes_recebidas', rec.get('gravacoes_recebidas'))
      ctrl.set('status_pagamento', rec.get('status_pagamento'))
      ctrl.set('flag_bloqueio', rec.get('flag_bloqueio'))
      ctrl.set('aviso', rec.get('aviso'))
      $app.saveNoValidate(ctrl)
    } catch (_) {
      const col = $app.findCollectionByNameOrId('controle_operacional_financeiro')
      const newCtrl = new Record(col)
      newCtrl.set('processo_id', processoId)
      newCtrl.set('numero_processo', proc.get('numero_controle') || proc.get('id'))
      newCtrl.set('honorario_valor', honorario)
      newCtrl.set('despesas_valor', despesas)
      newCtrl.set('despesas_recebidas', rec.get('despesas_recebidas'))
      newCtrl.set('gravacoes_recebidas', rec.get('gravacoes_recebidas'))
      newCtrl.set('status_pagamento', rec.get('status_pagamento'))
      newCtrl.set('flag_bloqueio', rec.get('flag_bloqueio'))
      newCtrl.set('aviso', rec.get('aviso'))
      newCtrl.set('data_finalizacao', new Date().toISOString())
      $app.saveNoValidate(newCtrl)
    }
  } catch (err) {
    console.error('Error syncing controle_operacional_financeiro', err)
  }

  e.next()
}, 'processos_finalizacao')

onRecordAfterUpdateSuccess((e) => {
  const rec = e.record
  const processoId = rec.get('processo_id')
  const honorario = rec.get('honorario_valor') || 0
  const despesas = rec.get('despesas_valor') || 0

  try {
    const despesasRec = $app.findFirstRecordByData('processos_despesas', 'processo_id', processoId)
    despesasRec.set('honorario_agente', honorario)
    despesasRec.set('despesas_agente', despesas)
    despesasRec.set('total_a_pagar', honorario + despesas)
    $app.saveNoValidate(despesasRec)
  } catch (_) {
    try {
      const col = $app.findCollectionByNameOrId('processos_despesas')
      const newDespesas = new Record(col)
      newDespesas.set('processo_id', processoId)
      newDespesas.set('honorario_agente', honorario)
      newDespesas.set('despesas_agente', despesas)
      newDespesas.set('total_a_pagar', honorario + despesas)
      newDespesas.set('total_a_receber', 0)
      $app.saveNoValidate(newDespesas)
    } catch (err) {
      console.error('Error creating processos_despesas', err)
    }
  }

  try {
    const proc = $app.findRecordById('processos_operacionais', processoId)
    try {
      const ctrl = $app.findFirstRecordByData(
        'controle_operacional_financeiro',
        'processo_id',
        processoId,
      )
      ctrl.set('honorario_valor', honorario)
      ctrl.set('despesas_valor', despesas)
      ctrl.set('despesas_recebidas', rec.get('despesas_recebidas'))
      ctrl.set('gravacoes_recebidas', rec.get('gravacoes_recebidas'))
      ctrl.set('status_pagamento', rec.get('status_pagamento'))
      ctrl.set('flag_bloqueio', rec.get('flag_bloqueio'))
      ctrl.set('aviso', rec.get('aviso'))
      $app.saveNoValidate(ctrl)
    } catch (_) {
      const col = $app.findCollectionByNameOrId('controle_operacional_financeiro')
      const newCtrl = new Record(col)
      newCtrl.set('processo_id', processoId)
      newCtrl.set('numero_processo', proc.get('numero_controle') || proc.get('id'))
      newCtrl.set('honorario_valor', honorario)
      newCtrl.set('despesas_valor', despesas)
      newCtrl.set('despesas_recebidas', rec.get('despesas_recebidas'))
      newCtrl.set('gravacoes_recebidas', rec.get('gravacoes_recebidas'))
      newCtrl.set('status_pagamento', rec.get('status_pagamento'))
      newCtrl.set('flag_bloqueio', rec.get('flag_bloqueio'))
      newCtrl.set('aviso', rec.get('aviso'))
      newCtrl.set('data_finalizacao', new Date().toISOString())
      $app.saveNoValidate(newCtrl)
    }
  } catch (err) {
    console.error('Error syncing controle_operacional_financeiro', err)
  }

  e.next()
}, 'processos_finalizacao')
