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
      <DialogContent className="sm:max-w-[480px] rounded-lg border-t-4 border-t-[#00A8B5]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#2A3B4C]">
            {user ? 'Edição de Perfil' : 'Registro de Usuário'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground font-bold">
              Nome Completo
            </Label>
            <Input
              {...register('name')}
              className="rounded-md bg-muted/30 focus-visible:ring-[#00A8B5]"
            />
            {errors.name && (
              <span className="text-[11px] font-medium text-destructive">
                {errors.name.message as string}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground font-bold">
              Endereço de E-mail
            </Label>
            <Input
              {...register('email')}
              type="email"
              className="rounded-md bg-muted/30 focus-visible:ring-[#00A8B5]"
            />
            {errors.email && (
              <span className="text-[11px] font-medium text-destructive">
                {errors.email.message as string}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground font-bold">
              Senha{' '}
              {user && (
                <span className="lowercase normal-case font-medium text-muted-foreground/70">
                  (Opcional para não alterar)
                </span>
              )}
            </Label>
            <div className="relative">
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                className="rounded-md bg-muted/30 pr-10 focus-visible:ring-[#00A8B5]"
                placeholder={user ? '••••••••' : 'Digite uma senha segura'}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#00A8B5] transition-colors focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <span className="text-[11px] font-medium text-destructive">
                {errors.password.message as string}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground font-bold">
                Papel (RBAC)
              </Label>
              <Select
                onValueChange={(v) => setValue('role', v)}
                defaultValue={user?.role || 'analista'}
              >
                <SelectTrigger className="rounded-md bg-muted/30 focus:ring-[#00A8B5]">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent className="rounded-md">
                  <SelectItem value="c-level">C-Level</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="analista">Analista Padrão</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground font-bold">
                Status da Conta
              </Label>
              <Select
                onValueChange={(v) => setValue('status_conta', v)}
                defaultValue={user?.status_conta || 'ativo'}
              >
                <SelectTrigger className="rounded-md bg-muted/30 focus:ring-[#00A8B5]">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent className="rounded-md">
                  <SelectItem value="ativo">Ativa</SelectItem>
                  <SelectItem value="suspenso">Suspensa</SelectItem>
                  <SelectItem value="bloqueado">Bloqueada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="pt-4 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-md"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md shadow-sm bg-[#FF7A59] hover:bg-[#FF7A59]/90 text-white"
            >
              {user ? 'Salvar Alterações' : 'Confirmar Cadastro'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
