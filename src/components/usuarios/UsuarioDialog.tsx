import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import pb from '@/lib/pocketbase/client'
import { toast } from 'sonner'
import type { User } from '@/types'
import { Eye, EyeOff, Upload } from 'lucide-react'

const schema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido para o usuário'),
  password: z.string().optional(),
  role: z.string(),
  status_conta: z.string(),
})

export default function UsuarioDialog({
  open,
  onOpenChange,
  user,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  user: User | null
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '', role: 'analista', status_conta: 'ativo' },
  })

  useEffect(() => {
    if (open) {
      setShowPassword(false)
      setPhotoFile(null)
      setPhotoPreview(
        user?.foto_url
          ? pb.files.getUrl(user, user.foto_url)
          : user?.foto_perfil
            ? pb.files.getUrl(user, user.foto_perfil)
            : user?.avatar
              ? pb.files.getUrl(user, user.avatar)
              : null,
      )
      if (user) {
        reset({
          name: user.name,
          email: user.email,
          role: user.role,
          status_conta: user.status_conta,
          password: '',
        })
      } else {
        reset({ name: '', email: '', password: '', role: 'analista', status_conta: 'ativo' })
      }
    }
  }, [user, reset, open])

  const onSubmit = async (data: any) => {
    try {
      if (user) {
        const payload = { ...data }
        if (!payload.password || String(payload.password).trim() === '') {
          delete payload.password
          delete payload.passwordConfirm
          delete payload.oldPassword
        } else {
          payload.passwordConfirm = payload.password
        }
        if (photoFile) payload.foto_url = photoFile
        await pb.collection('users').update(user.id, payload)
        toast.success('Perfil do usuário atualizado com sucesso!')
      } else {
        if (!data.password)
          return toast.error('A senha é obrigatória para registrar um novo usuário.')
        const payload = { ...data, passwordConfirm: data.password }
        if (photoFile) payload.foto_url = photoFile
        await pb.collection('users').create(payload)
        toast.success('Novo usuário criado com sucesso!')
      }
      onOpenChange(false)
    } catch (e: any) {
      toast.error(e.message || 'Houve um erro ao tentar salvar as informações do usuário.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{user ? 'Edição de Perfil' : 'Registro de Usuário'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
          <div className="flex items-center gap-4 mb-2">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-teal/50 bg-brand-light flex items-center justify-center">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-brand-gray text-xs text-center leading-tight">
                  Sem
                  <br />
                  Foto
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-brand-navy dark:text-brand-light text-sm">
                Foto de Perfil
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => document.getElementById('dialog-foto-upload')?.click()}
                >
                  <Upload className="w-3 h-3 mr-2" />
                  Escolher
                </Button>
                {photoPreview && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs h-8 text-brand-coral hover:text-brand-coral/80 hover:bg-brand-coral/10"
                    onClick={() => {
                      setPhotoFile(null)
                      setPhotoPreview(null)
                      const input = document.getElementById(
                        'dialog-foto-upload',
                      ) as HTMLInputElement
                      if (input) input.value = ''
                    }}
                  >
                    Remover
                  </Button>
                )}
              </div>
              <input
                id="dialog-foto-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setPhotoFile(file)
                    setPhotoPreview(URL.createObjectURL(file))
                  }
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-brand-navy dark:text-brand-light">
              Nome Completo <span className="text-brand-coral">*</span>
            </Label>
            <Input {...register('name')} />
            {errors.name && (
              <span className="text-[12px] font-medium text-brand-coral">
                {errors.name.message as string}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-brand-navy dark:text-brand-light">
              Endereço de E-mail <span className="text-brand-coral">*</span>
            </Label>
            <Input {...register('email')} type="email" />
            {errors.email && (
              <span className="text-[12px] font-medium text-brand-coral">
                {errors.email.message as string}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-brand-navy dark:text-brand-light">
              Senha{' '}
              {user && (
                <span className="lowercase normal-case font-medium text-brand-gray dark:text-brand-light/70">
                  (Opcional)
                </span>
              )}
            </Label>
            <div className="relative">
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                className="pr-12"
                placeholder={user ? '••••••••' : 'Digite uma senha segura'}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-cyan hover:text-brand-cyan/80 transition-colors focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <span className="text-[12px] font-medium text-brand-coral">
                {errors.password.message as string}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-brand-navy dark:text-brand-light">
                Papel (RBAC) <span className="text-brand-coral">*</span>
              </Label>
              <Select
                onValueChange={(v) => setValue('role', v)}
                defaultValue={user?.role || 'analista'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="c-level">C-Level</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="analista">Analista Padrão</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-brand-navy dark:text-brand-light">
                Status da Conta <span className="text-brand-coral">*</span>
              </Label>
              <Select
                onValueChange={(v) => setValue('status_conta', v)}
                defaultValue={user?.status_conta || 'ativo'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativa</SelectItem>
                  <SelectItem value="suspenso">Suspensa</SelectItem>
                  <SelectItem value="bloqueado">Bloqueada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="pt-6 mt-4 border-t border-brand-teal/50 dark:border-brand-cyan/30">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-brand-cyan text-white hover:bg-brand-cyan/90"
            >
              {user ? 'Salvar Alterações' : 'Confirmar Cadastro'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
