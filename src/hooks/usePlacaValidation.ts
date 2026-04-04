import { useState, useEffect } from 'react'
import {
  validatePlateFormat,
  checkPlateDuplicates,
  checkRelatedInsured,
} from '@/services/placaValidacaoService'
import type { PlateValidationResult, InsuredValidationResult } from '@/types/placa'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/use-auth'

export const usePlacaValidation = (placasString: string, excludeId?: string) => {
  const { toast } = useToast()
  const { user } = useAuth()
  const [result, setResult] = useState<PlateValidationResult>({ state: 'IDLE', duplicates: [] })

  useEffect(() => {
    if (!placasString || !placasString.trim()) {
      setResult({ state: 'IDLE', duplicates: [] })
      return
    }

    setResult((prev) => ({ ...prev, state: 'TYPING' }))

    const timer = setTimeout(async () => {
      setResult((prev) => ({ ...prev, state: 'VALIDATING' }))

      const plates = placasString
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean)
      let allValidFormat = true
      for (const p of plates) {
        if (!validatePlateFormat(p)) {
          allValidFormat = false
          break
        }
      }

      if (!allValidFormat) {
        setResult({
          state: 'INVALID',
          message: 'Formato de placa inválido. Use ABC-1234 ou ABC1D34',
          duplicates: [],
        })
        return
      }

      try {
        const duplicates = await checkPlateDuplicates(plates, user?.id, excludeId)
        if (duplicates.length > 0) {
          setResult({
            state: 'WARNING',
            message: 'Placa já existe em outro processo ativo',
            duplicates,
          })
        } else {
          setResult({ state: 'VALID', message: 'Placa válida', duplicates: [] })
        }
      } catch (err) {
        toast({ title: 'Erro ao validar placa. Tente novamente', variant: 'destructive' })
        setResult({ state: 'IDLE', duplicates: [] })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [placasString, excludeId, toast, user?.id])

  return result
}

export const useInsuredValidation = (nomeSegurado: string, excludeId?: string) => {
  const { toast } = useToast()
  const { user } = useAuth()
  const [result, setResult] = useState<InsuredValidationResult>({ state: 'IDLE', related: [] })

  useEffect(() => {
    if (!nomeSegurado || !nomeSegurado.trim()) {
      setResult({ state: 'IDLE', related: [] })
      return
    }

    setResult((prev) => ({ ...prev, state: 'TYPING' }))

    const timer = setTimeout(async () => {
      setResult((prev) => ({ ...prev, state: 'VALIDATING' }))

      try {
        const related = await checkRelatedInsured(nomeSegurado, user?.id, excludeId)
        if (related.length > 0) {
          setResult({
            state: 'WARNING',
            message: 'Encontramos processos para este segurado',
            related,
          })
        } else {
          setResult({ state: 'IDLE', related: [] })
        }
      } catch (err) {
        toast({ title: 'Erro ao buscar histórico. Tente novamente', variant: 'destructive' })
        setResult({ state: 'IDLE', related: [] })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [nomeSegurado, excludeId, toast, user?.id])

  return result
}
