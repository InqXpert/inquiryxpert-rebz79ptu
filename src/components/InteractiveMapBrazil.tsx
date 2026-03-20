import { useEffect, useRef } from 'react'
import { Coords, AgentGeoInfo } from '@/hooks/use-geo-distance'
import { useToast } from '@/hooks/use-toast'

interface Props {
  investigationCoords: Coords | null
  agents: AgentGeoInfo[]
  nearestAgentId: string | null
  onSelectAgent: (id: string) => void
  distances?: Record<string, number>
}

export function InteractiveMapBrazil({
  investigationCoords,
  agents,
  nearestAgentId,
  onSelectAgent,
  distances,
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    const L = (window as any).L
    if (!L) {
      toast({ title: 'Erro ao carregar mapa', variant: 'destructive' })
      return
    }
    if (!mapContainerRef.current) return

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([-14.235, -51.9253], 4)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current)
    }

    const map = mapRef.current

    // Clear previous dynamic layers
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer)
      }
    })

    const markers: any[] = []

    const createIcon = (color: string, glow: boolean = false) =>
      L.divIcon({
        className: glow ? 'leaflet-marker-glow' : '',
        html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -8],
      })

    // 1. Draw all agents
    agents.forEach((agent) => {
      const isNearest = agent.id === nearestAgentId
      const icon = createIcon(isNearest ? '#22c55e' : '#3b82f6', isNearest)
      const marker = L.marker([agent.lat, agent.lon], { icon }).addTo(map)

      const dist = distances?.[agent.id]
      const distStr = dist ? `<br/>Distância: ${dist.toFixed(1)} km` : ''
      const costStr = agent.valorHora > 0 ? `<br/>Valor/h: R$ ${agent.valorHora.toFixed(2)}` : ''

      marker.bindPopup(`<b>${agent.name}</b>${distStr}${costStr}`)
      marker.on('click', () => onSelectAgent(agent.id))
      markers.push(marker)

      if (investigationCoords) {
        L.polyline(
          [
            [investigationCoords.lat, investigationCoords.lon],
            [agent.lat, agent.lon],
          ],
          {
            color: isNearest ? '#22c55e' : '#9ca3af',
            weight: isNearest ? 3 : 1,
            opacity: isNearest ? 1 : 0.4,
          },
        ).addTo(map)
      }
    })

    // 2. Draw investigation point
    if (investigationCoords) {
      const invIcon = createIcon('#ef4444')
      const invMarker = L.marker([investigationCoords.lat, investigationCoords.lon], {
        icon: invIcon,
      }).addTo(map)
      invMarker.bindPopup('<b>Local da Investigação</b>')
      markers.push(invMarker)
    }

    if (markers.length > 0) {
      const group = L.featureGroup(markers)
      map.fitBounds(group.getBounds(), { padding: [50, 50] })
    } else {
      map.setView([-14.235, -51.9253], 4)
    }
  }, [investigationCoords, agents, nearestAgentId, distances, onSelectAgent, toast])

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full rounded-2xl z-0 relative isolate"
      aria-label="Mapa interativo Brasil - agentes proximos"
    />
  )
}
