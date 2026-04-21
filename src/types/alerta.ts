export type TipoAlerta =
  | 'VENCIDO'
  | 'PROXIMO_VENCIMENTO'
  | 'SEM_ATUALIZACAO'
  | 'AGUARDANDO_RELATORIO'
  | 'DUPLICADO'
  | 'ALTA_PRIORIDADE'

export interface Alerta {
  id: string
  processoId: string
  numeroProcesso: string
  tipo: TipoAlerta
  mensagem: string
  severidade: number
  data: string
  corTexto: string
  corFundo: string
  corBorda: string
  supervisorId: string
  seguradoraId: string
  relacionadoId?: string
  expand?: any
}
