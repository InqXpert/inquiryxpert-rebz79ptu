export interface ArquivoProcesso {
  id: string
  processo_id: string
  agente_id: string
  arquivo: string
  nome_arquivo: string
  tipo_arquivo: 'foto' | 'audio' | 'documento' | 'despesas'
  tamanho_bytes: number
  status: 'enviado' | 'validando' | 'validado' | 'rejeitado'
  motivo_rejeicao?: string
  created: string
  updated: string
  expand?: any
}
