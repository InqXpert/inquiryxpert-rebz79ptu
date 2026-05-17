migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('processos_operacionais')

    // Remove legacy relation to 'clientes'
    col.fields.removeByName('cliente_id')

    // Add updated relation to 'clientes_contratos'
    col.fields.add(
      new RelationField({
        name: 'cliente_id',
        collectionId: app.findCollectionByNameOrId('clientes_contratos').id,
        cascadeDelete: false,
        maxSelect: 1,
      }),
    )

    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('processos_operacionais')

    // Revert back to 'clientes' relation
    col.fields.removeByName('cliente_id')

    col.fields.add(
      new RelationField({
        name: 'cliente_id',
        collectionId: app.findCollectionByNameOrId('clientes').id,
        cascadeDelete: false,
        maxSelect: 1,
      }),
    )

    app.save(col)
  },
)
