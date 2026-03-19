import { useState } from 'react'
import * as XLSX from 'xlsx'
import { toast } from '@/hooks/use-toast'

export function useImportProvider() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const parseCsv = (text: string) => {
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

    const headers = splitCsv(lines[0])
    const rowVals = splitCsv(lines[1])
    const row: Record<string, string> = {}
    headers.forEach((h, i) => {
      row[h] = rowVals[i] || ''
    })
    return row
  }

  const parseFile = async (file: File) => {
    setStatus('loading')
    try {
      let row: Record<string, any>

      if (file.name.toLowerCase().endsWith('.csv') || file.type === 'text/csv') {
        const text = await file.text()
        row = parseCsv(text)
      } else {
        const buffer = await file.arrayBuffer()
        const workbook = XLSX.read(buffer)
        const data = XLSX.utils.sheet_to_json<Record<string, any>>(
          workbook.Sheets[workbook.SheetNames[0]],
        )
        if (!data || data.length === 0) throw new Error('Planilha vazia.')
        row = data[0]
      }

      if (!row['Nome']) {
        setStatus('error')
        toast({
          title: 'Erro na importação',
          description: "Coluna obrigatoria 'Nome' nao encontrada na planilha.",
          variant: 'destructive',
        })
        return null
      }

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
      if (observacoes.length > 0) parsed.observacoes = observacoes.join('\n')

      setStatus('success')
      return parsed
    } catch (err: any) {
      setStatus('error')
      toast({
        title: 'Erro na importação',
        description: 'Nao foi possivel ler o arquivo. Verifique o formato e tente novamente.',
        variant: 'destructive',
      })
      return null
    }
  }

  return { status, parseFile, reset: () => setStatus('idle') }
}
