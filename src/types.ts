export interface User {
  id: string
  collectionId: string
  collectionName: string
  username?: string
  verified: boolean
  emailVisibility: boolean
  email: string
  created: string
  updated: string
  name?: string
  avatar?: string
  role?: 'c-level' | 'admin' | 'supervisor' | 'analista'
  status_conta?: string
  ultimo_login?: string
  tempo_uso_total?: number
  foto_perfil?: string
  two_fa_enabled?: boolean
  two_fa_secret?: string
  [key: string]: any
}

export interface UsuarioHistorico {
  id: string
  user_id: string
  acao: string
  descricao: string
  ip_address: string
  user_agent: string
  created: string
  usuario_afetado_id?: string
  expand?: any
}

export interface UsuarioSessao {
  id: string
  user_id: string
  token: string
  ip_address: string
  duracao_minutos: number
  expirada: boolean
  created: string
}

export interface ClienteContrato {
  id: string
  razao_social: string
  cnpj: string
  email_contato?: string
  tipo_emissao?: 'unitaria_processo' | 'unitaria_lote'
  periodo_faturamento?: 'mensal' | 'trimestral' | 'por_demanda'
  dia_corte?: number
  agrupamento?: 'por_supervisor' | 'por_tipo' | 'por_regiao' | 'sem_agrupamento'
  condicao_pagamento?: string
  tipo_imposto?: 'ISS' | 'ICMS' | 'INSS' | 'IR' | 'nenhum'
  aliquota_imposto?: number
  retencao_na_fonte?: boolean
  aliquota_retencao?: number
  status?: 'ativo' | 'inativo'
  created: string
  updated: string
}

export interface PeriodoFaturamento {
  id: string
  cliente_id: string
  data_inicio: string
  data_fim: string
  status?: 'aberto' | 'fechado' | 'faturado' | 'pago'
  total_processos?: number
  faturamento_total?: number
  created: string
  updated: string
}

export interface NotaFiscal {
  id: string
  numero_nf: string
  cliente_id: string
  periodo_id: string
  data_emissao: string
  valor_total?: number
  impostos?: number
  valor_liquido?: number
  status?: 'emitida' | 'enviada' | 'paga' | 'cancelada'
  data_vencimento?: string
  data_pagamento?: string
  created: string
  updated: string
}
