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
import { toast } from 'sonner'

export const useNovoProcesso = () => {
  const { user } = useAuth()
  const [agentes, setAgentes] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [supervisores, setSupervisores] = useState<any[]>([])
  const [loadingInitial, setLoadingInitial] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [duplicateFound, setDuplicateFound] = useState<any | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentesRes, usersRes, supervisoresRes] = await Promise.all([
          pb.collection('agentes').getFullList({ sort: 'nomeCompleto' }),
          pb.collection('users').getFullList({ sort: 'name' }),
          pb.collection('users').getFullList({
            sort: 'name',
            filter: "role='c-level' || role='admin' || role='supervisor'",
          }),
        ])
        setAgentes(agentesRes)
        setUsers(usersRes)
        setSupervisores(supervisoresRes)
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

      let data_prazo: string | undefined = undefined

      try {
        let contrato: any = null

        if (sanitized.cliente_id) {
          try {
            contrato = await pb.collection('clientes_contratos').getOne(sanitized.cliente_id)
          } catch (_) {
            try {
              const clienteRef = await pb.collection('clientes').getOne(sanitized.cliente_id)
              contrato = await pb
                .collection('clientes_contratos')
                .getFirstListItem(`razao_social = "${clienteRef.nome}"`)
            } catch (__) {}
          }
        }

        if (!contrato && sanitized.seguradora) {
          try {
            contrato = await pb
              .collection('clientes_contratos')
              .getFirstListItem(`razao_social = "${sanitized.seguradora}"`)
          } catch (_) {}
        }

        let tipo_id = sanitized.tipo_investigacao_id
        if (!tipo_id && sanitized.tipo_investigacao) {
          try {
            const t = await pb
              .collection('tipos_investigacao')
              .getFirstListItem(`nome = "${sanitized.tipo_investigacao}"`)
            tipo_id = t.id
          } catch (_) {}
        }

        if (contrato && contrato.regras_sla && tipo_id) {
          const regras = contrato.regras_sla as Array<{
            tipo_id: string
            dias: number
            tipo_contagem: string
          }>
          const regra = regras.find((r) => r.tipo_id === tipo_id)

          if (!regra) {
            throw new Error('SLA rule missing')
          }

          if (regra && typeof regra.dias === 'number') {
            const dataAtual = new Date()
            let diasAdicionados = 0

            if (regra.tipo_contagem === 'uteis') {
              while (diasAdicionados < regra.dias) {
                dataAtual.setDate(dataAtual.getDate() + 1)
                const diaSemana = dataAtual.getDay()
                if (diaSemana !== 0 && diaSemana !== 6) {
                  diasAdicionados++
                }
              }
            } else {
              dataAtual.setDate(dataAtual.getDate() + regra.dias)
            }
            data_prazo = dataAtual.toISOString()
          }
        }
      } catch (e) {
        console.error('Erro ao calcular prazo de SLA', e)
        toast.error('Erro ao calcular prazo de SLA')
      }

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
        data_prazo: data_prazo,
        cliente_id: sanitized.cliente_id,
        tipo_investigacao_id: sanitized.tipo_investigacao_id,
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
    supervisores,
    loadingInitial,
    isSubmitting,
    duplicateFound,
    setDuplicateFound,
    checkDuplicate,
    submit,
  }
}
