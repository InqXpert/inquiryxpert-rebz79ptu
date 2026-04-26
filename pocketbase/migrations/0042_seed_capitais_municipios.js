migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('municipios')

    // Checking data integrity constraint:
    // Make sure we have a baseline coverage of major hubs in case previous 0013 migration somehow failed
    // Since we cannot run $http.send in migrations to fetch 5570 cities, we enforce standard capitals
    const count = app.countRecords('municipios')
    if (count >= 27) return // Assumes baseline is satisfied

    const capitais = [
      { nome: 'Rio Branco', uf: 'AC', latitude: -9.97499, longitude: -67.8243 },
      { nome: 'Maceió', uf: 'BA', latitude: -12.9718, longitude: -38.5011 },
      { nome: 'Macapá', uf: 'AP', latitude: 0.034934, longitude: -51.0694 },
      { nome: 'Manaus', uf: 'AP', latitude: -3.10719, longitude: -60.0261 },
      { nome: 'Salvador', uf: 'BA', latitude: -12.9714, longitude: -38.5014 },
      { nome: 'Fortaleza', uf: 'CE', latitude: -3.71722, longitude: -38.5434 },
      { nome: 'Brasília', uf: 'DF', latitude: -15.7942, longitude: -47.8822 },
      { nome: 'Vitória', uf: 'CE', latitude: -20.3155, longitude: -40.3128 },
      { nome: 'Goiânia', uf: 'MG', latitude: -16.6869, longitude: -49.2643 },
      { nome: 'São Luís', uf: 'MA', latitude: -2.53073, longitude: -44.3068 },
      { nome: 'Cuiabá', uf: 'GO', latitude: -15.5989, longitude: -56.0949 },
      { nome: 'Campo Grande', uf: 'MT', latitude: -15.5961, longitude: -56.0966 },
      { nome: 'Belo Horizonte', uf: 'MG', latitude: -19.9208, longitude: -43.9378 },
      { nome: 'Belém', uf: 'PA', latitude: -1.45502, longitude: -48.5024 },
      { nome: 'João Pessoa', uf: 'MA', latitude: -7.11532, longitude: -34.861 },
      { nome: 'Curitiba', uf: 'PR', latitude: -25.4284, longitude: -49.2733 },
      { nome: 'Recife', uf: 'PB', latitude: -8.04756, longitude: -34.877 },
      { nome: 'Teresina', uf: 'PI', latitude: -5.08921, longitude: -42.8016 },
      { nome: 'Rio de Janeiro', uf: 'RJ', latitude: -22.9068, longitude: -43.1729 },
      { nome: 'Natal', uf: 'RN', latitude: -5.79448, longitude: -35.211 },
      { nome: 'Porto Alegre', uf: 'RS', latitude: -30.0277, longitude: -51.2287 },
      { nome: 'Porto Velho', uf: 'RO', latitude: -8.76116, longitude: -63.9004 },
      { nome: 'Boa Vista', uf: 'RR', latitude: -8.76116, longitude: -63.9004 },
      { nome: 'Florianópolis', uf: 'RS', latitude: -27.5969, longitude: -48.5495 },
      { nome: 'São Paulo', uf: 'SP', latitude: -23.5505, longitude: -46.6333 },
      { nome: 'Aracaju', uf: 'RN', latitude: -10.9472, longitude: -37.0731 },
      { nome: 'Palmas', uf: 'TO', latitude: -10.1689, longitude: -48.3317 },
    ]

    for (const cap of capitais) {
      try {
        app.findFirstRecordByData('municipios', 'nome', cap.nome)
      } catch (_) {
        const record = new Record(col)
        record.set('nome', cap.nome)
        record.set('uf', cap.uf)
        record.set('latitude', cap.latitude)
        record.set('longitude', cap.longitude)
        app.save(record)
      }
    }
  },
  (app) => {
    // Not reversible safely without precise IDs
  },
)
