import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { validateDuplicidade, createAuditLog } from '@/services/processosService'
import { createProcesso, generateFullNumeroControle } from '@/services/procesosOperacionais'
import { ClienteContrato, ClienteAnalista } from '@/services/clientes_contratos'
import { useAuth } from '@/hooks/use-auth'
import { sanitizeInput } from '@/services/validacaoService'
import { toast } from 'sonner'

export const useNovoProcesso = () => {
  const { user } = useAuth()
  const [agentes, setAgentes] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [supervisores, setSupervisores] = useState<any[]>([])
  const [clientes, setClientes] = useState<ClienteContrato[]>([])
  const [analistas, setAnalistas] = useState<ClienteAnalista[]>([])
  const [naturezas, setNaturezas] = useState<any[]>([])
  const [tiposInvestigacao, setTiposInvestigacao] = useState<any[]>([])
  const [loadingInitial, setLoadingInitial] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [duplicateFound, setDuplicateFound] = useState<any | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          agentesRes,
          usersRes,
          supervisoresRes,
          clientesRes,
          analistasRes,
          naturezasRes,
          tiposRes,
        ] = await Promise.all([
          pb.collection('agentes').getFullList({ sort: 'nomeCompleto' }),
          pb.collection('users').getFullList({ sort: 'name' }),
          pb.collection('users').getFullList({
            sort: 'name',
            filter: "role='c-level' || role='admin' || role='supervisor'",
          }),
          pb
            .collection('clientes_contratos')
            .getFullList<ClienteContrato>({ sort: 'razao_social' }),
          pb
            .collection('clientes_analistas')
            .getFullList<ClienteAnalista>({ filter: 'ativo = true', sort: 'nome' }),
          pb.collection('naturezas_sinistro').getFullList({ filter: 'ativo = true', sort: 'nome' }),
          pb.collection('tipos_investigacao').getFullList({ filter: 'ativo = true', sort: 'nome' }),
        ])
        setAgentes(agentesRes)
        setUsers(usersRes)
        setSupervisores(supervisoresRes)
        setClientes(clientesRes)
        setAnalistas(analistasRes)
        setNaturezas(naturezasRes)
        setTiposInvestigacao(tiposRes)
      } catch (err) {
        console.error('Failed to load form data dependencies', err)
      } finally {
        setLoadingInitial(false)
      }
    }
    fetchData()
  }, [])

  const checkDuplicate = async (nomeSegurado: string, placas: string) => {
    if (!nomeSegurado) return null
    return await validateDuplicidade(nomeSegurado, placas || '')
  }

  const submit = async (data: any) => {
    setIsSubmitting(true)
    try {
      const sanitized = sanitizeInput(data)
      const nat = naturezas.find((n) => n.nome === sanitized.natureza_sinistro)
      const cli = clientes.find((c) => c.razao_social === sanitized.seguradora)

      let numControle = await generateFullNumeroControle(
        sanitized.seguradora,
        sanitized.natureza_sinistro,
        nat?.codigo,
        cli?.codigo,
      )

      let data_prazo: string | undefined = undefined

      try {
        let contrato: any = null

        if (sanitized.cliente_id) {
          try {
            contrato = await pb.collection('clientes_contratos').getOne(sanitized.cliente_id)
          } catch (_) {
            // Ignore if no contract is found
          }
        }

        if (!contrato && sanitized.seguradora) {
          try {
            contrato = await pb
              .collection('clientes_contratos')
              .getFirstListItem(`razao_social = "${sanitized.seguradora}"`)
          } catch (_) {
            // Ignore if no contract is found by insurer name
          }
        }

        let tipo_id = sanitized.tipo_investigacao_id
        if (!tipo_id && sanitized.tipo_investigacao) {
          try {
            const t = await pb
              .collection('tipos_investigacao')
              .getFirstListItem(`nome = "${sanitized.tipo_investigacao}"`)
            tipo_id = t.id
          } catch (_) {
            // Ignore if no investigation type is found
          }
        }

        let regraAplicada: { dias: number; tipo_contagem: string } | null = null

        if (contrato && Array.isArray(contrato.regras_sla) && tipo_id) {
          const regras = contrato.regras_sla as Array<{
            tipo_id: string
            dias: number
            tipo_contagem: string
          }>
          const regraEncontrada = regras.find((r) => r.tipo_id === tipo_id)
          if (regraEncontrada) {
            regraAplicada = regraEncontrada
          }
        }

        if (!regraAplicada) {
          regraAplicada = { dias: 5, tipo_contagem: 'uteis' }
          toast.warning(
            'Regra de SLA específica não encontrada. Aplicando prazo padrão de 5 dias úteis.',
          )
        }

        if (regraAplicada && typeof regraAplicada.dias === 'number') {
          const dataAtual = new Date()
          let diasAdicionados = 0

          if (regraAplicada.tipo_contagem === 'uteis') {
            while (diasAdicionados < regraAplicada.dias) {
              dataAtual.setDate(dataAtual.getDate() + 1)
              const diaSemana = dataAtual.getDay()
              if (diaSemana !== 0 && diaSemana !== 6) {
                diasAdicionados++
              }
            }
          } else {
            dataAtual.setDate(dataAtual.getDate() + regraAplicada.dias)
          }
          data_prazo = dataAtual.toISOString()
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
        cpf_segurado: sanitized.cpf_segurado || null,
        nome_condutor: sanitized.nome_condutor || null,
        cpf_condutor: sanitized.cpf_condutor || null,
        placas_veiculos: sanitized.placas_veiculos || '',
        analista_cliente_id: sanitized.analista_cliente_id || null,
        agente_id: sanitized.agente_id || null,
        supervisor_id: sanitized.supervisor_id || null,
        data_entrada: new Date().toLocaleDateString('pt-BR'),
        data_prazo: data_prazo,
        cliente_id: sanitized.cliente_id || null,
        tipo_investigacao_id: sanitized.tipo_investigacao_id || null,
        dados_terceiros: sanitized.dados_terceiros || [],
        user_id: user?.id,
      }

      const created = await createProcesso(payload)
      await createAuditLog(created.id, 'CRIADO', user?.id, null, payload)
      return created
    } finally {
      setIsSubmitting(false)
    }
  }

  const createAnalista = async (data: Partial<ClienteAnalista>) => {
    try {
      const created = await pb.collection('clientes_analistas').create<ClienteAnalista>({
        ...data,
        ativo: true,
      })
      setAnalistas((prev) => [...prev, created].sort((a, b) => a.nome.localeCompare(b.nome)))
      return created
    } catch (error) {
      console.error('Failed to create analista', error)
      throw error
    }
  }

  return {
    agentes,
    users,
    supervisores,
    clientes,
    analistas,
    naturezas,
    tiposInvestigacao,
    loadingInitial,
    isSubmitting,
    duplicateFound,
    setDuplicateFound,
    checkDuplicate,
    submit,
    createAnalista,
  }
}
