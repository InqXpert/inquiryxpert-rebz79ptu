import { useState, useEffect, useMemo } from 'react'
import { getMunicipios, Municipio } from '@/services/municipios'

export function useMunicipios() {
  const [municipios, setMunicipios] = useState<Municipio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getMunicipios()
      .then((data) => {
        if (mounted) {
          setMunicipios(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  const states = useMemo(
    () => Array.from(new Set(municipios.map((m) => m.uf))).sort(),
    [municipios],
  )

  const getCitiesByState = useMemo(
    () => (uf: string) => {
      return municipios.filter((m) => m.uf === uf).sort((a, b) => a.nome.localeCompare(b.nome))
    },
    [municipios],
  )

  const getCoords = useMemo(
    () => (uf: string, nome: string) => {
      const m = municipios.find((x) => x.uf === uf && x.nome.toLowerCase() === nome.toLowerCase())
      return m ? { lat: m.latitude, lon: m.longitude } : null
    },
    [municipios],
  )

  return { municipios, states, getCitiesByState, getCoords, loading }
}
