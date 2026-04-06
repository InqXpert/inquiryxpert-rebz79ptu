import { useState, useRef } from 'react'
import { UploadCloud, File as FileIcon, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFileUpload } from '@/hooks/use-file-upload'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const MAX_SIZES = {
  foto: 5 * 1024 * 1024, // 5MB
  audio: 50 * 1024 * 1024, // 50MB
  documento: 5 * 1024 * 1024, // 5MB
  despesas: 5 * 1024 * 1024, // 5MB
}

const ALLOWED_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.pdf',
  '.docx',
  '.doc',
  '.m4a',
  '.mp3',
  '.wav',
  '.xlsx',
]

export function FileUploadZone({ processoId, agenteId }: { processoId: string; agenteId: string }) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [tipoArquivo, setTipoArquivo] = useState<'foto' | 'audio' | 'documento' | 'despesas'>(
    'documento',
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const { uploadFile, isUploading, progress } = useFileUpload()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const validateFile = (file: File) => {
    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      toast.error('Tipo de arquivo não permitido.')
      return false
    }
    if (file.size > MAX_SIZES[tipoArquivo]) {
      toast.error(
        `Tamanho excede o limite de ${MAX_SIZES[tipoArquivo] / (1024 * 1024)}MB para ${tipoArquivo}.`,
      )
      return false
    }
    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (validateFile(file)) setSelectedFile(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (validateFile(file)) setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    if (!processoId || !agenteId) {
      toast.error('Não é possível enviar o arquivo (Processo ou Agente não identificado).')
      return
    }

    const { error } = await uploadFile({
      processo_id: processoId,
      agente_id: agenteId,
      file: selectedFile,
      tipo_arquivo: tipoArquivo,
    })

    if (!error) {
      setSelectedFile(null)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="w-full min-h-[400px] border border-border bg-card rounded-xl flex flex-col overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-border/50 bg-muted/10">
        <h3 className="text-lg font-semibold text-foreground">Upload de Arquivos</h3>
        <p className="text-sm text-muted-foreground">Envie fotos, áudios, documentos ou despesas</p>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Selecione o tipo de arquivo</label>
          <Select
            value={tipoArquivo}
            onValueChange={(v: any) => setTipoArquivo(v)}
            disabled={isUploading || !!selectedFile}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo de Arquivo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="documento">Documento (PDF/DOC/XLSX)</SelectItem>
              <SelectItem value="foto">Foto (JPG/PNG)</SelectItem>
              <SelectItem value="audio">Áudio (MP3/WAV/M4A)</SelectItem>
              <SelectItem value="despesas">Comprovante Despesas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!selectedFile ? (
          <div
            className={cn(
              'flex-1 min-h-[200px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 text-center transition-colors cursor-pointer group',
              dragActive
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-muted/30',
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleChange}
              accept={ALLOWED_EXTENSIONS.join(',')}
            />
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h4 className="text-base font-medium text-foreground">
              Arraste e solte o arquivo aqui
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              ou clique para procurar no seu computador
            </p>
            <p className="text-xs text-muted-foreground/70 mt-4 max-w-[250px] mx-auto">
              Formatos aceitos: {ALLOWED_EXTENSIONS.join(', ')}
              <br />
              Limite: 5MB (Geral) / 50MB (Áudio)
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="w-full p-4 rounded-xl border border-border bg-muted/10 space-y-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FileIcon className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p
                      className="text-sm font-medium text-foreground truncate"
                      title={selectedFile.name}
                    >
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB •{' '}
                      <span className="capitalize">{tipoArquivo}</span>
                    </p>
                  </div>
                </div>
                {!isUploading && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedFile(null)}
                    className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {isUploading && (
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex justify-between text-xs text-muted-foreground font-medium">
                    <span>Enviando...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 transition-all duration-300" />
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full font-bold bg-primary hover:bg-primary/90 text-primary-foreground h-11"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Enviando Arquivo...
                  </>
                ) : (
                  'Confirmar Upload'
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
