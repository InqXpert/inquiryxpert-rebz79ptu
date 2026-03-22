import { useState, useEffect, useMemo, useCallback } from 'react'
import { useGestaoAgentes } from '@/hooks/useGestaoAgentes'
import { useAuth } from '@/hooks/use-auth'
import { useRealtime } from '@/hooks/use-realtime'
import { useToast } from '@/hooks/use-toast'
import type { Processo } from '@/types/processo'
import * as service from '@/services/processosService'

export function useProcessosAgente(
  statusFilter: string,
  dateFilter: string,
  dateRange: { from?: Date; to?: Date } | undefined,
  priorityFilter: string,
  debouncedSearch: string,
  showFavorites: boolean,
) {
  const { user } = useAuth()
  const { agenteId, loading: agenteLoading, initAgente } = useGestaoAgentes()
  const { toast } = useToast()

  const [processosRaw, setProcessosRaw] = useState<Processo[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const ITEMS_PER_PAGE = 20

  useEffect(() => {
    initAgente()
  }, [initAgente])

  const load = useCallback(async () => {
    if (!agenteId || !user?.id) return
    try {
      setLoading(true)
      const [data, favs] = await Promise.all([
        service.fetchProcessosAgente(agenteId),
        service.fetchFavoritos(user.id),
      ])
      setFavorites(favs)
      setProcessosRaw(data)
    } catch (err) {
      toast({ title: 'Erro ao carregar processos.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }, [agenteId, user?.id, toast])

  useEffect(() => {
    if (agenteId && user?.id) load()
  }, [agenteId, user?.id, load])

  useRealtime(
    'processos_operacionais',
    (e) => {
      if (e.action === 'create') {
        if (e.record.agente_id === agenteId) {
          setProcessosRaw((prev) => [e.record as unknown as Processo, ...prev])
        }
      } else if (e.action === 'update') {
        setProcessosRaw((prev) =>
          prev.map((p) => (p.id === e.record.id ? (e.record as unknown as Processo) : p)),
        )
      } else if (e.action === 'delete') {
        setProcessosRaw((prev) => prev.filter((p) => p.id !== e.record.id))
      }
    },
    !!agenteId,
  )

  useEffect(() => {
    setPage(1)
  }, [statusFilter, dateFilter, dateRange, priorityFilter, debouncedSearch, showFavorites])

  const processos = useMemo(() => {
    return processosRaw.map((p) => ({
      ...p,
      is_favorite: favorites.has(p.id),
    }))
  }, [processosRaw, favorites])

  const filtered = useMemo(() => {
    let res = processos
    res = service.filterByFavorites(res, showFavorites)
    res = service.filterByStatus(res, statusFilter)
    res = service.filterByDate(res, dateFilter, dateRange)
    res = service.filterByPriority(res, priorityFilter)
    res = service.searchByNumero(res, debouncedSearch)
    return res
  }, [
    processos,
    statusFilter,
    dateFilter,
    dateRange,
    priorityFilter,
    debouncedSearch,
    showFavorites,
  ])

  const displayedProcessos = useMemo(() => {
    return filtered.slice(0, page * ITEMS_PER_PAGE)
  }, [filtered, page])

  const toggleFavorite = async (processoId: string) => {
    if (!user?.id) return
    const isFav = await service.toggleProcessoFavorite(processoId, user.id)
    setFavorites((prev) => {
      const next = new Set(prev)
      if (isFav) next.add(processoId)
      else next.delete(processoId)
      return next
    })
  }

  const toggleSelection = (processoId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(processoId)) next.delete(processoId)
      else next.add(processoId)
      return next
    })
  }

  const toggleAll = (processoIds: string[]) => {
    if (selectedIds.size === processoIds.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(processoIds))
    }
  }

  const clearSelection = () => setSelectedIds(new Set())

  const markAsRead = async () => {
    if (selectedIds.size === 0) return
    await service.markProcessosAsRead(Array.from(selectedIds))
    setProcessosRaw((prev) => prev.map((p) => (selectedIds.has(p.id) ? { ...p, lido: true } : p)))
    toast({ title: 'Sucesso', description: `${selectedIds.size} processos marcados como lido.` })
    clearSelection()
  }

  const exportSelected = () => {
    if (selectedIds.size === 0) return
    const selectedProcs = processos.filter((p) => selectedIds.has(p.id))
    const headers = ['Numero Controle', 'Segurado', 'Status', 'Prazo']
    const csvContent = [
      headers.join(','),
      ...selectedProcs.map(
        (p) =>
          `"${p.numero_controle || ''}","${p.nome_segurado || ''}","${p.status}","${p.data_prazo || ''}"`,
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `processos-selecionados-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast({ title: 'Sucesso', description: 'Exportação concluída.' })
    clearSelection()
  }

  return {
    processos: displayedProcessos,
    totalCount: processos.length,
    filteredCount: filtered.length,
    loading: loading || agenteLoading,
    refetch: load,
    page,
    setPage,
    hasMore: displayedProcessos.length < filtered.length,
    toggleFavorite,
    selectedIds,
    toggleSelection,
    toggleAll,
    markAsRead,
    exportSelected,
    clearSelection,
  }
}
