import { useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Upload, FileText, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { usuariosService } from '@/services/usuariosService'
import { Progress } from '@/components/ui/progress'
import { trackAcao } from '@/utils/trackAcao'

export function ImportUsuariosModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [summary, setSummary] = useState<{
    total: number
    success: number
    errors: number
    logs: string[]
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 5 * 1024 * 1024) return toast.error('Arquivo excede o limite de 5MB')
    if (!f.name.endsWith('.csv') && !f.name.endsWith('.xlsx'))
      return toast.error('Apenas arquivos CSV ou XLSX são permitidos')
    setFile(f)
    setSummary(null)
  }

  const downloadTemplate = () => {
    const csv =
      'nome,email,role,status_conta\nJoão Silva,joao@empresa.com,analista,ativo\nMaria Souza,maria@empresa.com,supervisor,ativo'
    const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csv], {
      type: 'text/csv;charset=utf-8;',
    })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'template_importacao_usuarios.csv'
    link.click()
  }

  const processImport = async () => {
    if (!file) return
    setLoading(true)
    setProgress(0)

    try {
      const text = await file.text()
      const lines = text.split(/\r?\n/).filter((l) => l.trim() !== '')
      if (lines.length < 2) throw new Error('Arquivo vazio ou sem registros')

      const headers = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/['"]/g, ''))
      const rows = lines.slice(1).map((line) => {
        const values = line.split(',').map((v) => v.trim().replace(/^['"]|['"]$/g, ''))
        return headers.reduce((obj, h, i) => {
          obj[h] = values[i]
          return obj
        }, {} as any)
      })

      let success = 0
      let errors = 0
      const logs: string[] = []
      const total = rows.length

      for (let i = 0; i < total; i++) {
        const row = rows[i]
        try {
          const email = row['email'] || row['e-mail'] || row['correo']
          const name = row['nome'] || row['name'] || row['nome completo']
          let role = (row['papel'] || row['role'] || 'analista').toLowerCase()
          if (!['c-level', 'admin', 'supervisor', 'analista'].includes(role)) role = 'analista'

          if (!email || !name) throw new Error('Nome ou e-mail ausentes na linha')

          const tempPwd = Math.random().toString(36).slice(-8) + 'A1@'
          await usuariosService.createUsuario({
            name,
            email,
            role,
            status_conta: 'ativo',
            password: tempPwd,
            passwordConfirm: tempPwd,
          })
          success++
        } catch (err: any) {
          errors++
          logs.push(`Linha ${i + 2}: ${err.message || 'Erro ao processar'}`)
        }
        setProgress(Math.round(((i + 1) / total) * 100))
      }

      setSummary({ total, success, errors, logs })
      if (success > 0) {
        await trackAcao('importar_dados', `Importou ${success} usuários de arquivo ${file.name}`)
        onSuccess()
      }
    } catch (e: any) {
      toast.error(e.message || 'Falha ao ler o arquivo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!loading) onClose()
      }}
    >
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-brand-cyan" /> Importar Usuários em Massa
          </DialogTitle>
          <DialogDescription>
            Faça upload de uma planilha CSV ou XLSX para cadastrar múltiplos usuários de uma vez.
          </DialogDescription>
        </DialogHeader>

        {!summary ? (
          <div className="space-y-4 py-2">
            <div
              className="border-2 border-dashed border-brand-teal/50 rounded-xl p-8 text-center hover:bg-brand-light/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="mx-auto w-12 h-12 bg-brand-cyan/20 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-brand-cyan" />
              </div>
              <h3 className="text-[16px] font-bold text-brand-navy dark:text-white mb-1">
                {file ? file.name : 'Clique ou arraste seu arquivo aqui'}
              </h3>
              <p className="text-[13px] text-brand-gray dark:text-brand-light/70">
                {file ? `${(file.size / 1024).toFixed(1)} KB` : 'Máximo 5MB (.csv, .xlsx)'}
              </p>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".csv, .xlsx"
                onChange={handleFileChange}
              />
            </div>

            {loading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium text-brand-navy dark:text-white">
                  <span>Processando registros...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-brand-teal/20" />
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={downloadTemplate}
                className="w-full border-brand-teal text-brand-navy"
              >
                Baixar Template
              </Button>
              <Button
                onClick={processImport}
                disabled={!file || loading}
                className="w-full bg-brand-cyan text-white hover:bg-brand-cyan/90 font-bold"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Iniciar Importação'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-brand-light dark:bg-brand-navy/50 rounded-lg border border-brand-teal/30">
                <span className="block text-2xl font-bold text-brand-navy dark:text-white">
                  {summary.total}
                </span>
                <span className="text-xs font-medium text-brand-gray">Total Lidos</span>
              </div>
              <div className="p-4 bg-brand-cyan/10 rounded-lg border border-brand-cyan/30">
                <span className="block text-2xl font-bold text-brand-cyan flex items-center justify-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  {summary.success}
                </span>
                <span className="text-xs font-medium text-brand-cyan">Sucesso</span>
              </div>
              <div className="p-4 bg-brand-coral/10 rounded-lg border border-brand-coral/30">
                <span className="block text-2xl font-bold text-brand-coral flex items-center justify-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {summary.errors}
                </span>
                <span className="text-xs font-medium text-brand-coral">Erros</span>
              </div>
            </div>

            {summary.logs.length > 0 && (
              <div className="bg-brand-light/50 dark:bg-black/20 p-3 rounded-md border border-brand-coral/20 max-h-[150px] overflow-y-auto text-xs text-brand-coral space-y-1">
                {summary.logs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            )}

            <Button
              onClick={onClose}
              className="w-full bg-brand-navy text-white hover:bg-brand-navy/90"
            >
              Concluir
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
