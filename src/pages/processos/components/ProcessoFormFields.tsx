import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormSelect, FormInput, FormCombobox } from './FormHelpers'
import { determineSupervisor } from '@/services/allocationService'

const SEGURADORAS = [
  'ZURICH',
  'MAPFRE',
  'SUHAI',
  'BRADESCO',
  'NEO',
  'SPLIT RISK',
  'COOPERLINK',
  'KVOR',
  'MAIS BRASIL',
  'AUTOINSP',
  'SEVEN',
  'CARDIF',
]
const NATUREZAS = [
  'COLISAO COM TERCEIRO',
  'COLISAO SEM TERCEIRO',
  'INCENDIO',
  'ROUBO',
  'FURTO',
  'ENCHENTE',
  'PROPERTY',
  'I.E',
]
const TIPOS_INV = [
  'AUTO',
  'BUSCA B.O DOCS',
  'PERFIL',
  'FAST',
  'PROPERTY RES D.E',
  'PROPERTY MAQUINAS',
  'PROPERTY FURTO ROUBO',
  'PROPERTY RES EQUIP',
  'REMOTA',
  'I.E',
  'VIDA PREGRESSA',
]
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
      <FormSelect form={form} name="cia" label="Seguradora" options={SEGURADORAS} />
      <FormInput form={form} name="controle_cia" label="Controle Cia" />
      <FormSelect
        form={form}
        name="natureza_sinistro"
        label="Natureza do Sinistro"
        options={NATUREZAS}
      />
      <FormSelect
        form={form}
        name="tipo_servico"
        label="Tipo de Investigação"
        options={TIPOS_INV}
      />
      <FormInput form={form} name="local_sinistro" label="Região do Sinistro (ESTADO / CIDADE)" />
      <FormInput form={form} name="nome_segurado" label="Nome do Segurado" uppercase />
      <FormInput
        form={form}
        name="placas_veiculos"
        label="Placas dos Veículos (separadas por vírgula)"
      />
      <FormCombobox form={form} name="solicitante_id" label="Solicitante" options={userOptions} />
      <FormCombobox form={form} name="agente_id" label="Agente" options={agenteOptions} />
      <FormSelect form={form} name="status" label="Status" options={STATUSES} />
      <FormCombobox form={form} name="supervisor_id" label="Supervisor" options={superOptions} />
    </div>
  )
}
