import { useState, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import pb from '@/lib/pocketbase/client'
import { FormSelect, FormInput, FormCombobox } from './FormHelpers'
import { determineSupervisor } from '@/services/allocationService'

const STATUSES = ['ANALISE_INICIAL', 'EM_EXECUCAO', 'EM_ELABORACAO', 'FINALIZADO', 'CANCELADO']

export function ProcessoFormFields({
  form,
  users,
  agentes,
}: {
  form: UseFormReturn<any>
  users: any[]
  agentes: any[]
}) {
  const watchCia = form.watch('cia')
  const watchTipo = form.watch('tipo_servico')
  const watchStatus = form.watch('status')

  const [seguradoras, setSeguradoras] = useState<string[]>([])
  const [naturezas, setNaturezas] = useState<string[]>([])
  const [tiposInv, setTiposInv] = useState<string[]>([])

  useEffect(() => {
    pb.collection('clientes_contratos')
      .getFullList({ sort: 'razao_social' })
      .then((res) => {
        setSeguradoras(res.map((r) => r.razao_social))
      })
      .catch(console.error)

    pb.collection('naturezas_sinistro')
      .getFullList({ filter: 'ativo = true', sort: 'nome' })
      .then((res) => {
        setNaturezas(res.map((r) => r.nome))
      })
      .catch(console.error)

    pb.collection('tipos_investigacao')
      .getFullList({ filter: 'ativo = true', sort: 'nome' })
      .then((res) => {
        setTiposInv(res.map((r) => r.nome))
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (watchCia || watchTipo) {
      const suggestedId = determineSupervisor(watchTipo || '', watchCia || '', users)
      if (suggestedId) {
        form.setValue('supervisor_id', suggestedId, { shouldValidate: true })
      }
    }
  }, [watchCia, watchTipo, users, form])

  useEffect(() => {
    const today = new Date()
    const dateStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`

    if (watchStatus === 'EM_ELABORACAO' && !form.getValues('data_retorno')) {
      form.setValue('data_retorno', dateStr, { shouldValidate: true })
    }
    if (watchStatus === 'FINALIZADO' && !form.getValues('data_saida')) {
      form.setValue('data_saida', dateStr, { shouldValidate: true })
    }
  }, [watchStatus, form])

  const userOptions = users.map((u) => ({ label: u.name || 'Desconhecido', value: u.id }))
  const agenteOptions = agentes.map((a) => ({
    label: a.nomeCompleto || a.nome || 'Desconhecido',
    value: a.id,
  }))
  const superOptions = users
    .filter((u) => ['supervisor', 'admin', 'c-level'].includes(u.role))
    .map((u) => ({ label: u.name || 'Desconhecido', value: u.id }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormSelect form={form} name="cia" label="Seguradora" options={seguradoras} />
      <FormInput form={form} name="controle_cia" label="Controle Cia" />
      <FormSelect
        form={form}
        name="natureza_sinistro"
        label="Natureza do Sinistro"
        options={naturezas}
      />
      <FormSelect form={form} name="tipo_servico" label="Tipo de Investigação" options={tiposInv} />
      <FormInput form={form} name="local_sinistro" label="Região do Sinistro (ESTADO / CIDADE)" />
      <FormInput form={form} name="nome_segurado" label="Nome do Segurado" uppercase />
      <FormInput form={form} name="cpf_segurado" label="CPF do Segurado" />
      <FormInput form={form} name="nome_condutor" label="Nome do Condutor" uppercase />
      <FormInput form={form} name="cpf_condutor" label="CPF do Condutor" />
      <FormInput form={form} name="placas_veiculos" label="Placa do Veículo Segurado" />
      <FormCombobox form={form} name="agente_id" label="Agente" options={agenteOptions} />
      <FormSelect form={form} name="status" label="Status" options={STATUSES} />
      <FormCombobox form={form} name="supervisor_id" label="Supervisor" options={superOptions} />
    </div>
  )
}
