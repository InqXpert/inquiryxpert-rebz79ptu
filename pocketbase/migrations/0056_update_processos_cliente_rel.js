migrate(
  (app) => {
    // Step 1: Remove the legacy relation to 'clientes' and save
    // This ensures PocketBase drops the field from the database
    const col1 = app.findCollectionByNameOrId('processos_operacionais')
    col1.fields.removeByName('cliente_id')
    app.save(col1)

    // Step 2: Add updated relation to 'clientes_contratos' with the same name
    // By saving this as a separate step, PocketBase treats it as a completely new field
    // instead of an update to the old one, avoiding the "relation collection cannot be changed" error.
    const col2 = app.findCollectionByNameOrId('processos_operacionais')
    col2.fields.add(
      new RelationField({
        name: 'cliente_id',
        collectionId: app.findCollectionByNameOrId('clientes_contratos').id,
        cascadeDelete: false,
        maxSelect: 1,
      }),
    )
    app.save(col2)
  },
  (app) => {
    // Step 1: Remove the updated relation
    const col1 = app.findCollectionByNameOrId('processos_operacionais')
    col1.fields.removeByName('cliente_id')
    app.save(col1)

    // Step 2: Revert back to 'clientes' relation
    const col2 = app.findCollectionByNameOrId('processos_operacionais')
    col2.fields.add(
      new RelationField({
        name: 'cliente_id',
        collectionId: app.findCollectionByNameOrId('clientes').id,
        cascadeDelete: false,
        maxSelect: 1,
      }),
    )
    app.save(col2)
  },
)
