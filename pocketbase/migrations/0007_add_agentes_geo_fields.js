migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('agentes')

    if (!col.fields.getByName('base_atendimento_estado')) {
      col.fields.add(new TextField({ name: 'base_atendimento_estado' }))
    }
    if (!col.fields.getByName('base_atendimento_cidade')) {
      col.fields.add(new TextField({ name: 'base_atendimento_cidade' }))
    }
    if (!col.fields.getByName('valor_hora')) {
      col.fields.add(new NumberField({ name: 'valor_hora' }))
    }

    app.save(col)

    try {
      col.addIndex(
        'idx_agentes_estado_cidade',
        false,
        'base_atendimento_estado, base_atendimento_cidade',
        '',
      )
      app.save(col)
    } catch (e) {
      // Index might already exist
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('agentes')

    try {
      col.removeIndex('idx_agentes_estado_cidade')
    } catch (e) {}

    const fieldsToRemove = ['base_atendimento_estado', 'base_atendimento_cidade', 'valor_hora']
    for (const f of fieldsToRemove) {
      if (col.fields.getByName(f)) {
        col.fields.removeByName(f)
      }
    }

    app.save(col)
  },
)
