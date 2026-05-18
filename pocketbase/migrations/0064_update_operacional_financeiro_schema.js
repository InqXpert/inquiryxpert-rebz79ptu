migrate(
  (app) => {
    // Update controle_operacional_financeiro
    const controleCol = app.findCollectionByNameOrId('controle_operacional_financeiro')
    let controleChanged = false

    if (!controleCol.fields.getByName('aviso')) {
      controleCol.fields.add(new TextField({ name: 'aviso' }))
      controleChanged = true
    }

    if (!controleCol.fields.getByName('flag_bloqueio')) {
      controleCol.fields.add(new BoolField({ name: 'flag_bloqueio' }))
      controleChanged = true
    }

    if (controleChanged) {
      app.save(controleCol)
    }

    // Update processos_operacionais
    const operacionaisCol = app.findCollectionByNameOrId('processos_operacionais')
    let operacionaisChanged = false

    if (!operacionaisCol.fields.getByName('status_finalizacao')) {
      operacionaisCol.fields.add(
        new SelectField({
          name: 'status_finalizacao',
          values: ['PENDENTE', 'FINALIZADO'],
          maxSelect: 1,
        }),
      )
      operacionaisChanged = true
    }

    if (operacionaisChanged) {
      app.save(operacionaisCol)
    }
  },
  (app) => {
    const controleCol = app.findCollectionByNameOrId('controle_operacional_financeiro')
    let controleChanged = false

    if (controleCol.fields.getByName('aviso')) {
      controleCol.fields.removeByName('aviso')
      controleChanged = true
    }

    if (controleCol.fields.getByName('flag_bloqueio')) {
      controleCol.fields.removeByName('flag_bloqueio')
      controleChanged = true
    }

    if (controleChanged) {
      app.save(controleCol)
    }

    const operacionaisCol = app.findCollectionByNameOrId('processos_operacionais')
    if (operacionaisCol.fields.getByName('status_finalizacao')) {
      operacionaisCol.fields.removeByName('status_finalizacao')
      app.save(operacionaisCol)
    }
  },
)
