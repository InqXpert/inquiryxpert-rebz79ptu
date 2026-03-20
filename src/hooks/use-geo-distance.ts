import { useCallback } from 'react'

export interface Coords {
  lat: number
  lon: number
}

export interface AgentGeoInfo extends Coords {
  id: string
  name: string
  valorHora: number
}

export function useGeoDistance() {
  const calculateDistance = useCallback(
    (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371 // km
      const dLat = ((lat2 - lat1) * Math.PI) / 180
      const dLon = ((lon2 - lon1) * Math.PI) / 180
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      return R * c
    },
    [],
  )

  const findNearestAgent = useCallback(
    (investigationCoords: Coords, agents: AgentGeoInfo[]) => {
      if (!agents.length) return null

      let nearest: AgentGeoInfo | null = null
      let minDistance = Infinity

      for (const agent of agents) {
        const dist = calculateDistance(
          investigationCoords.lat,
          investigationCoords.lon,
          agent.lat,
          agent.lon,
        )
        if (dist < minDistance) {
          minDistance = dist
          nearest = agent
        }
      }

      return nearest ? { agent: nearest, distance: minDistance } : null
    },
    [calculateDistance],
  )

  return { calculateDistance, findNearestAgent }
}
