import { useState, useEffect, useMemo, useCallback } from 'react'
import { useGestaoAgentes } from '@/hooks/useGestaoAgentes'
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
) {
  const { agenteId, loading: agenteLoading, initAgente } = useGestaoAgentes()
  const { toast } = useToast()
  const [processos, setProcessos] = useState<Processo[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const ITEMS_PER_PAGE = 20

  useEffect(() => {
    initAgente()
  }, [initAgente])

  const load = useCallback(async () => {
    if (!agenteId) return
    try {
      setLoading(true)
      const data = await service.fetchProcessosAgente(agenteId)
      setProcessos(data)
    } catch (err) {
      toast({ title: 'Erro ao carregar processos.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }, [agenteId, toast])

  useEffect(() => {
    if (agenteId) load()
  }, [agenteId, load])

  useRealtime(
    'processos_operacionais',
    (e) => {
      if (e.action === 'create') {
        if (e.record.agente_id === agenteId) {
          setProcessos((prev) => [e.record as unknown as Processo, ...prev])
        }
      } else if (e.action === 'update') {
        setProcessos((prev) =>
          prev.map((p) => (p.id === e.record.id ? (e.record as unknown as Processo) : p)),
        )
      } else if (e.action === 'delete') {
        setProcessos((prev) => prev.filter((p) => p.id !== e.record.id))
      }
    },
    !!agenteId,
  )

  useEffect(() => {
    setPage(1)
  }, [statusFilter, dateFilter, dateRange, priorityFilter, debouncedSearch])

  const filtered = useMemo(() => {
    let res = processos
    res = service.filterByStatus(res, statusFilter)
    res = service.filterByDate(res, dateFilter, dateRange)
    res = service.filterByPriority(res, priorityFilter)
    res = service.searchByNumero(res, debouncedSearch)
    return res
  }, [processos, statusFilter, dateFilter, dateRange, priorityFilter, debouncedSearch])

  const displayedProcessos = useMemo(() => {
    return filtered.slice(0, page * ITEMS_PER_PAGE)
  }, [filtered, page])

  return {
    processos: displayedProcessos,
    totalCount: processos.length,
    filteredCount: filtered.length,
    loading: loading || agenteLoading,
    refetch: load,
    page,
    setPage,
    hasMore: displayedProcessos.length < filtered.length,
  }
}
