import pb from '@/lib/pocketbase/client'
import type { Processo } from '@/types/processo'

export const fetchProcessosAgente = async (agenteId: string): Promise<Processo[]> => {
  return await pb.collection('processos_operacionais').getFullList<Processo>({
    filter: `agente_id="${agenteId}"`,
    sort: '-created',
  })
}

export const filterByStatus = (processos: Processo[], status: string) => {
  if (!status || status === 'todos') return processos
  return processos.filter((p) => p.status === status)
}

export const filterByDate = (
  processos: Processo[],
  dateType: string,
  customRange?: { from?: Date; to?: Date },
) => {
  if (dateType === 'all') return processos
  const now = new Date()
  return processos.filter((p) => {
    const pDate = new Date(p.created)
    if (dateType === '7days') {
      const limit = new Date(now)
      limit.setDate(limit.getDate() - 7)
      return pDate >= limit
    }
    if (dateType === '30days') {
      const limit = new Date(now)
      limit.setDate(limit.getDate() - 30)
      return pDate >= limit
    }
    if (dateType === 'custom' && customRange?.from) {
      const from = customRange.from
      const to = customRange.to || new Date(8640000000000000)
      return pDate >= from && pDate <= to
    }
    return true
  })
}

export const searchByNumero = (processos: Processo[], search: string) => {
  if (!search) return processos
  const lower = search.toLowerCase()
  return processos.filter(
    (p) =>
      (p.numero_processo || '').toLowerCase().includes(lower) ||
      (p.numero_controle || '').toLowerCase().includes(lower) ||
      (p.nome_segurado || '').toLowerCase().includes(lower),
  )
}

export const filterByPriority = (processos: Processo[], priority: string) => {
  if (!priority || priority === 'todas') return processos
  return processos.filter((p) => p.prioridade === priority)
}
