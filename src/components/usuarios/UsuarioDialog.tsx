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
import { Eye, EyeOff } from 'lucide-react'

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
        if (!payload.password) delete payload.password
        else payload.passwordConfirm = payload.password
        await pb.collection('users').update(user.id, payload)
        toast.success('Perfil do usuário atualizado com sucesso!')
      } else {
        if (!data.password)
          return toast.error('A senha é obrigatória para registrar um novo usuário.')
        await pb.collection('users').create({ ...data, passwordConfirm: data.password })
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
