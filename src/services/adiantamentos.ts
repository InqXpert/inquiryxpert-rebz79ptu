import pb from '@/lib/pocketbase/client'
import { SolicitacaoAdiantamento } from '@/types'

export const getAdiantamentos = async (status: string) => {
  return pb.collection('solicitacoes_adiantamento').getFullList<SolicitacaoAdiantamento>({
    filter: `status = '${status}'`,
    sort: '-created',
    expand: 'processo_id.agente_id,user_id',
  })
}

export const autorizarAdiantamento = async (
  id: string,
  data: { valor_autorizado: number; data_autorizacao: string; observacoes?: string },
) => {
  return pb.collection('solicitacoes_adiantamento').update(id, {
    status: 'autorizado',
    ...data,
  })
}

export const negarAdiantamento = async (id: string, data: { motivo_negacao: string }) => {
  return pb.collection('solicitacoes_adiantamento').update(id, {
    status: 'negado',
    data_negacao: new Date().toISOString(),
    ...data,
  })
}
