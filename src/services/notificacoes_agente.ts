import pb from '@/lib/pocketbase/client'

export interface NotificacaoAgente {
  id: string
  agente_id: string
  processo_id?: string
  tipo: string
  titulo: string
  descricao: string
  lida: boolean
  created: string
  updated: string
  expand?: {
    processo_id?: {
      id: string
      numero_controle: string
    }
  }
}

export const getMyNotificacoes = async (userId: string) => {
  return pb.collection('notificacoes_agente').getFullList<NotificacaoAgente>({
    filter: `agente_id.user_id = "${userId}"`,
    sort: '-created',
    expand: 'processo_id',
  })
}

export const markNotificacaoAsRead = async (id: string) => {
  return pb.collection('notificacoes_agente').update(id, { lida: true })
}

export const deleteNotificacao = async (id: string) => {
  return pb.collection('notificacoes_agente').delete(id)
}
