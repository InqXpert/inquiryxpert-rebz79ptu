import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import {
  generateNumeroControle,
  validateDuplicidade,
  createProcesso,
  createAuditLog,
} from '@/services/processosService'
import type { NovoProcesso } from '@/types/processo'
import { useAuth } from '@/hooks/use-auth'

export const useNovoProcesso = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState<NovoProcesso>({
    seguradora: '',
    controle_cia: '',
    natureza_sinistro: '',
    tipo_investigacao: '',
    regiao_sinistro: '',
    nome_segurado: '',
    placas_veiculos: '',
    solicitante_id: '',
    agente_id: '',
    status: 'ANALISE_INICIAL',
    supervisor_id: '',
  })
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

  const handleChange = (field: keyof NovoProcesso, value: string) => {
    let finalValue = value
    if (field === 'nome_segurado' || field === 'placas_veiculos') {
      finalValue = value.toUpperCase()
    }
    setFormData((prev) => {
      const next = { ...prev, [field]: finalValue }

      if (field === 'seguradora' || field === 'tipo_investigacao') {
        const possibleSupervisors = users.filter((u) => u.role === 'supervisor')
        if (possibleSupervisors.length > 0 && next.seguradora && next.tipo_investigacao) {
          next.supervisor_id = possibleSupervisors[0].id
        }
      }

      return next
    })
  }

  const checkDuplicate = async () => {
    if (!formData.nome_segurado || !formData.placas_veiculos) return null
    return await validateDuplicidade(formData.nome_segurado, formData.placas_veiculos)
  }

  const submit = async () => {
    setIsSubmitting(true)
    try {
      const numControle = await generateNumeroControle(
        formData.seguradora,
        formData.natureza_sinistro,
      )

      const payload = {
        numero_controle: numControle,
        status: formData.status,
        cia: formData.seguradora,
        descricao: formData.natureza_sinistro,
        tipo_servico: formData.tipo_investigacao,
        regiao_sinistro: formData.regiao_sinistro,
        controle_cia: formData.controle_cia,
        nome_segurado: formData.nome_segurado,
        placas_veiculos: formData.placas_veiculos,
        solicitante_id: formData.solicitante_id,
        agente_id: formData.agente_id,
        supervisor_id: formData.supervisor_id,
        data_entrada: new Date().toISOString(),
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
    formData,
    handleChange,
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
