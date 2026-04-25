import { useState, useEffect, useMemo, useCallback } from 'react'
import { useAuth } from './use-auth'
import { useToast } from './use-toast'
import { useRealtime } from './use-realtime'
import { Processo } from '@/types/processo'
import {
  fetchProcessos,
  filterByStatus,
  searchProcessos,
  filterByDate,
} from '@/services/processosService'

export function useProcessosList() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [data, setData] = useState<Processo[]>([])
  const [loading, setLoading] = useState(true)

  const [statusFilter, setStatusFilter] = useState('Todos')
  const [dateFilter, setDateFilter] = useState('Todos')
  const [customDateRange, setCustomDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [tagFilter, setTagFilter] = useState('Todos')
  const [supervisorFilter, setSupervisorFilter] = useState('Todos')
  const [search, setSearch] = useState('')

  const [page, setPage] = useState(1)
  const pageSize = 20

  const loadData = useCallback(
    async (showLoading = true) => {
      if (showLoading) setLoading(true)
      try {
        let processos = await fetchProcessos()

        if (user?.role === 'supervisor') {
          processos = processos.filter((p) => p.supervisor_id === user.id)
        } else if (user?.role !== 'c-level' && user?.role !== 'admin') {
          processos = [] // strict RBAC per AC requirements
        }

        setData(processos)
      } catch (err) {
        toast({ title: 'Erro', description: 'Erro ao carregar processos.', variant: 'destructive' })
      } finally {
        if (showLoading) setLoading(false)
      }
    },
    [user, toast],
  )

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user, loadData])

  useRealtime(
    'processos_operacionais',
    () => {
      loadData(false)
    },
    !!user,
  )

  const filteredData = useMemo(() => {
    let result = data

    if (statusFilter !== 'Todos') {
      result = filterByStatus(result, statusFilter)
    }

    if (dateFilter !== 'Todos') {
      result = filterByDate(result, dateFilter, customDateRange)
    }

    if (tagFilter !== 'Todos') {
      result = result.filter((p) => p.tags && Array.isArray(p.tags) && p.tags.includes(tagFilter))
    }

    if (supervisorFilter !== 'Todos') {
      result = result.filter((p) => p.supervisor_id === supervisorFilter)
    }

    if (search) {
      result = searchProcessos(result, search)
    }

    return result
  }, [data, statusFilter, dateFilter, customDateRange, tagFilter, supervisorFilter, search])

  const paginatedData = useMemo(() => {
    return filteredData.slice(0, page * pageSize)
  }, [filteredData, page])

  const hasMore = paginatedData.length < filteredData.length

  const loadMore = () => setPage((p) => p + 1)

  const clearFilters = () => {
    setStatusFilter('Todos')
    setDateFilter('Todos')
    setCustomDateRange({})
    setTagFilter('Todos')
    setSupervisorFilter('Todos')
    setSearch('')
    setPage(1)
  }

  // reset page on filter change
  useEffect(() => {
    setPage(1)
  }, [statusFilter, dateFilter, customDateRange, tagFilter, supervisorFilter, search])

  return {
    data: paginatedData,
    refresh: () => loadData(false),
    totalCount: filteredData.length,
    rawCount: data.length,
    loading,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    customDateRange,
    setCustomDateRange,
    tagFilter,
    setTagFilter,
    supervisorFilter,
    setSupervisorFilter,
    search,
    setSearch,
    hasMore,
    loadMore,
    clearFilters,
  }
}
