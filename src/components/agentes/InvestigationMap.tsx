import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { MapPin, Calculator, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Agente } from '@/types'
import { BR_STATES, getCitiesByState, getCityCoords } from '@/services/brazilCities'
import { useGeoDistance, Coords, AgentGeoInfo } from '@/hooks/use-geo-distance'
import { InteractiveMapBrazil } from '@/components/InteractiveMapBrazil'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  agentes: Agente[]
  loading: boolean
}

export function InvestigationMap({ agentes, loading }: Props) {
  const [invState, setInvState] = useState<string>('')
  const [invCity, setInvCity] = useState<string>('')
  const [invCoords, setInvCoords] = useState<Coords | null>(null)
  const [nearestId, setNearestId] = useState<string | null>(null)
  const [distances, setDistances] = useState<Record<string, number>>({})

  const { calculateDistance, findNearestAgent } = useGeoDistance()
  const navigate = useNavigate()

  const cities = useMemo(() => (invState ? getCitiesByState(invState) : []), [invState])

  const mappedAgents: AgentGeoInfo[] = useMemo(() => {
    return agentes
      .filter((a) => a.ativo === 'Sim' && a.base_atendimento_cidade && a.base_atendimento_estado)
      .map((a) => {
        const coords = getCityCoords(a.base_atendimento_cidade, a.base_atendimento_estado)
        if (!coords) return null
        return {
          id: a.id,
          name: a.nomeCompleto,
          lat: coords.lat,
          lon: coords.lon,
          valorHora: a.valor_hora || a.valorHonorario || 0,
        }
      })
      .filter(Boolean) as AgentGeoInfo[]
  }, [agentes])

  const handleCalculate = () => {
    const coords = getCityCoords(invCity, invState)
    if (!coords) {
      setInvCoords(null)
      setNearestId(null)
      setDistances({})
      return
    }
    setInvCoords(coords)

    const result = findNearestAgent(coords, mappedAgents)
    if (result) {
      setNearestId(result.agent.id)
      const newDistances: Record<string, number> = {}
      mappedAgents.forEach((a) => {
        newDistances[a.id] = calculateDistance(coords.lat, coords.lon, a.lat, a.lon)
      })
      setDistances(newDistances)
    } else {
      setNearestId(null)
      setDistances({})
    }
  }

  const selectedAgentInfo = useMemo(() => {
    if (!nearestId || !distances[nearestId]) return null
    const a = mappedAgents.find((x) => x.id === nearestId)
    if (!a) return null
    return {
      ...a,
      distance: distances[nearestId],
      estimatedCost: distances[nearestId] * a.valorHora,
    }
  }, [nearestId, distances, mappedAgents])

  if (loading) {
    return <Skeleton className="w-full h-[500px] rounded-2xl" />
  }

  return (
    <Card className="rounded-2xl shadow-sm border-none overflow-hidden flex flex-col mt-6 animate-in fade-in zoom-in duration-300">
      <div className="p-4 sm:p-6 bg-muted/10 border-b border-border/50">
        <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-secondary" /> Inteligência Logística
        </h3>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
              Estado da Investigação
            </label>
            <Select
              value={invState}
              onValueChange={(v) => {
                setInvState(v)
                setInvCity('')
              }}
            >
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Selecione o estado..." />
              </SelectTrigger>
              <SelectContent>
                {BR_STATES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
              Cidade da Investigação
            </label>
            <Select value={invCity} onValueChange={setInvCity} disabled={!invState}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Selecione a cidade..." />
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c.name} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleCalculate}
            disabled={!invCity}
            className="h-12 px-6 rounded-xl bg-secondary text-white hover:bg-secondary/90 font-semibold gap-2 w-full sm:w-auto"
          >
            <Calculator className="w-4 h-4" /> Calcular Mais Próximo
          </Button>
        </div>
      </div>

      <div className="relative w-full h-[400px] md:h-[500px] bg-muted/30">
        {!invCoords ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground z-10 bg-muted/10 backdrop-blur-[1px]">
            <MapPin className="w-10 h-10 mb-3 opacity-50" />
            <p className="font-medium">Selecione estado/cidade da investigação</p>
          </div>
        ) : mappedAgents.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground z-10 bg-muted/10 backdrop-blur-[1px]">
            <AlertTriangle className="w-10 h-10 mb-3 opacity-50 text-yellow-600" />
            <p className="font-medium">Nenhum agente ativo com base cadastrada.</p>
          </div>
        ) : null}
        <InteractiveMapBrazil
          agents={mappedAgents}
          investigationCoords={invCoords}
          nearestAgentId={nearestId}
          distances={distances}
          onSelectAgent={(id) => setNearestId(id)}
        />
      </div>

      {selectedAgentInfo && (
        <div className="p-4 sm:p-6 bg-green-50 border-t border-green-100 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-4">
          <div>
            <h4 className="font-bold text-green-900 text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Agente sugerido: {selectedAgentInfo.name}
            </h4>
            <div className="flex gap-4 mt-2 text-sm text-green-800 font-medium">
              <span>Distância: {selectedAgentInfo.distance.toFixed(1)} km</span>
              <span>Custo Estimado: R$ {selectedAgentInfo.estimatedCost.toFixed(2)}</span>
            </div>
          </div>
          <Button
            className="rounded-xl h-11 px-8 bg-green-600 hover:bg-green-700 text-white font-bold w-full sm:w-auto shadow-sm"
            onClick={() => navigate(`/agentes/${selectedAgentInfo.id}`)}
          >
            Selecionar Agente
          </Button>
        </div>
      )}
    </Card>
  )
}
