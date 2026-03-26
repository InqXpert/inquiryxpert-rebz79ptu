import { z } from 'zod'

export const formSchema = z.object({
  cia: z.string().min(1, 'Obrigatório'),
  controle_cia: z.string().optional(),
  natureza_sinistro: z.string().optional(),
  tipo_servico: z.string().min(1, 'Obrigatório'),
  local_sinistro: z.string().optional(),
  nome_segurado: z.string().optional(),
  placas_veiculos: z.string().optional(),
  solicitante_id: z.string().optional(),
  agente_id: z.string().optional(),
  status: z.string().min(1, 'Obrigatório'),
  supervisor_id: z.string().optional(),
  data_entrada: z.string().optional(),
  data_retorno: z.string().optional(),
  data_saida: z.string().optional(),
})

export const getDiasTotais = (startStr?: string, endStr?: string) => {
  const parseDate = (dStr?: string) => {
    if (!dStr) return null
    if (dStr.includes('/')) {
      const [d, m, y] = dStr.split('/')
      return new Date(Number(y), Number(m) - 1, Number(d))
    }
    const parsed = new Date(dStr)
    return isNaN(parsed.getTime()) ? null : parsed
  }

  const start = parseDate(startStr)
  const end = parseDate(endStr) || new Date()
  if (!start) return 0

  const dStart = new Date(start)
  dStart.setDate(dStart.getDate() + 1)
  dStart.setHours(0, 0, 0, 0)

  const dEnd = new Date(end)
  dEnd.setHours(0, 0, 0, 0)

  const diff = dEnd.getTime() - dStart.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export const getStatusColor = (status: string) => {
  const map: Record<string, string> = {
    ANALISE_INICIAL: 'bg-blue-100 text-blue-800 border-blue-200',
    EM_EXECUCAO: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    EM_ELABORACAO: 'bg-purple-100 text-purple-800 border-purple-200',
    FINALIZADO: 'bg-green-100 text-green-800 border-green-200',
    CANCELADO: 'bg-red-100 text-red-800 border-red-200',
  }
  return map[status] || 'bg-gray-100 text-gray-800 border-gray-200'
}
