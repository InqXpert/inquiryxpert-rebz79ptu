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

export interface ClienteAnalista {
  id: string
  cliente_id: string
  nome: string
  email: string
  telefone: string
  cargo: string
  ativo: boolean
  created?: string
  updated?: string
}

export const getAnalistasPorCliente = async (clienteId: string) => {
  return pb.collection('clientes_analistas').getFullList<ClienteAnalista>({
    filter: `cliente_id = "${clienteId}"`,
    sort: 'nome',
  })
}

export const createAnalista = async (data: Partial<ClienteAnalista>) => {
  return pb.collection('clientes_analistas').create<ClienteAnalista>(data)
}

export const updateAnalista = async (id: string, data: Partial<ClienteAnalista>) => {
  return pb.collection('clientes_analistas').update<ClienteAnalista>(id, data)
}

export const deleteAnalista = async (id: string) => {
  return pb.collection('clientes_analistas').delete(id)
}
