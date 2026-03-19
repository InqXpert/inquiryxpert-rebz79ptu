import { useState } from 'react'
import * as XLSX from 'xlsx'
import { toast } from '@/hooks/use-toast'

interface AnalysisResult {
  matched: string[]
  missing: string[]
  unmatched: string[]
  parsed: any
}

export function useImportProvider() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)

  const expectedHeaders: Record<string, string> = {
    Nome: 'nomeCompleto',
    'CPF/CNPJ': 'cpf',
    Email: 'email',
    Telefone: 'telefone',
    Endereco: 'baseAtendimento',
    CEP: 'cepBase',
    Banco: 'banco',
    Agencia: 'agencia',
    Conta: 'conta',
    'Chave PIX': 'chavePix',
    'Valor por Processo': 'valorHonorario',
  }

  const analyzeFile = async (file: File) => {
    setStatus('loading')
    try {
      let row: Record<string, any> = {}
      let fileHeaders: string[] = []

      if (file.name.toLowerCase().endsWith('.csv') || file.type === 'text/csv') {
        const text = await file.text()
        const lines = text.split('\n').filter((l) => l.trim() !== '')
        if (lines.length < 2) throw new Error('Planilha vazia.')

        const splitCsv = (str: string) => {
          const result = []
          let inQuotes = false,
            curr = ''
          for (let i = 0; i < str.length; i++) {
            if (str[i] === '"') {
              inQuotes = !inQuotes
              continue
            }
            if (str[i] === ',' && !inQuotes) {
              result.push(curr.trim())
              curr = ''
              continue
            }
            curr += str[i]
          }
          result.push(curr.trim())
          return result
        }

        fileHeaders = splitCsv(lines[0])
        const rowVals = splitCsv(lines[1])
        fileHeaders.forEach((h, i) => {
          row[h] = rowVals[i] || ''
        })
      } else {
        const buffer = await file.arrayBuffer()
        const workbook = XLSX.read(buffer)
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const data = XLSX.utils.sheet_to_json<Record<string, any>>(sheet)
        if (!data || data.length === 0) throw new Error('Planilha vazia.')
        row = data[0]
        fileHeaders = Object.keys(row)
      }

      if (!row['Nome']) {
        setStatus('error')
        toast({
          title: 'Erro na importação',
          description: "Coluna obrigatória 'Nome' não encontrada na planilha.",
          variant: 'destructive',
        })
        setAnalysis(null)
        return null
      }

      const matched: string[] = []
      const missing: string[] = []
      const unmatched: string[] = []

      Object.keys(expectedHeaders).forEach((eh) => {
        if (fileHeaders.includes(eh)) {
          matched.push(eh)
        } else {
          missing.push(eh)
        }
      })

      fileHeaders.forEach((h) => {
        if (!Object.keys(expectedHeaders).includes(h)) {
          unmatched.push(h)
        }
      })

      const parsed: any = {}
      if (row['Nome']) parsed.nomeCompleto = String(row['Nome'])
      if (row['CPF/CNPJ']) parsed.cpf = String(row['CPF/CNPJ'])
      if (row['Email']) parsed.email = String(row['Email'])
      if (row['Telefone']) parsed.telefone = String(row['Telefone'])
      if (row['Endereco']) parsed.baseAtendimento = String(row['Endereco'])
      if (row['CEP']) parsed.cepBase = String(row['CEP'])
      if (row['Banco']) parsed.banco = String(row['Banco'])
      if (row['Agencia']) parsed.agencia = String(row['Agencia'])
      if (row['Conta']) parsed.conta = String(row['Conta'])
      if (row['Chave PIX']) parsed.chavePix = String(row['Chave PIX'])
      if (row['Valor por Processo']) parsed.valorHonorario = Number(row['Valor por Processo']) || 0

      const observacoes = []
      if (row['Cidade']) observacoes.push(`Cidade: ${row['Cidade']}`)
      if (row['Estado']) observacoes.push(`Estado: ${row['Estado']}`)
      if (row['Especialidade']) observacoes.push(`Especialidade: ${row['Especialidade']}`)

      unmatched.forEach((u) => {
        if (row[u] && !['Cidade', 'Estado', 'Especialidade'].includes(u)) {
          observacoes.push(`${u}: ${row[u]}`)
        }
      })

      if (observacoes.length > 0) parsed.observacoes = observacoes.join('\n')

      setAnalysis({ matched, missing, unmatched, parsed })
      setStatus('success')
      return parsed
    } catch (err: any) {
      setStatus('error')
      toast({
        title: 'Erro na importação',
        description: 'Não foi possível ler o arquivo. Verifique o formato e tente novamente.',
        variant: 'destructive',
      })
      setAnalysis(null)
      return null
    }
  }

  return {
    status,
    analyzeFile,
    analysis,
    reset: () => {
      setStatus('idle')
      setAnalysis(null)
    },
  }
}
