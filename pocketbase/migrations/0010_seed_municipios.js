migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('municipios')
    const cities = [
      { nome: 'São Paulo', uf: 'SP', lat: -23.5505, lon: -46.6333 },
      { nome: 'Guarulhos', uf: 'SP', lat: -23.4628, lon: -46.5333 },
      { nome: 'Mogi das Cruzes', uf: 'SP', lat: -23.5236, lon: -46.1925 },
      { nome: 'Campinas', uf: 'SP', lat: -22.9099, lon: -47.0626 },
      { nome: 'São Bernardo do Campo', uf: 'SP', lat: -23.6939, lon: -46.5644 },
      { nome: 'Santo André', uf: 'SP', lat: -23.6553, lon: -46.5281 },
      { nome: 'Osasco', uf: 'SP', lat: -23.5329, lon: -46.7917 },
      { nome: 'São José dos Campos', uf: 'SP', lat: -23.1896, lon: -45.8841 },
      { nome: 'Ribeirão Preto', uf: 'SP', lat: -21.1704, lon: -47.8103 },
      { nome: 'Sorocaba', uf: 'SP', lat: -23.5015, lon: -47.4581 },
      { nome: 'Santos', uf: 'SP', lat: -23.9618, lon: -46.3322 },
      { nome: 'Rio de Janeiro', uf: 'RJ', lat: -22.9068, lon: -43.1729 },
      { nome: 'São Gonçalo', uf: 'RJ', lat: -22.8269, lon: -43.0539 },
      { nome: 'Duque de Caxias', uf: 'RJ', lat: -22.7856, lon: -43.3117 },
      { nome: 'Nova Iguaçu', uf: 'RJ', lat: -22.7561, lon: -43.4606 },
      { nome: 'Niterói', uf: 'RJ', lat: -22.8808, lon: -43.1043 },
      { nome: 'Belo Horizonte', uf: 'MG', lat: -19.9208, lon: -43.9378 },
      { nome: 'Uberlândia', uf: 'MG', lat: -18.9186, lon: -48.2772 },
      { nome: 'Contagem', uf: 'MG', lat: -19.9317, lon: -44.0539 },
      { nome: 'Juiz de Fora', uf: 'MG', lat: -21.7587, lon: -43.3444 },
      { nome: 'Curitiba', uf: 'PR', lat: -25.4284, lon: -49.2733 },
      { nome: 'Londrina', uf: 'PR', lat: -23.3103, lon: -51.1628 },
      { nome: 'Maringá', uf: 'PR', lat: -23.4205, lon: -51.9333 },
      { nome: 'Porto Alegre', uf: 'RS', lat: -30.0346, lon: -51.2177 },
      { nome: 'Caxias do Sul', uf: 'RS', lat: -29.1678, lon: -51.1794 },
      { nome: 'Joinville', uf: 'SC', lat: -26.3044, lon: -48.8456 },
      { nome: 'Florianópolis', uf: 'SC', lat: -27.5969, lon: -48.5495 },
      { nome: 'Blumenau', uf: 'SC', lat: -26.9194, lon: -49.0661 },
      { nome: 'Salvador', uf: 'BA', lat: -12.9714, lon: -38.5014 },
      { nome: 'Feira de Santana', uf: 'BA', lat: -12.266, lon: -38.9669 },
      { nome: 'Recife', uf: 'PE', lat: -8.0476, lon: -34.877 },
      { nome: 'Fortaleza', uf: 'CE', lat: -3.7172, lon: -38.543 },
      { nome: 'Brasília', uf: 'DF', lat: -15.7801, lon: -47.9292 },
      { nome: 'Goiânia', uf: 'GO', lat: -16.6869, lon: -49.2648 },
      { nome: 'Belém', uf: 'PA', lat: -1.4558, lon: -48.5044 },
      { nome: 'Manaus', uf: 'AM', lat: -3.119, lon: -60.0217 },
      { nome: 'Vitória', uf: 'ES', lat: -20.3155, lon: -40.3128 },
      { nome: 'Maceió', uf: 'AL', lat: -9.6658, lon: -35.7353 },
      { nome: 'Natal', uf: 'RN', lat: -5.7945, lon: -35.211 },
      { nome: 'João Pessoa', uf: 'PB', lat: -7.115, lon: -34.8631 },
      { nome: 'São Luís', uf: 'MA', lat: -2.53, lon: -44.3028 },
      { nome: 'Cuiabá', uf: 'MT', lat: -15.5989, lon: -56.0949 },
      { nome: 'Campo Grande', uf: 'MS', lat: -20.4428, lon: -54.6464 },
      { nome: 'Teresina', uf: 'PI', lat: -5.0892, lon: -42.8016 },
      { nome: 'Aracaju', uf: 'SE', lat: -10.9472, lon: -37.0731 },
      { nome: 'Porto Velho', uf: 'RO', lat: -8.7619, lon: -63.9039 },
      { nome: 'Palmas', uf: 'TO', lat: -10.2128, lon: -48.3601 },
      { nome: 'Macapá', uf: 'AP', lat: 0.0389, lon: -51.0664 },
      { nome: 'Rio Branco', uf: 'AC', lat: -9.9747, lon: -67.8105 },
      { nome: 'Boa Vista', uf: 'RR', lat: 2.8235, lon: -60.6758 },
    ]

    cities.forEach((c) => {
      const record = new Record(col)
      record.set('nome', c.nome)
      record.set('uf', c.uf)
      record.set('latitude', c.lat)
      record.set('longitude', c.lon)
      app.save(record)
    })
  },
  (app) => {
    const col = app.findCollectionByNameOrId('municipios')
    app.truncateCollection(col)
  },
)
