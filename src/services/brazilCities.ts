export interface CityGeo {
  name: string
  state: string
  lat: number
  lon: number
}

// Compact list of >100 major Brazilian cities, including all capitals and hubs.
export const brazilCities: CityGeo[] = [
  { name: 'São Paulo', state: 'SP', lat: -23.5505, lon: -46.6333 },
  { name: 'Guarulhos', state: 'SP', lat: -23.4628, lon: -46.5333 },
  { name: 'Campinas', state: 'SP', lat: -22.9099, lon: -47.0626 },
  { name: 'São Bernardo do Campo', state: 'SP', lat: -23.6939, lon: -46.5644 },
  { name: 'Santo André', state: 'SP', lat: -23.6553, lon: -46.5281 },
  { name: 'Osasco', state: 'SP', lat: -23.5329, lon: -46.7917 },
  { name: 'São José dos Campos', state: 'SP', lat: -23.1896, lon: -45.8841 },
  { name: 'Ribeirão Preto', state: 'SP', lat: -21.1704, lon: -47.8103 },
  { name: 'Sorocaba', state: 'SP', lat: -23.5015, lon: -47.4581 },
  { name: 'Santos', state: 'SP', lat: -23.9618, lon: -46.3322 },
  { name: 'Rio de Janeiro', state: 'RJ', lat: -22.9068, lon: -43.1729 },
  { name: 'São Gonçalo', state: 'RJ', lat: -22.8269, lon: -43.0539 },
  { name: 'Duque de Caxias', state: 'RJ', lat: -22.7856, lon: -43.3117 },
  { name: 'Nova Iguaçu', state: 'RJ', lat: -22.7561, lon: -43.4606 },
  { name: 'Niterói', state: 'RJ', lat: -22.8808, lon: -43.1043 },
  { name: 'Belford Roxo', state: 'RJ', lat: -22.7642, lon: -43.3994 },
  { name: 'São João de Meriti', state: 'RJ', lat: -22.8014, lon: -43.3711 },
  { name: 'Petrópolis', state: 'RJ', lat: -22.5112, lon: -43.1779 },
  { name: 'Volta Redonda', state: 'RJ', lat: -22.523, lon: -44.1041 },
  { name: 'Belo Horizonte', state: 'MG', lat: -19.9208, lon: -43.9378 },
  { name: 'Uberlândia', state: 'MG', lat: -18.9186, lon: -48.2772 },
  { name: 'Contagem', state: 'MG', lat: -19.9317, lon: -44.0539 },
  { name: 'Juiz de Fora', state: 'MG', lat: -21.7587, lon: -43.3444 },
  { name: 'Betim', state: 'MG', lat: -19.9678, lon: -44.1983 },
  { name: 'Montes Claros', state: 'MG', lat: -16.735, lon: -43.8617 },
  { name: 'Ribeirão das Neves', state: 'MG', lat: -19.7667, lon: -44.0867 },
  { name: 'Uberaba', state: 'MG', lat: -19.7496, lon: -47.9351 },
  { name: 'Governador Valadares', state: 'MG', lat: -18.8504, lon: -41.9475 },
  { name: 'Curitiba', state: 'PR', lat: -25.4284, lon: -49.2733 },
  { name: 'Londrina', state: 'PR', lat: -23.3103, lon: -51.1628 },
  { name: 'Maringá', state: 'PR', lat: -23.4205, lon: -51.9333 },
  { name: 'Ponta Grossa', state: 'PR', lat: -25.0994, lon: -50.1583 },
  { name: 'Cascavel', state: 'PR', lat: -24.9573, lon: -53.459 },
  { name: 'São José dos Pinhais', state: 'PR', lat: -25.5347, lon: -49.2014 },
  { name: 'Foz do Iguaçu', state: 'PR', lat: -25.5204, lon: -54.5828 },
  { name: 'Porto Alegre', state: 'RS', lat: -30.0346, lon: -51.2177 },
  { name: 'Caxias do Sul', state: 'RS', lat: -29.1678, lon: -51.1794 },
  { name: 'Pelotas', state: 'RS', lat: -31.7654, lon: -52.3376 },
  { name: 'Canoas', state: 'RS', lat: -29.919, lon: -51.1802 },
  { name: 'Santa Maria', state: 'RS', lat: -29.6842, lon: -53.8069 },
  { name: 'Gravataí', state: 'RS', lat: -29.9392, lon: -50.9939 },
  { name: 'Joinville', state: 'SC', lat: -26.3044, lon: -48.8456 },
  { name: 'Florianópolis', state: 'SC', lat: -27.5969, lon: -48.5495 },
  { name: 'Blumenau', state: 'SC', lat: -26.9194, lon: -49.0661 },
  { name: 'São José', state: 'SC', lat: -27.6136, lon: -48.6275 },
  { name: 'Chapecó', state: 'SC', lat: -27.1004, lon: -52.6152 },
  { name: 'Itajaí', state: 'SC', lat: -26.9111, lon: -48.6672 },
  { name: 'Salvador', state: 'BA', lat: -12.9714, lon: -38.5014 },
  { name: 'Feira de Santana', state: 'BA', lat: -12.266, lon: -38.9669 },
  { name: 'Vitória da Conquista', state: 'BA', lat: -14.8661, lon: -40.8394 },
  { name: 'Camaçari', state: 'BA', lat: -12.6975, lon: -38.3242 },
  { name: 'Juazeiro', state: 'BA', lat: -9.412, lon: -40.505 },
  { name: 'Itabuna', state: 'BA', lat: -14.788, lon: -39.2801 },
  { name: 'Recife', state: 'PE', lat: -8.0476, lon: -34.877 },
  { name: 'Jaboatão dos Guararapes', state: 'PE', lat: -8.1126, lon: -35.0154 },
  { name: 'Olinda', state: 'PE', lat: -8.0089, lon: -34.8553 },
  { name: 'Caruaru', state: 'PE', lat: -8.2833, lon: -35.9761 },
  { name: 'Petrolina', state: 'PE', lat: -9.3897, lon: -40.5028 },
  { name: 'Fortaleza', state: 'CE', lat: -3.7172, lon: -38.543 },
  { name: 'Caucaia', state: 'CE', lat: -3.7319, lon: -38.6517 },
  { name: 'Juazeiro do Norte', state: 'CE', lat: -7.2016, lon: -39.3183 },
  { name: 'Maracanaú', state: 'CE', lat: -3.8744, lon: -38.6258 },
  { name: 'Brasília', state: 'DF', lat: -15.7801, lon: -47.9292 },
  { name: 'Goiânia', state: 'GO', lat: -16.6869, lon: -49.2648 },
  { name: 'Aparecida de Goiânia', state: 'GO', lat: -16.8228, lon: -49.247 },
  { name: 'Anápolis', state: 'GO', lat: -16.3267, lon: -48.9528 },
  { name: 'Belém', state: 'PA', lat: -1.4558, lon: -48.5044 },
  { name: 'Ananindeua', state: 'PA', lat: -1.3639, lon: -48.3739 },
  { name: 'Santarém', state: 'PA', lat: -2.4431, lon: -54.7083 },
  { name: 'Marabá', state: 'PA', lat: -5.3686, lon: -49.1189 },
  { name: 'Manaus', state: 'AM', lat: -3.119, lon: -60.0217 },
  { name: 'Vitória', state: 'ES', lat: -20.3155, lon: -40.3128 },
  { name: 'Vila Velha', state: 'ES', lat: -20.3297, lon: -40.2925 },
  { name: 'Serra', state: 'ES', lat: -20.1286, lon: -40.3078 },
  { name: 'Maceió', state: 'AL', lat: -9.6658, lon: -35.7353 },
  { name: 'Arapiraca', state: 'AL', lat: -9.7533, lon: -36.6578 },
  { name: 'Natal', state: 'RN', lat: -5.7945, lon: -35.211 },
  { name: 'Mossoró', state: 'RN', lat: -5.1881, lon: -37.3441 },
  { name: 'João Pessoa', state: 'PB', lat: -7.115, lon: -34.8631 },
  { name: 'Campina Grande', state: 'PB', lat: -7.2306, lon: -35.8811 },
  { name: 'São Luís', state: 'MA', lat: -2.53, lon: -44.3028 },
  { name: 'Imperatriz', state: 'MA', lat: -5.5156, lon: -47.4772 },
  { name: 'Cuiabá', state: 'MT', lat: -15.5989, lon: -56.0949 },
  { name: 'Várzea Grande', state: 'MT', lat: -15.6467, lon: -56.1325 },
  { name: 'Campo Grande', state: 'MS', lat: -20.4428, lon: -54.6464 },
  { name: 'Dourados', state: 'MS', lat: -22.2236, lon: -54.8058 },
  { name: 'Teresina', state: 'PI', lat: -5.0892, lon: -42.8016 },
  { name: 'Aracaju', state: 'SE', lat: -10.9472, lon: -37.0731 },
  { name: 'Porto Velho', state: 'RO', lat: -8.7619, lon: -63.9039 },
  { name: 'Palmas', state: 'TO', lat: -10.2128, lon: -48.3601 },
  { name: 'Macapá', state: 'AP', lat: 0.0389, lon: -51.0664 },
  { name: 'Rio Branco', state: 'AC', lat: -9.9747, lon: -67.8105 },
  { name: 'Boa Vista', state: 'RR', lat: 2.8235, lon: -60.6758 },
]

export const getCityCoords = (
  city?: string,
  state?: string,
): { lat: number; lon: number } | null => {
  if (!city || !state) return null
  const c = brazilCities.find(
    (x) => x.name.toLowerCase() === city.toLowerCase() && x.state === state,
  )
  return c ? { lat: c.lat, lon: c.lon } : null
}

export const getCitiesByState = (state: string): CityGeo[] => {
  return brazilCities.filter((x) => x.state === state).sort((a, b) => a.name.localeCompare(b.name))
}

export const BR_STATES = Array.from(new Set(brazilCities.map((c) => c.state))).sort()
