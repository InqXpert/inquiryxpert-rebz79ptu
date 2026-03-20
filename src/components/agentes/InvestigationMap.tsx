import { useState, useMemo, useEffect, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { MapPin, CheckCircle2, AlertTriangle, ChevronsUpDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Agente } from '@/types'
import { useGeoDistance, Coords, AgentGeoInfo } from '@/hooks/use-geo-distance'
import { InteractiveMapBrazil } from '@/components/InteractiveMapBrazil'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import { useMunicipios } from '@/hooks/use-municipios'

interface Props {
  agentes: Agente[]
  loading: boolean
}

export function InvestigationMap({ agentes, loading: agentsLoading }: Props) {
  const [invState, setInvState] = useState<string>('')
  const [invCity, setInvCity] = useState<string>('')
  const [invCoords, setInvCoords] = useState<Coords | null>(null)
  const [nearestId, setNearestId] = useState<string | null>(null)
  const [distances, setDistances] = useState<Record<string, number>>({})

  const [openState, setOpenState] = useState(false)
  const [openCity, setOpenCity] = useState(false)

  const { calculateDistance, findNearestAgent } = useGeoDistance()
  const { states, getCitiesByState, getCoords, loading: muniLoading } = useMunicipios()
  const navigate = useNavigate()

  const cities = useMemo(
    () => (invState ? getCitiesByState(invState) : []),
    [invState, getCitiesByState],
  )

  const mappedAgents: AgentGeoInfo[] = useMemo(() => {
    if (muniLoading) return []
    return agentes
      .filter((a) => a.ativo === 'Sim' && a.base_atendimento_cidade && a.base_atendimento_estado)
      .map((a) => {
        const coords = getCoords(a.base_atendimento_estado!, a.base_atendimento_cidade!)
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
  }, [agentes, getCoords, muniLoading])

  const handleCalculate = useCallback(() => {
    const coords = getCoords(invState, invCity)
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
  }, [invState, invCity, getCoords, findNearestAgent, mappedAgents, calculateDistance])

  useEffect(() => {
    if (invState && invCity) {
      handleCalculate()
    } else {
      setInvCoords(null)
      setNearestId(null)
      setDistances({})
    }
  }, [invState, invCity, handleCalculate])

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

  if (agentsLoading || muniLoading) {
    return <Skeleton className="w-full h-[500px] rounded-2xl" />
  }

  return (
    <Card className="rounded-2xl shadow-sm border-none overflow-hidden flex flex-col mt-6 animate-in fade-in zoom-in duration-300">
      <div className="p-4 sm:p-6 bg-muted/10 border-b border-border/50">
        <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-secondary" /> Inteligência Logística
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
              Estado da Investigação
            </label>
            <Popover open={openState} onOpenChange={setOpenState}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openState}
                  className={cn(
                    'w-full justify-between h-12 rounded-xl font-normal',
                    !invState && 'text-muted-foreground',
                  )}
                >
                  {invState || 'Selecione o estado...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Buscar estado..." />
                  <CommandList>
                    <CommandEmpty>Nenhum estado encontrado.</CommandEmpty>
                    <CommandGroup>
                      {states.map((s) => (
                        <CommandItem
                          key={s}
                          value={s}
                          onSelect={(currentValue) => {
                            const actualValue =
                              states.find(
                                (st) => st.toLowerCase() === currentValue.toLowerCase(),
                              ) || currentValue
                            setInvState(actualValue === invState ? '' : actualValue)
                            setInvCity('')
                            setOpenState(false)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              invState === s ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                          {s}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex-1 w-full">
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
              Cidade da Investigação
            </label>
            <Popover open={openCity} onOpenChange={setOpenCity}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCity}
                  disabled={!invState}
                  className={cn(
                    'w-full justify-between h-12 rounded-xl font-normal',
                    !invCity && 'text-muted-foreground',
                  )}
                >
                  {invCity || 'Selecione a cidade...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Buscar cidade..." />
                  <CommandList>
                    <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
                    <CommandGroup>
                      {cities.map((c) => (
                        <CommandItem
                          key={c.nome}
                          value={c.nome}
                          onSelect={(currentValue) => {
                            const actualValue =
                              cities.find(
                                (ct) => ct.nome.toLowerCase() === currentValue.toLowerCase(),
                              )?.nome || currentValue
                            setInvCity(actualValue === invCity ? '' : actualValue)
                            setOpenCity(false)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              invCity === c.nome ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                          {c.nome}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[400px] md:h-[500px] bg-muted/30">
        {!invCity ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground z-10 bg-muted/10 backdrop-blur-[1px]">
            <MapPin className="w-10 h-10 mb-3 opacity-50" />
            <p className="font-medium">Selecione estado e cidade para buscar agentes</p>
          </div>
        ) : mappedAgents.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground z-10 bg-muted/10 backdrop-blur-[1px] pointer-events-none">
            <AlertTriangle className="w-10 h-10 mb-3 opacity-50 text-yellow-600" />
            <p className="font-medium">Nenhum agente ativo encontrado nesta região.</p>
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
            Acessar Perfil
          </Button>
        </div>
      )}
    </Card>
  )
}
