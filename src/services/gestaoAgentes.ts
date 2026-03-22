import pb from '@/lib/pocketbase/client'
import { ProcessoOperacional, DocumentoProcesso, RelatorioProcesso, Agente } from '@/types'

export const getAgenteIdByUserId = async (userId: string): Promise<string | null> => {
  try {
    const record = await pb.collection('agentes').getFirstListItem(`user_id="${userId}"`)
    return record.id
  } catch {
    return null
  }
}

export const getDashboardStats = async (agenteId: string) => {
  const [ativos, concluidos, pendentes] = await Promise.all([
    pb
      .collection('processos_operacionais')
      .getList(1, 1, {
        filter: `agente_id="${agenteId}" && status != 'concluido' && status != 'cancelado'`,
      }),
    pb
      .collection('processos_operacionais')
      .getList(1, 1, { filter: `agente_id="${agenteId}" && status = 'concluido'` }),
    pb
      .collection('processos_operacionais')
      .getList(1, 1, { filter: `agente_id="${agenteId}" && status = 'bloqueado_sem_audio'` }),
  ])
  return {
    ativos: ativos.totalItems,
    concluidos: concluidos.totalItems,
    pendentes: pendentes.totalItems,
    prazos: 0,
  }
}

export const getProcessosAgente = async (agenteId: string, search: string = '') => {
  let filter = `agente_id="${agenteId}"`
  if (search) {
    filter += ` && (numero_processo ~ "${search}" || nome_segurado ~ "${search}")`
  }
  return await pb.collection('processos_operacionais').getFullList<ProcessoOperacional>({
    filter,
    sort: '-created',
    expand: 'agente_id',
  })
}

export const getFaturamento = async () => {
  return await pb.collection('relatorios_processo').getFullList<RelatorioProcesso>({
    filter: `pode_faturar=true`,
    sort: '-created',
    expand: 'processo_id,agente_id',
  })
}

export const uploadAudioProcesso = async (
  processoId: string,
  agenteId: string,
  file: File,
  durationSecs: number,
) => {
  const formData = new FormData()
  formData.append('processo_id', processoId)
  formData.append('agente_id', agenteId)
  formData.append('arquivo', file)
  formData.append('tipo', 'audio_entrevista')
  formData.append('duracao_segundos', durationSecs.toString())

  const doc = await pb.collection('documentos_processo').create<DocumentoProcesso>(formData)

  await pb.collection('processos_operacionais').update(processoId, {
    audio_obrigatorio_presente: true,
    status: 'pendente',
  })

  return doc
}

export const validarAudio = async (processoId: string) => {
  return await pb.collection('processos_operacionais').update(processoId, {
    audio_validado: true,
    data_validacao_audio: new Date().toISOString(),
    status: 'concluido',
  })
}

export const getRelatorioProcesso = async (processoId: string) => {
  try {
    return await pb
      .collection('relatorios_processo')
      .getFirstListItem<RelatorioProcesso>(`processo_id="${processoId}"`)
  } catch {
    return null
  }
}

export const saveRelatorio = async (
  processoId: string,
  agenteId: string,
  conteudo: string,
  status: 'rascunho' | 'enviado',
) => {
  const existing = await getRelatorioProcesso(processoId)
  const data = {
    processo_id: processoId,
    agente_id: agenteId,
    conteudo,
    status,
    ...(status === 'enviado' ? { data_envio: new Date().toISOString() } : {}),
  }

  if (existing) {
    return await pb.collection('relatorios_processo').update<RelatorioProcesso>(existing.id, data)
  } else {
    return await pb.collection('relatorios_processo').create<RelatorioProcesso>(data)
  }
}

export const getDocumentosAgente = async (processoId: string) => {
  return await pb.collection('documentos_processo').getFullList<DocumentoProcesso>({
    filter: `processo_id="${processoId}"`,
    sort: '-created',
  })
}
