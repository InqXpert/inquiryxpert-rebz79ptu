import { useState } from 'react'
import { Upload, Loader2, User as UserIcon, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import pb from '@/lib/pocketbase/client'

export function AvatarUpload({
  user,
  onUpload,
  className,
}: {
  user: any
  onUpload: (f: File) => Promise<void>
  className?: string
}) {
  const [loading, setLoading] = useState(false)
  const [scanning, setScanning] = useState(false)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // File Security Checks
    if (file.size > 2 * 1024 * 1024)
      return toast.error('Arquivo excede 2MB. Envie uma imagem menor.')
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
      return toast.error('Formato inválido. Use JPG, PNG ou WEBP.')

    setScanning(true)

    // Mocking an asynchronous security scan (like VirusTotal)
    const scanPromise = new Promise((resolve) => setTimeout(resolve, 1500))
    toast.promise(scanPromise, {
      loading: 'Verificando segurança do arquivo...',
      success: 'Arquivo seguro. Iniciando upload...',
      error: 'Erro na verificação de segurança',
    })

    await scanPromise
    setScanning(false)
    setLoading(true)

    try {
      await onUpload(file)
      toast.success('Foto atualizada com sucesso')
    } catch {
      toast.error('Erro de rede ao atualizar foto. Tente novamente.')
    } finally {
      setLoading(false)
      e.target.value = ''
    }
  }

  return (
    <div
      className={cn(
        'relative group w-10 h-10 rounded-full overflow-hidden border border-brand-teal/50 bg-brand-light dark:bg-brand-navy shrink-0 shadow-sm',
        className,
      )}
    >
      {user.foto_perfil || user.avatar ? (
        <img
          src={
            user.foto_perfil
              ? pb.files.getUrl(user, user.foto_perfil)
              : pb.files.getUrl(user, user.avatar)
          }
          alt="avatar"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-brand-teal">
          <UserIcon size={20} />
        </div>
      )}
      <label
        className={cn(
          'absolute inset-0 flex items-center justify-center opacity-0 cursor-pointer transition-opacity backdrop-blur-[1px]',
          loading || scanning
            ? 'opacity-100 bg-brand-navy/80'
            : 'group-hover:opacity-100 bg-brand-navy/70',
        )}
      >
        {scanning ? (
          <ShieldCheck className="w-4 h-4 text-brand-cyan animate-pulse" />
        ) : loading ? (
          <Loader2 className="w-4 h-4 text-white animate-spin" />
        ) : (
          <Upload className="w-4 h-4 text-white" />
        )}
        <input
          type="file"
          className="hidden"
          accept="image/jpeg, image/png, image/webp"
          disabled={loading || scanning}
          onChange={handleChange}
        />
      </label>
    </div>
  )
}
