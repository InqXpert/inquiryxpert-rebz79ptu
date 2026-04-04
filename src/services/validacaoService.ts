import { novoProcessoSchema } from '@/schemas/processoSchemas'

export const sanitizeInput = (data: any) => {
  const sanitized = { ...data }
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitized[key].trim()
    }
  }
  return sanitized
}

export const validateProcesso = (data: any) => {
  const sanitized = sanitizeInput(data)
  return novoProcessoSchema.safeParse(sanitized)
}

export const suggestSupervisor = (tipoInvestigacao: string, seguradora: string, users: any[]) => {
  if (!tipoInvestigacao || !users) return null

  const isAuto = tipoInvestigacao.toUpperCase() === 'AUTO'
  const isProperty = tipoInvestigacao.toUpperCase().includes('PROPERTY')

  const valmor = users.find((u) => u.name?.toUpperCase().includes('VALMOR'))
  const ronaldo = users.find((u) => u.name?.toUpperCase().includes('RONALDO'))
  const carlos = users.find((u) => u.name?.toUpperCase().includes('CARLOS'))
  const tatiane = users.find((u) => u.name?.toUpperCase().includes('TATIANE'))

  if (isProperty) return carlos?.id

  const tatianeServices = [
    'PERFIL',
    'FAST',
    'BUSCA B.O',
    'BUSCA DOCS',
    'BUSCA B.O DOCS',
    'VIDA PREGRESSA',
    'REMOTA',
  ]
  if (tatianeServices.some((s) => tipoInvestigacao.toUpperCase().includes(s))) return tatiane?.id

  if (isAuto) {
    if (!seguradora) return null
    const valmorSegs = ['ZURICH', 'MAPFRE', 'SPLIT RISK', 'NEO', 'SEVEN', 'MAIS BRASIL']
    if (valmorSegs.includes(seguradora.toUpperCase())) return valmor?.id

    const ronaldoSegs = ['BRADESCO', 'COOPERLINK', 'AUTOINSP', 'CARDIF']
    if (ronaldoSegs.includes(seguradora.toUpperCase())) return ronaldo?.id
  }

  return null
}
