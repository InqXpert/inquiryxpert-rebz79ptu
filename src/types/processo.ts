export interface Processo {
  id: string
  numero_processo?: string
  numero_controle?: string
  status: string
  prioridade?: 'baixa' | 'media' | 'alta' | ''
  data_entrada?: string
  data_prazo?: string
  created: string
  agente_id: string
  nome_segurado?: string
  descricao?: string
  lido?: boolean
  is_favorite?: boolean // Derived property
  [key: string]: any
}
