import { useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Upload, FileAudio, AlertCircle } from 'lucide-react'
import { uploadAudioProcesso } from '@/services/gestaoAgentes'
import { useToast } from '@/hooks/use-toast'
import { trackAcao } from '@/utils/trackAcao'

interface Props {
  isOpen: boolean
  onClose: () => void
  processoId: string
  agenteId: string
  onSuccess: () => void
}

export function AudioUploadModal({ isOpen, onClose, processoId, agenteId, onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('')
    const selected = e.target.files?.[0]
    if (!selected) return

    if (selected.size > 100 * 1024 * 1024) {
      setErrorMsg('Arquivo excede o limite de 100MB.')
      return
    }

    setFile(selected)
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setErrorMsg('')

    try {
      const audioUrl = URL.createObjectURL(file)
      const audio = new Audio(audioUrl)

      audio.onloadedmetadata = async () => {
        const duration = audio.duration
        // 5 min = 300s, 2h = 7200s
        if (duration < 300) {
          setErrorMsg('O áudio é muito curto. Duração mínima de 5 minutos é obrigatória.')
          setLoading(false)
          return
        }
        if (duration > 7200) {
          setErrorMsg('O áudio excede a duração máxima permitida (2 horas).')
          setLoading(false)
          return
        }

        try {
          await uploadAudioProcesso(processoId, agenteId, file, duration)
          await trackAcao(
            'upload_audio',
            'Upload de áudio de entrevista concluído',
            undefined,
            `Processo: ${processoId}`,
          )
          toast({ title: 'Sucesso', description: 'Áudio enviado e em validação!' })
          onSuccess()
          onClose()
        } catch (err) {
          setErrorMsg('Falha ao enviar o arquivo. Tente novamente.')
        } finally {
          setLoading(false)
        }
      }

      audio.onerror = () => {
        setErrorMsg('Arquivo de áudio inválido ou corrompido.')
        setLoading(false)
      }
    } catch (err) {
      setErrorMsg('Erro inesperado ao processar o áudio.')
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#282c59]">
            Envio Obrigatório de Áudio
          </DialogTitle>
          <DialogDescription>
            Para dar andamento ao processo, é necessário anexar a gravação da entrevista com o
            segurado.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 flex flex-col items-center">
          {!file ? (
            <div
              className="w-full border-2 border-dashed border-[#2bc8cf] rounded-xl p-8 text-center bg-[#b1dad5]/10 hover:bg-[#b1dad5]/30 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-10 h-10 text-[#2bc8cf] mx-auto mb-3" />
              <h4 className="font-semibold text-[#282c59] mb-1">Selecione o arquivo de áudio</h4>
              <p className="text-[13px] text-muted-foreground">MP3, WAV ou M4A. Max 100MB.</p>
              <p className="text-[13px] font-medium text-amber-600 mt-2">
                Duração: 5 min a 2 horas.
              </p>
            </div>
          ) : (
            <div className="w-full border border-border rounded-xl p-4 flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-3 overflow-hidden">
                <FileAudio className="w-8 h-8 text-[#282c59] shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate max-w-[200px]">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFile(null)}
                className="text-destructive"
              >
                Remover
              </Button>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="audio/*"
            onChange={handleFileChange}
          />

          {errorMsg && (
            <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg flex items-start gap-2 w-full">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose} disabled={loading} className="rounded-xl">
            Cancelar
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!file || loading}
            className="rounded-xl bg-[#282c59] hover:bg-[#282c59]/90 text-white"
          >
            {loading ? 'Enviando...' : 'Confirmar Envio'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
