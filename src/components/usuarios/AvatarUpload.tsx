import { useState } from 'react'
import { Upload, Loader2, User as UserIcon } from 'lucide-react'
import { toast } from 'sonner'
import { getAvatarUrl } from '@/utils/fileUtils'
import { cn } from '@/lib/utils'

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

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) return toast.error('Arquivo excede 2MB')
    if (!['image/jpeg', 'image/png'].includes(file.type))
      return toast.error('Formato inválido. Use JPG ou PNG')

    setLoading(true)
    try {
      await onUpload(file)
      toast.success('Foto atualizada com sucesso')
    } catch {
      toast.error('Erro ao atualizar foto')
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
      {user.foto_perfil ? (
        <img src={getAvatarUrl(user)} alt="avatar" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-brand-teal">
          <UserIcon size={20} />
        </div>
      )}
      <label className="absolute inset-0 bg-brand-navy/70 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity backdrop-blur-[1px]">
        {loading ? (
          <Loader2 className="w-4 h-4 text-white animate-spin" />
        ) : (
          <Upload className="w-4 h-4 text-white" />
        )}
        <input
          type="file"
          className="hidden"
          accept="image/jpeg, image/png"
          disabled={loading}
          onChange={handleChange}
        />
      </label>
    </div>
  )
}
