export interface Processo {
  id: string
  numero_processo?: string
  numero_controle?: string
  status: string
  prioridade?: 'baixa' | 'media' | 'alta' | ''
  data_entrada?: string
  data_prazo?: string
  created: string
  agente_id?: string
  supervisor_id?: string
  analista_cliente_id?: string
  nome_segurado?: string
  cpf_segurado?: string
  nome_condutor?: string
  cpf_condutor?: string
  descricao?: string
  lido?: boolean
  is_favorite?: boolean
  observacoes?: string
  observacoes_json?: any
  posicoes_json?: any
  dados_terceiros?: any
  tags?: string[]
  expand?: any
  [key: string]: any
}

export interface ProcessoDetalhes extends Processo {
  seguradora_nome?: string
  natureza_sinistro_nome?: string
  tipo_investigacao_nome?: string
  agente_nome?: string
  supervisor_nome?: string
  solicitante_nome?: string
}

export interface NovoProcesso {
  seguradora: string
  controle_cia: string
  natureza_sinistro: string
  tipo_investigacao: string
  regiao_sinistro: string
  nome_segurado: string
  placas_veiculos: string
  solicitante_id: string
  agente_id: string
  status: string
  supervisor_id: string
  [key: string]: any
}
