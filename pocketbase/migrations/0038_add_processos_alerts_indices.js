migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('processos_operacionais')
    col.addIndex('idx_processos_data_prazo', false, 'data_prazo', '')
    col.addIndex('idx_processos_status', false, 'status', '')
    col.addIndex('idx_processos_prioridade', false, 'prioridade', '')
    col.addIndex('idx_processos_user_id', false, 'user_id', '')
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('processos_operacionais')
    col.removeIndex('idx_processos_data_prazo')
    col.removeIndex('idx_processos_status')
    col.removeIndex('idx_processos_prioridade')
    col.removeIndex('idx_processos_user_id')
    app.save(col)
  },
)
