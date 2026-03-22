import pb from '@/lib/pocketbase/client'
import { trackAcao } from '@/utils/trackAcao'

export const notificacaoService = {
  enviarLembrete: async (userId: string) => {
    try {
      await pb.send('/backend/v1/enviar-notificacoes', {
        method: 'POST',
        body: { userId, tipo: 'lembrete_inativo' },
      })
    } catch (e) {
      await trackAcao(
        'notificacao_enviada',
        'Enviou lembrete de inatividade para o usuário',
        userId,
      )
    }
  },

  enviarAlertaSeguranca: async (userId: string, tipo: string) => {
    try {
      await pb.send('/backend/v1/enviar-notificacoes', {
        method: 'POST',
        body: { userId, tipo },
      })
    } catch (e) {
      await trackAcao('notificacao_enviada', `Enviou alerta de segurança: ${tipo}`, userId)
    }
  },

  enviarNotificacaoPermissoes: async (userId: string) => {
    try {
      await pb.send('/backend/v1/enviar-notificacoes', {
        method: 'POST',
        body: { userId, tipo: 'notificacao_permissoes' },
      })
    } catch (e) {
      await trackAcao(
        'notificacao_enviada',
        'Enviou notificação de redefinição de permissões',
        userId,
      )
    }
  },
}
