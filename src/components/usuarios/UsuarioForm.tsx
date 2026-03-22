import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { usuariosService } from '@/services/usuariosService'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { PermissoesChecklist } from './PermissoesChecklist'
import { Loader2 } from 'lucide-react'

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const schema = z
  .object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z.string().optional(),
    passwordConfirm: z.string().optional(),
    role: z.string(),
    status_conta: z.string(),
  })
  .refine(
    (data) => {
      if (data.password && !passwordRegex.test(data.password)) return false
      return true
    },
    {
      message: 'Mín. 8 chars, 1 maiúscula, 1 número, 1 especial.',
      path: ['password'],
    },
  )
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não conferem',
    path: ['passwordConfirm'],
  })

export function UsuarioForm({
  userToEdit,
  onSuccess,
  onCancel,
}: {
  userToEdit?: any
  onSuccess: () => void
  onCancel: () => void
}) {
  const { user: currentUser } = useAuth()
  const [selectedPermissoes, setSelectedPermissoes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: userToEdit?.name || '',
      email: userToEdit?.email || '',
      password: '',
      passwordConfirm: '',
      role: userToEdit?.role || 'analista',
      status_conta: userToEdit?.status_conta || 'ativo',
    },
  })

  const watchRole = watch('role')

  useEffect(() => {
    if (userToEdit && userToEdit.permissoes_customizadas) {
      setSelectedPermissoes(userToEdit.permissoes_customizadas)
    } else {
      usuariosService.fetchRolePermissoes(watchRole).then((perms) => {
        setSelectedPermissoes(perms)
      })
    }
  }, [userToEdit, watchRole])

  const onSubmit = async (data: any) => {
    const roleMap = { 'c-level': 4, admin: 3, supervisor: 2, analista: 1 }
    const currentLvl = roleMap[currentUser?.role as keyof typeof roleMap] || 1
    const targetLvl = roleMap[data.role as keyof typeof roleMap] || 1

    if (targetLvl > currentLvl) {
      toast.error('Você não pode gerenciar um usuário com papel superior ao seu.')
      return
    }

    if (!userToEdit && !data.password) {
      toast.error('A senha é obrigatória para registrar um novo usuário.')
      return
    }

    try {
      setLoading(true)
      const payload = { ...data, permissoes_customizadas: selectedPermissoes }
      if (!payload.password) {
        delete payload.password
        delete payload.passwordConfirm
      }

      if (userToEdit) {
        await usuariosService.updateUsuario(userToEdit.id, payload)
        toast.success('Usuário atualizado com sucesso!')
      } else {
        await usuariosService.createUsuario(payload)
        toast.success('Usuário criado com sucesso!')
      }
      onSuccess()
    } catch (e: any) {
      toast.error('Erro ao salvar as informações do usuário.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="rounded-2xl border-none shadow-sm bg-card overflow-hidden">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="border-b pb-4 mb-6">
                <h3 className="text-xl font-bold text-foreground">Informações Básicas</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Defina os dados de acesso e perfil do usuário.
                </p>
              </div>

              <div className="space-y-2.5">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                  Nome Completo
                </Label>
                <Input
                  {...register('name')}
                  className="rounded-xl h-12 bg-muted/20 border-border/60"
                  placeholder="Nome do colaborador"
                />
                {errors.name && (
                  <p className="text-[12px] font-medium text-destructive mt-1">
                    {errors.name.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2.5">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                  E-mail Profissional
                </Label>
                <Input
                  {...register('email')}
                  type="email"
                  className="rounded-xl h-12 bg-muted/20 border-border/60"
                  placeholder="nome@empresa.com.br"
                />
                {errors.email && (
                  <p className="text-[12px] font-medium text-destructive mt-1">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2.5">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                    Senha
                  </Label>
                  <Input
                    {...register('password')}
                    type="password"
                    className="rounded-xl h-12 bg-muted/20 border-border/60"
                    placeholder={userToEdit ? '••••••••' : 'Senha segura'}
                  />
                  {errors.password && (
                    <p className="text-[12px] font-medium text-destructive mt-1">
                      {errors.password.message as string}
                    </p>
                  )}
                </div>
                <div className="space-y-2.5">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                    Confirmar Senha
                  </Label>
                  <Input
                    {...register('passwordConfirm')}
                    type="password"
                    className="rounded-xl h-12 bg-muted/20 border-border/60"
                    placeholder={userToEdit ? '••••••••' : 'Repita a senha'}
                  />
                  {errors.passwordConfirm && (
                    <p className="text-[12px] font-medium text-destructive mt-1">
                      {errors.passwordConfirm.message as string}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="space-y-2.5">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                    Papel / Role
                  </Label>
                  <Select
                    onValueChange={(v) => setValue('role', v)}
                    defaultValue={userToEdit?.role || 'analista'}
                  >
                    <SelectTrigger className="rounded-xl h-12 bg-muted/20 border-border/60">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="c-level">C-Level</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                      <SelectItem value="analista">Analista Padrão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2.5">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                    Status da Conta
                  </Label>
                  <Select
                    onValueChange={(v) => setValue('status_conta', v)}
                    defaultValue={userToEdit?.status_conta || 'ativo'}
                  >
                    <SelectTrigger className="rounded-xl h-12 bg-muted/20 border-border/60">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="ativo">Ativa</SelectItem>
                      <SelectItem value="suspenso">Suspensa</SelectItem>
                      <SelectItem value="bloqueado">Bloqueada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b pb-4 mb-6">
                <h3 className="text-xl font-bold text-foreground">Permissões Específicas</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  As permissões abaixo são sugeridas baseadas no papel selecionado.
                </p>
              </div>

              <PermissoesChecklist
                selectedRole={watchRole}
                selectedPermissoes={selectedPermissoes}
                onChange={setSelectedPermissoes}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-8 border-t border-border/50">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="rounded-xl h-12 px-6 font-semibold"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-xl h-12 px-8 font-bold text-[15px] shadow-sm bg-[#00A8B5] hover:bg-[#00A8B5]/90 text-white"
            >
              {loading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
              {userToEdit ? 'Atualizar Usuário' : 'Criar Usuário'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
