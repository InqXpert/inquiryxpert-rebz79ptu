import { useEffect } from 'react'
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
      <DialogContent className="sm:max-w-[480px] rounded-none border-t-4 border-t-primary">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {user ? 'Edição de Perfil' : 'Registro de Usuário'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">
              Nome Completo
            </Label>
            <Input {...register('name')} className="rounded-none bg-muted/50" />
            {errors.name && (
              <span className="text-[11px] font-medium text-destructive">
                {errors.name.message as string}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">
              Endereço de E-mail
            </Label>
            <Input {...register('email')} type="email" className="rounded-none bg-muted/50" />
            {errors.email && (
              <span className="text-[11px] font-medium text-destructive">
                {errors.email.message as string}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">
              Senha{' '}
              {user && <span className="lowercase normal-case">(Opcional para não alterar)</span>}
            </Label>
            <Input
              {...register('password')}
              type="password"
              className="rounded-none bg-muted/50"
              placeholder={user ? '••••••••' : 'Digite uma senha segura'}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Papel (RBAC)
              </Label>
              <Select
                onValueChange={(v) => setValue('role', v)}
                defaultValue={user?.role || 'analista'}
              >
                <SelectTrigger className="rounded-none bg-muted/50">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem className="rounded-none" value="c-level">
                    C-Level
                  </SelectItem>
                  <SelectItem className="rounded-none" value="admin">
                    Administrador
                  </SelectItem>
                  <SelectItem className="rounded-none" value="supervisor">
                    Supervisor
                  </SelectItem>
                  <SelectItem className="rounded-none" value="analista">
                    Analista Padrão
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Status da Conta
              </Label>
              <Select
                onValueChange={(v) => setValue('status_conta', v)}
                defaultValue={user?.status_conta || 'ativo'}
              >
                <SelectTrigger className="rounded-none bg-muted/50">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem className="rounded-none" value="ativo">
                    Ativa
                  </SelectItem>
                  <SelectItem className="rounded-none" value="suspenso">
                    Suspensa
                  </SelectItem>
                  <SelectItem className="rounded-none" value="bloqueado">
                    Bloqueada
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="pt-4 border-t">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="rounded-none"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="rounded-none shadow-sm">
              {user ? 'Salvar Alterações' : 'Confirmar Cadastro'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
