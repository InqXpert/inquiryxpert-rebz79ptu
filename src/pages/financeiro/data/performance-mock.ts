export const MOCK_SUMMARY = {
  receita: 52000,
  varReceita: 12,
  custo: 14500,
  varCusto: -5,
  margem: 72,
  varMargem: 3,
  processos: 48,
  varProcessos: 8,
}

export const MOCK_USERS = [
  {
    id: 1,
    name: 'João Silva',
    concluidos: 15,
    receita: 18000,
    custo: 4000,
    margem: 77,
    progresso: 120,
    status: 'Atingiu',
  },
  {
    id: 2,
    name: 'Maria Souza',
    concluidos: 12,
    receita: 15000,
    custo: 3500,
    margem: 76,
    progresso: 95,
    status: 'Próximo',
  },
  {
    id: 3,
    name: 'Carlos Santos',
    concluidos: 8,
    receita: 9000,
    custo: 3000,
    margem: 66,
    progresso: 60,
    status: 'Atrás',
  },
  {
    id: 4,
    name: 'Ana Costa',
    concluidos: 10,
    receita: 8000,
    custo: 2500,
    margem: 68,
    progresso: 85,
    status: 'Próximo',
  },
  {
    id: 5,
    name: 'Pedro Lima',
    concluidos: 3,
    receita: 2000,
    custo: 1500,
    margem: 25,
    progresso: 30,
    status: 'Atrás',
  },
]

export const MOCK_FLOW = Array.from({ length: 30 }).map((_, i) => ({
  day: String(i + 1).padStart(2, '0'),
  receita: Math.floor(Math.random() * 2000) + 1000 + i * 30,
  custo: Math.floor(Math.random() * 500) + 200 + i * 10,
}))

export const MOCK_CIAS = [
  { name: 'Porto Seguro', value: 20000, fill: 'hsl(var(--chart-1))' },
  { name: 'Bradesco', value: 15000, fill: 'hsl(var(--chart-2))' },
  { name: 'Azul', value: 10000, fill: 'hsl(var(--chart-3))' },
  { name: 'Liberty', value: 7000, fill: 'hsl(var(--chart-4))' },
]

export const MOCK_INSIGHTS = [
  'Receita 15% acima da meta estabelecida para o período.',
  'Custo operacional 8% abaixo do esperado.',
  'Usuário João Silva atingiu 120% da meta de receita.',
  'Processo PROC-2023-001 aguardando pagamento há 10 dias.',
  'Adiantamento AD-045 ainda não devolvido pelo agente.',
]
