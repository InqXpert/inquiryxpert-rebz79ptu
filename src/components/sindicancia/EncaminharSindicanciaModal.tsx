import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export interface EncaminharSindicanciaModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  processoId?: string
  agenteId?: string
  onSuccess?: (id: string) => void
}

export function EncaminharSindicanciaModal({
  open,
  onOpenChange,
  processoId,
  agenteId,
}: EncaminharSindicanciaModalProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      const query = new URLSearchParams()
      if (processoId) query.set('processo_id', processoId)
      if (agenteId) query.set('agente_id', agenteId)

      onOpenChange?.(false)
      navigate(`/sindicancia/encaminhar?${query.toString()}`)
    }
  }, [open, navigate, processoId, agenteId, onOpenChange])

  return null
}
