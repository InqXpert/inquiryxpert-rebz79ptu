import pb from '@/lib/pocketbase/client'
import { ProcessoOperacional, ProcessoHistorico, ProcessoDocumento } from '@/types'
import { mockProcessos, mockHistorico, mockDocumentos } from './mockOperacional'
import * as XLSX from 'xlsx'

export const fetchProcessos = async (filters: any): Promise<ProcessoOperacional[]> => {
  try {
    const filterArr: string[] = []
    if (filters.status && filters.status !== 'Todos') filterArr.push(`status = '${filters.status}'`)
    if (filters.cia && filters.cia !== 'Todas') filterArr.push(`cia = '${filters.cia}'`)
    if (filters.agente_prestador && filters.agente_prestador !== 'Todos')
      filterArr.push(`agente_prestador = '${filters.agente_prestador}'`)

    if (filters.data_entrada_from) filterArr.push(`data_entrada >= '${filters.data_entrada_from}'`)
    if (filters.data_entrada_to) filterArr.push(`data_entrada <= '${filters.data_entrada_to}'`)

    if (filters.search) {
      filterArr.push(
        `(numero_controle ~ '${filters.search}' || nome_segurado ~ '${filters.search}' || placas_veiculos ~ '${filters.search}')`,
      )
    }

    const filterStr = filterArr.join(' && ')
    const result = await pb
      .collection('processos_operacionais')
      .getFullList<ProcessoOperacional>({ filter: filterStr, sort: '-created' })
    return result
  } catch (err) {
    console.warn('Fallback to mock processos', err)
    let filtered = [...mockProcessos]
    if (filters.status && filters.status !== 'Todos')
      filtered = filtered.filter((p) => p.status === filters.status)
    if (filters.cia && filters.cia !== 'Todas')
      filtered = filtered.filter((p) => p.cia === filters.cia)
    if (filters.search) {
      const q = filters.search.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.numero_controle.toLowerCase().includes(q) || p.nome_segurado.toLowerCase().includes(q),
      )
    }
    return filtered
  }
}

export const fetchProcessoById = async (id: string): Promise<ProcessoOperacional | null> => {
  try {
    return await pb.collection('processos_operacionais').getOne<ProcessoOperacional>(id)
  } catch (err) {
    console.warn('Fallback to mock processo detail')
    return mockProcessos.find((p) => p.id === id) || null
  }
}

export const updateProcesso = async (
  id: string,
  data: Partial<ProcessoOperacional>,
): Promise<ProcessoOperacional> => {
  try {
    return await pb.collection('processos_operacionais').update<ProcessoOperacional>(id, data)
  } catch (err) {
    console.warn('Fallback to mock update processo')
    const proc = mockProcessos.find((p) => p.id === id)
    if (!proc) throw new Error('Processo not found')
    Object.assign(proc, data)
    return proc
  }
}

export const deleteProcesso = async (id: string): Promise<boolean> => {
  try {
    await pb.collection('processos_operacionais').delete(id)
    return true
  } catch (err) {
    console.warn('Fallback to mock delete processo')
    return true
  }
}

export const addObservacao = async (
  processoId: string,
  observacao: string,
  userName: string,
): Promise<ProcessoOperacional> => {
  try {
    const proc = await pb
      .collection('processos_operacionais')
      .getOne<ProcessoOperacional>(processoId)
    const newObs = `${proc.observacoes ? proc.observacoes + '\n\n' : ''}[${new Date().toLocaleString()}] ${userName}:\n${observacao}`
    return await pb
      .collection('processos_operacionais')
      .update<ProcessoOperacional>(processoId, { observacoes: newObs })
  } catch (err) {
    console.warn('Fallback to mock add observacao')
    const proc = mockProcessos.find((p) => p.id === processoId)
    if (proc) {
      proc.observacoes = `${proc.observacoes ? proc.observacoes + '\n\n' : ''}[${new Date().toLocaleString()}] ${userName}:\n${observacao}`
    }
    return proc as ProcessoOperacional
  }
}

export const addPosicao = async (
  processoId: string,
  posicaoNumber: number,
  text: string,
): Promise<ProcessoOperacional> => {
  try {
    const field = `posicao_${posicaoNumber}`
    return await pb
      .collection('processos_operacionais')
      .update<ProcessoOperacional>(processoId, { [field]: text })
  } catch (err) {
    const proc = mockProcessos.find((p) => p.id === processoId)
    if (proc) (proc as any)[`posicao_${posicaoNumber}`] = text
    return proc as ProcessoOperacional
  }
}

export const fetchHistorico = async (processoId: string): Promise<ProcessoHistorico[]> => {
  try {
    return await pb
      .collection('processos_historico')
      .getFullList<ProcessoHistorico>({ filter: `processo_id = '${processoId}'`, sort: '-created' })
  } catch (err) {
    return mockHistorico.filter((h) => h.processo_id === processoId)
  }
}

export const fetchDocumentos = async (processoId: string): Promise<ProcessoDocumento[]> => {
  try {
    return await pb
      .collection('processos_documentos')
      .getFullList<ProcessoDocumento>({ filter: `processo_id = '${processoId}'`, sort: '-created' })
  } catch (err) {
    return mockDocumentos.filter((d) => d.processo_id === processoId)
  }
}

export const uploadDocumento = async (
  processoId: string,
  file: File,
): Promise<ProcessoDocumento> => {
  try {
    const formData = new FormData()
    formData.append('processo_id', processoId)
    formData.append('arquivo', file)
    formData.append('name', file.name)
    formData.append('size', file.size.toString())
    return await pb.collection('processos_documentos').create<ProcessoDocumento>(formData)
  } catch (err) {
    const newDoc = {
      id: Math.random().toString(),
      processo_id: processoId,
      arquivo: file.name,
      name: file.name,
      size: file.size,
      created: new Date().toISOString(),
      url: '#',
    }
    mockDocumentos.push(newDoc)
    return newDoc
  }
}

export const deleteDocumento = async (documentoId: string): Promise<boolean> => {
  try {
    await pb.collection('processos_documentos').delete(documentoId)
    return true
  } catch (err) {
    return true
  }
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
