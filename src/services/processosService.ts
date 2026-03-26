import pb from '@/lib/pocketbase/client'
import type { Processo } from '@/types/processo'

export const fetchProcessos = async (): Promise<Processo[]> => {
  return await pb.collection('processos_operacionais').getFullList<Processo>({
    sort: '-created',
    expand: 'supervisor_id,agente_id',
  })
}

export const filterByStatus = (processos: Processo[], status: string) => {
  if (!status || status === 'Todos') return processos
  return processos.filter((p) => {
    const s = (p.status || '').toUpperCase()
    if (status === 'ANALISE_INICIAL' && s.includes('ANALIS')) return true
    if (status === 'EM_EXECUCAO' && s.includes('EXECU')) return true
    if (status === 'EM_ELABORACAO' && s.includes('ELABORA')) return true
    if (status === 'FINALIZADO' && (s.includes('FINALIZ') || s.includes('CONCLU'))) return true
    if (status === 'CANCELADO' && s.includes('CANCEL')) return true
    return s === status.toUpperCase()
  })
}

export const searchProcessos = (processos: Processo[], search: string) => {
  if (!search) return processos
  const lower = search.toLowerCase()
  return processos.filter(
    (p) =>
      (p.id || '').toLowerCase().includes(lower) ||
      (p.numero_controle || '').toLowerCase().includes(lower) ||
      (p.data_entrada || '').toLowerCase().includes(lower) ||
      (p.analista_solicitante || '').toLowerCase().includes(lower) ||
      (p.nome_segurado || '').toLowerCase().includes(lower) ||
      (p.placas_veiculos || '').toLowerCase().includes(lower) ||
      JSON.stringify(p.observacoes_json || {})
        .toLowerCase()
        .includes(lower) ||
      JSON.stringify(p.posicoes_json || {})
        .toLowerCase()
        .includes(lower) ||
      (p.observacoes || '').toLowerCase().includes(lower),
  )
}

export const getElapsedDays = (dataEntradaStr?: string) => {
  if (!dataEntradaStr) return { calendar: 0, business: 0 }

  let start: Date
  if (dataEntradaStr.includes('/')) {
    const parts = dataEntradaStr.split('/')
    start = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]))
  } else {
    start = new Date(dataEntradaStr)
  }

  if (isNaN(start.getTime())) start = new Date()

  const now = new Date()
  start.setHours(0, 0, 0, 0)
  const end = new Date(now)
  end.setHours(0, 0, 0, 0)

  const diffTime = end.getTime() - start.getTime()
  if (diffTime < 0) return { calendar: 0, business: 0 }

  const calendar = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  let business = 0
  let curDate = new Date(start.getTime())
  while (curDate < end) {
    const dayOfWeek = curDate.getDay()
    if (dayOfWeek !== 0 && dayOfWeek !== 6) business++
    curDate.setDate(curDate.getDate() + 1)
  }

  return { calendar, business }
}

export const calculateDayColor = (dataEntradaStr?: string) => {
  const { calendar, business } = getElapsedDays(dataEntradaStr)
  if (business >= 7) return 'hsla(0, 84%, 60%, 0.2)'
  if (calendar >= 5) return 'hsla(25, 95%, 53%, 0.2)'
  if (business >= 3) return 'hsla(45, 96%, 56%, 0.2)'
  return 'transparent'
}

export const calculateTags = (dataEntradaStr?: string) => {
  const { calendar, business } = getElapsedDays(dataEntradaStr)
  const tags = []

  if (business >= 3)
    tags.push({ label: 'Posição Preliminar', color: 'bg-[hsl(45,96%,56%)] text-slate-900' })
  if (calendar >= 5)
    tags.push({ label: 'Atualização', color: 'bg-[hsl(25,95%,53%)] text-slate-900' })
  if (business >= 7) tags.push({ label: 'Encerramento', color: 'bg-[hsl(0,84%,60%)] text-white' })

  return tags
}

export const filterByDate = (
  processos: Processo[],
  dateType: string,
  customRange?: { from?: Date; to?: Date },
) => {
  if (!dateType || dateType === 'Todos' || dateType === 'all') return processos
  const now = new Date()
  return processos.filter((p) => {
    let pDate: Date
    if (p.data_entrada && p.data_entrada.includes('/')) {
      const parts = p.data_entrada.split('/')
      pDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]))
    } else {
      pDate = new Date(p.data_entrada || p.created)
    }

    if (isNaN(pDate.getTime())) return true

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

export const fetchProcessosAgente = async (agenteId: string): Promise<Processo[]> => {
  return await pb.collection('processos_operacionais').getFullList<Processo>({
    filter: `agente_id="${agenteId}"`,
    sort: '-created',
  })
}

export const fetchFavoritos = async (userId: string): Promise<Set<string>> => {
  try {
    const favs = await pb
      .collection('processos_favoritos')
      .getFullList({ filter: `user_id="${userId}"` })
    return new Set(favs.map((f) => f.processo_id))
  } catch {
    return new Set()
  }
}

export const toggleProcessoFavorite = async (
  processoId: string,
  userId: string,
): Promise<boolean> => {
  const existing = await pb
    .collection('processos_favoritos')
    .getList(1, 1, { filter: `processo_id='${processoId}' && user_id='${userId}'` })
  if (existing.items.length > 0) {
    await pb.collection('processos_favoritos').delete(existing.items[0].id)
    return false
  } else {
    await pb.collection('processos_favoritos').create({ processo_id: processoId, user_id: userId })
    return true
  }
}

export const markProcessosAsRead = async (processoIds: string[]) => {
  for (const id of processoIds) {
    await pb.collection('processos_operacionais').update(id, { lido: true })
  }
}

export const transcribeAudio = async (processoId: string): Promise<string> => {
  const res = await pb.send('/backend/v1/transcribe', {
    method: 'POST',
    body: JSON.stringify({ processo_id: processoId }),
  })
  return res.text || ''
}

export const filterByFavorites = (processos: Processo[], showFavorites: boolean) => {
  if (!showFavorites) return processos
  return processos.filter((p) => p.is_favorite)
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
