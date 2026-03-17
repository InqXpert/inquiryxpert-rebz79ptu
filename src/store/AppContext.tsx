import React, { createContext, useContext, useState, useMemo } from 'react'
import { Prestador } from '@/types'
import { mockPrestadores } from './mockData'

interface AppState {
  prestadores: Prestador[]
  addPrestador: (p: Prestador) => void
  updatePrestador: (id: string, p: Prestador) => void
  deletePrestador: (id: string) => void
}

const AppContext = createContext<AppState | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [prestadores, setPrestadores] = useState<Prestador[]>(mockPrestadores)

  const addPrestador = (p: Prestador) => setPrestadores((prev) => [...prev, p])

  const updatePrestador = (id: string, updated: Prestador) => {
    setPrestadores((prev) => prev.map((p) => (p.id === id ? updated : p)))
  }

  const deletePrestador = (id: string) => {
    setPrestadores((prev) => prev.filter((p) => p.id !== id))
  }

  const value = useMemo(
    () => ({ prestadores, addPrestador, updatePrestador, deletePrestador }),
    [prestadores],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within AppProvider')
  return context
}
