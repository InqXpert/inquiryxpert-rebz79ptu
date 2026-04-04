import pb from '@/lib/pocketbase/client'

export interface NotaFiscal {
  id: string
  numero_nf: string
  cliente_id: string
  periodo_id: string
  data_emissao: string
  valor_total: number
  impostos: number
  valor_liquido: number
  status: 'emitida' | 'enviada' | 'paga' | 'cancelada'
  data_vencimento: string
  data_pagamento?: string
  expand?: {
    cliente_id?: {
      id: string
      razao_social: string
      aliquota_imposto: number
      retencao_na_fonte: boolean
      aliquota_retencao: number
    }
    periodo_id?: {
      id: string
      data_inicio: string
      data_fim: string
    }
  }
}

export const notasFiscaisService = {
  async getList(clienteId?: string, status?: string) {
    const filters: string[] = []
    if (clienteId && clienteId !== 'all') filters.push(`cliente_id = '${clienteId}'`)
    if (status && status !== 'all') filters.push(`status = '${status}'`)

    return pb.collection('notas_fiscais').getFullList<NotaFiscal>({
      filter: filters.join(' && '),
      sort: '-created',
      expand: 'cliente_id,periodo_id',
    })
  },

  async create(data: Partial<NotaFiscal>) {
    return pb.collection('notas_fiscais').create<NotaFiscal>(data)
  },

  async updateStatus(id: string, status: string, extra: Partial<NotaFiscal> = {}) {
    return pb.collection('notas_fiscais').update<NotaFiscal>(id, { status, ...extra })
  },

  async getClientesAtivos() {
    return pb.collection('clientes_contratos').getFullList({
      filter: "status = 'ativo'",
      sort: 'razao_social',
    })
  },

  async getPeriodosFechados() {
    return pb.collection('periodos_faturamento').getFullList({
      filter: "status = 'fechado'",
      expand: 'cliente_id',
      sort: '-created',
    })
  },

  async updatePeriodoStatus(id: string, status: string) {
    return pb.collection('periodos_faturamento').update(id, { status })
  },
}
