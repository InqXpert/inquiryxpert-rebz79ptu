import pb from '@/lib/pocketbase/client'
import { ProcessoOperacional, ProcessoHistorico, ProcessoDocumento } from '@/types'
import * as XLSX from 'xlsx'

export const fetchProcessos = async (filters: any): Promise<ProcessoOperacional[]> => {
  const filterArr: string[] = []

  if (filters.status && filters.status !== 'Todos') {
    filterArr.push(`status = '${filters.status}'`)
  }

  if (filters.cia && filters.cia !== 'Todas') {
    filterArr.push(`cia = '${filters.cia}'`)
  }

  if (filters.agente_prestador && filters.agente_prestador !== 'Todos') {
    filterArr.push(`agente_prestador = '${filters.agente_prestador}'`)
  }

  if (filters.data_entrada_from) {
    filterArr.push(`data_entrada >= '${filters.data_entrada_from}'`)
  }

  if (filters.data_entrada_to) {
    filterArr.push(`data_entrada <= '${filters.data_entrada_to}'`)
  }

  if (filters.search) {
    const s = filters.search.replace(/'/g, "\\'")
    filterArr.push(
      `(numero_controle ~ '${s}' || nome_segurado ~ '${s}' || placas_veiculos ~ '${s}')`,
    )
  }

  const filterStr = filterArr.join(' && ')
  const options: Record<string, any> = { sort: '-created' }
  if (filterStr) {
    options.filter = filterStr
  }

  return await pb.collection('processos_operacionais').getFullList<ProcessoOperacional>(options)
}

export const fetchProcessoById = async (id: string): Promise<ProcessoOperacional | null> => {
  return await pb.collection('processos_operacionais').getOne<ProcessoOperacional>(id)
}

export const updateProcesso = async (
  id: string,
  data: Partial<ProcessoOperacional>,
): Promise<ProcessoOperacional> => {
  return await pb.collection('processos_operacionais').update<ProcessoOperacional>(id, data)
}

export const deleteProcesso = async (id: string): Promise<boolean> => {
  await pb.collection('processos_operacionais').delete(id)
  return true
}

export const addObservacao = async (
  processoId: string,
  observacao: string,
  userName: string,
): Promise<ProcessoOperacional> => {
  const proc = await pb.collection('processos_operacionais').getOne<ProcessoOperacional>(processoId)

  const newObs = `${proc.observacoes ? proc.observacoes + '\n\n' : ''}[${new Date().toLocaleString()}] ${userName}:\n${observacao}`
  return await pb
    .collection('processos_operacionais')
    .update<ProcessoOperacional>(processoId, { observacoes: newObs })
}

export const addPosicao = async (
  processoId: string,
  posicaoNumber: number,
  text: string,
): Promise<ProcessoOperacional> => {
  const field = `posicao_${posicaoNumber}`
  return await pb
    .collection('processos_operacionais')
    .update<ProcessoOperacional>(processoId, { [field]: text })
}

export const fetchHistorico = async (processoId: string): Promise<ProcessoHistorico[]> => {
  return await pb
    .collection('processos_historico')
    .getFullList<ProcessoHistorico>({ filter: `processo_id = '${processoId}'`, sort: '-created' })
}

export const fetchDocumentos = async (processoId: string): Promise<ProcessoDocumento[]> => {
  return await pb
    .collection('processos_documentos')
    .getFullList<ProcessoDocumento>({ filter: `processo_id = '${processoId}'`, sort: '-created' })
}

export const uploadDocumento = async (
  processoId: string,
  file: File,
): Promise<ProcessoDocumento> => {
  const formData = new FormData()
  formData.append('processo_id', processoId)
  formData.append('arquivo', file)
  formData.append('name', file.name)
  formData.append('size', file.size.toString())

  return await pb.collection('processos_documentos').create<ProcessoDocumento>(formData)
}

export const deleteDocumento = async (documentoId: string): Promise<boolean> => {
  await pb.collection('processos_documentos').delete(documentoId)
  return true
}

export const exportToExcel = async (processos: ProcessoOperacional[]): Promise<boolean> => {
  try {
    const headers = [
      'numero_controle',
      'status',
      'nome_segurado',
      'cia',
      'tipo_servico',
      'agente_prestador',
      'data_entrada',
      'dias_uteis',
      'data_retorno',
      'data_saida',
      'resultado',
    ]

    const dataRows = processos.map((p) => headers.map((k) => (p as any)[k] || ''))
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...dataRows])
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Processos')

    const dateStr = new Date().toISOString().split('T')[0]
    XLSX.writeFile(workbook, `processos-operacionais-${dateStr}.xlsx`)
    return true
  } catch (err) {
    throw new Error('Erro ao exportar')
  }
}

export const downloadTemplate = () => {
  const headers = [
    'Numero',
    'Status',
    'Cia',
    'Tipo Servico',
    'Local Sinistro',
    'Agente Prestador',
    'Data Entrada',
    'Dias Uteis',
    'Resultado',
  ]
  const example = [
    '03.26.04.03.05690',
    'EM ELABORACAO',
    'BRADESCO',
    'AUTO',
    'SP / SAO PAULO',
    'SP / YASSUO',
    '02/03/2026',
    14,
    'REGULAR',
  ]
  const worksheet = XLSX.utils.aoa_to_sheet([headers, example])
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Modelo')
  XLSX.writeFile(workbook, 'modelo-importacao-operacional.xlsx')
}
