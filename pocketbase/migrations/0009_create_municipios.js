migrate(
  (app) => {
    const col = new Collection({
      name: 'municipios',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: 'nome', type: 'text', required: true },
        { name: 'uf', type: 'text', required: true },
        { name: 'latitude', type: 'number', required: true },
        { name: 'longitude', type: 'number', required: true },
        { name: 'created', type: 'autodate', onCreate: true },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_municipios_nome ON municipios (nome)',
        'CREATE INDEX idx_municipios_uf ON municipios (uf)',
      ],
    })
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('municipios')
    app.delete(col)
  },
)
