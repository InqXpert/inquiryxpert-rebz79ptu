import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import {
  generateNumeroControle,
  validateDuplicidade,
  createProcesso,
  createAuditLog,
} from '@/services/processosService'
import { useAuth } from '@/hooks/use-auth'
import { sanitizeInput } from '@/services/validacaoService'

export const useNovoProcesso = () => {
  const { user } = useAuth()
  const [agentes, setAgentes] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loadingInitial, setLoadingInitial] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [duplicateFound, setDuplicateFound] = useState<any | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentesRes, usersRes] = await Promise.all([
          pb.collection('agentes').getFullList({ sort: 'nomeCompleto' }),
          pb.collection('users').getFullList({ sort: 'name' }),
        ])
        setAgentes(agentesRes)
        setUsers(usersRes)
      } catch (err) {
        console.error('Failed to load form data dependencies', err)
      } finally {
        setLoadingInitial(false)
      }
    }
    fetchData()
  }, [])

  const checkDuplicate = async (nomeSegurado: string, placas: string) => {
    if (!nomeSegurado || !placas) return null
    return await validateDuplicidade(nomeSegurado, placas)
  }

  const submit = async (data: any) => {
    setIsSubmitting(true)
    try {
      const sanitized = sanitizeInput(data)
      const numControle = await generateNumeroControle(
        sanitized.seguradora,
        sanitized.natureza_sinistro,
      )

      const payload = {
        numero_controle: numControle,
        status: sanitized.status,
        cia: sanitized.seguradora,
        descricao: sanitized.natureza_sinistro,
        tipo_servico: sanitized.tipo_investigacao,
        regiao_sinistro: sanitized.regiao_sinistro,
        controle_cia: sanitized.controle_cia,
        nome_segurado: sanitized.nome_segurado,
        placas_veiculos: sanitized.placas_veiculos,
        solicitante_id: sanitized.solicitante_id,
        agente_id: sanitized.agente_id,
        supervisor_id: sanitized.supervisor_id,
        data_entrada: new Date().toLocaleDateString('pt-BR'),
        user_id: user?.id,
      }

      const created = await createProcesso(payload)
      await createAuditLog(created.id, 'CRIADO', user?.id, null, payload)
      return created
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    agentes,
    users,
    loadingInitial,
    isSubmitting,
    duplicateFound,
    setDuplicateFound,
    checkDuplicate,
    submit,
  }
}
