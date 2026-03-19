import { useState } from 'react'
import * as XLSX from 'xlsx'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'

export type ImportState = 'idle' | 'loading' | 'parsed' | 'importing' | 'error' | 'success'

export interface ParsedData {
  matchedFields: string[]
  unmatchedFields: string[]
  rowsToImport: any[]
}

const normalizeHeader = (header: string) => {
  return header
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim()
}

const mappings: Record<string, string[]> = {
  numero_controle: ['numero', 'ncontrole', 'id', 'controle', 'numerocontrole'],
  status: ['status', 'situacao', 'estado'],
  observacoes: ['observacoes', 'obs', 'notas', 'comentarios', 'notes'],
  revisor: ['revisor', 'responsavel', 'reviewer'],
  cia: ['cia', 'seguradora', 'companhia', 'insurance', 'company'],
  tipo_servico: ['tipo', 'tiposervico', 'servico', 'service', 'ramo'],
  local_sinistro: ['local', 'localizacao', 'regiao', 'location', 'region'],
  agente_prestador: ['agente', 'prestador', 'sindicante', 'agent', 'provider'],
  data_entrada: ['entrada', 'dataentrada', 'inicio', 'startdate', 'data_entrada'],
  dias_uteis: ['dias', 'diasuteis', 'diastrabalho', 'workingdays', 'dias_uteis'],
  posicao_1: ['posicao1', 'pos1', 'position1', 'posicao_1'],
  posicao_2: ['posicao2', 'pos2', 'position2', 'posicao_2'],
  posicao_3: ['posicao3', 'pos3', 'position3', 'posicao_3'],
  data_retorno: ['retorno', 'dataretorno', 'returndate', 'data_retorno'],
  data_saida: ['saida', 'datasaida', 'conclusao', 'enddate', 'data_saida'],
  resultado: ['resultado', 'resultadofinal', 'result'],
  dias_totais: ['diastotais', 'diastotal', 'totaldias', 'totaldays', 'dias_totais'],
  controle_cia: ['controlecia', 'numerocia', 'cianumber', 'controle_cia'],
  nome_segurado: ['segurado', 'nomesegurado', 'cliente', 'customer', 'insured', 'nome_segurado'],
  placas_veiculos: ['placa', 'placas', 'veiculo', 'vehicle', 'plate', 'placas_veiculos'],
  analista_solicitante: ['analista', 'solicitante', 'analyst', 'requester'],
}

export function useImportOperacionalData() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [state, setState] = useState<ImportState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [parsedData, setParsedData] = useState<ParsedData | null>(null)
  const [progress, setProgress] = useState(0)

  const parseDate = (val: string) => {
    if (!val) return ''
    const match = String(val).match(/^(\d{2})\/(\d{2})\/(\d{4})/)
    if (match) return `${match[3]}-${match[2]}-${match[1]}`
    return String(val)
  }

  const parseCSV = async (file: File) => {
    const text = await file.text()
    const lines = text.split(/\r?\n/).filter((l) => l.trim() !== '')
    if (lines.length <= 1) throw new Error('Planilha vazia. Adicione ao menos uma linha de dados.')
    const commaCount = (lines[0].match(/,/g) || []).length
    const semiCount = (lines[0].match(/;/g) || []).length
    const delimiter = semiCount > commaCount ? ';' : ','

    const headers = lines[0].split(delimiter).map((h) => h.trim())
    return lines.slice(1).map((line) => {
      const values = line.split(delimiter).map((v) => v.trim())
      const row: any = {}
      headers.forEach((h, index) => {
        row[h] = values[index] || ''
      })
      return row
    })
  }

  const parseExcel = async (file: File) => {
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' })
    if (data.length === 0) throw new Error('Planilha vazia. Adicione ao menos uma linha de dados.')
    return data
  }

  const processFile = async (file: File) => {
    setState('loading')
    setErrorMsg('')
    try {
      let rawData: any[] = []
      if (file.name.toLowerCase().endsWith('.csv')) {
        rawData = await parseCSV(file)
      } else {
        rawData = await parseExcel(file)
      }

      if (rawData.length === 0)
        throw new Error('Planilha vazia. Adicione ao menos uma linha de dados.')

      const headers = Object.keys(rawData[0])
      const matchedFields: string[] = []
      const unmatchedFields: string[] = []
      const headerMap: Record<string, string> = {}

      headers.forEach((header) => {
        const norm = normalizeHeader(header)
        let foundField = ''
        for (const [field, aliases] of Object.entries(mappings)) {
          if (aliases.includes(norm) || norm.includes(aliases[0])) {
            foundField = field
            break
          }
        }
        if (foundField) {
          matchedFields.push(header)
          headerMap[header] = foundField
        } else {
          unmatchedFields.push(header)
        }
      })

      if (matchedFields.length === 0) {
        throw new Error('Nenhuma coluna reconhecida. Baixe o modelo e tente novamente.')
      }

      const rowsToImport = rawData.map((row) => {
        const newRow: any = {}
        for (const h of matchedFields) {
          let val = row[h]
          const field = headerMap[h]
          if (field.startsWith('data_')) val = parseDate(val)
          if (field.startsWith('dias_')) val = parseInt(val, 10) || 0
          newRow[field] = val
        }
        return newRow
      })

      setParsedData({ matchedFields, unmatchedFields, rowsToImport })
      setState('parsed')
    } catch (e: any) {
      const msg =
        e.message || 'Não foi possível ler o arquivo. Verifique o formato e tente novamente.'
      setErrorMsg(msg)
      toast({ title: 'Erro', description: msg, variant: 'destructive' })
      setState('error')
    }
  }

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const confirmImport = async () => {
    if (!parsedData) return
    setState('importing')
    setProgress(0)
    try {
      const total = parsedData.rowsToImport.length
      for (let i = 0; i < total; i++) {
        const rowData = { ...parsedData.rowsToImport[i], user_id: user?.id }

        let success = false
        let retries = 0

        while (!success && retries < 5) {
          try {
            const record = await pb.collection('processos_operacionais').create(rowData)
            await pb.collection('processos_historico').create({
              processo_id: record.id,
              tipo_evento: 'criado',
              descricao: 'Processo importado via planilha.',
              user_name: user?.name || user?.email || 'Sistema',
            })
            success = true
          } catch (e: any) {
            if (e.status === 429) {
              retries++
              await sleep(1000 * retries)
            } else {
              throw e
            }
          }
        }

        if (!success) {
          throw new Error('Limite de requisições excedido. A importação foi interrompida.')
        }

        setProgress(Math.round(((i + 1) / total) * 100))

        // Rate limiting de prevenção para evitar erro 429 na infraestrutura
        if ((i + 1) % 5 === 0) {
          await sleep(500)
        } else {
          await sleep(100)
        }
      }
      setState('success')
    } catch (e: any) {
      const msg = e.message || 'Erro ao importar para o banco de dados. Tente novamente.'
      setErrorMsg(msg)
      toast({ title: 'Erro', description: msg, variant: 'destructive' })
      setState('error')
    }
  }

  const reset = () => {
    setState('idle')
    setParsedData(null)
    setErrorMsg('')
    setProgress(0)
  }

  return { state, errorMsg, parsedData, progress, processFile, confirmImport, reset }
}
