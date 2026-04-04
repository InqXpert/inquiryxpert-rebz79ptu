import pb from '@/lib/pocketbase/client'

export interface ClienteContrato {
  id: string
  razao_social: string
  cnpj: string
  email_contato: string
  tipo_emissao: 'unitaria_processo' | 'unitaria_lote'
  periodo_faturamento: 'mensal' | 'trimestral' | 'por_demanda'
  dia_corte: number
  agrupamento: 'por_supervisor' | 'por_tipo' | 'por_regiao' | 'sem_agrupamento'
  condicao_pagamento: string
  tipo_imposto: 'ISS' | 'ICMS' | 'INSS' | 'IR' | 'nenhum'
  aliquota_imposto: number
  retencao_na_fonte: boolean
  aliquota_retencao: number
  status: 'ativo' | 'inativo'
  created: string
  updated: string
}

export const getClientes = async (search?: string) => {
  const filter = search ? `razao_social ~ "${search}" || cnpj ~ "${search}"` : ''
  return pb
    .collection('clientes_contratos')
    .getFullList<ClienteContrato>({ filter, sort: '-created' })
}

export const getCliente = async (id: string) => {
  return pb.collection('clientes_contratos').getOne<ClienteContrato>(id)
}

export const createCliente = async (data: Partial<ClienteContrato>) => {
  return pb.collection('clientes_contratos').create<ClienteContrato>(data)
}

export const updateCliente = async (id: string, data: Partial<ClienteContrato>) => {
  return pb.collection('clientes_contratos').update<ClienteContrato>(id, data)
}

export const deleteCliente = async (id: string) => {
  return pb.collection('clientes_contratos').delete(id)
}
