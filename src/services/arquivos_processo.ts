import pb from '@/lib/pocketbase/client'
import { ArquivoProcesso } from '@/types/arquivo'

export const getArquivosProcesso = async (processoId: string) => {
  return pb.collection('arquivos_processo').getFullList<ArquivoProcesso>({
    filter: `processo_id = "${processoId}"`,
    sort: '-created',
  })
}

export const deleteArquivoProcesso = async (id: string) => {
  return pb.collection('arquivos_processo').delete(id)
}
