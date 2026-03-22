import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { usuariosService } from '@/services/usuariosService'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
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
import { Loader2, Eye, EyeOff } from 'lucide-react'

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
    { message: 'Mín. 8 chars, 1 maiúscula, 1 número, 1 especial.', path: ['password'] },
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
  const [showPwd, setShowPwd] = useState(false)
  const [showPwdConfirm, setShowPwdConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitSuccessful },
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
    if (userToEdit?.permissoes_customizadas)
      setSelectedPermissoes(userToEdit.permissoes_customizadas)
    else usuariosService.fetchRolePermissoes(watchRole).then(setSelectedPermissoes)
  }, [userToEdit, watchRole])

  const onSubmit = async (data: any) => {
    const roleMap = { 'c-level': 4, admin: 3, supervisor: 2, analista: 1 }
    if (
      (roleMap[data.role as keyof typeof roleMap] || 1) >
      (roleMap[currentUser?.role as keyof typeof roleMap] || 1)
    )
      return toast.error('Você não pode gerenciar um usuário com papel superior ao seu.')
    if (!userToEdit && !data.password)
      return toast.error('A senha é obrigatória para registrar um novo usuário.')

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
    } catch {
      toast.error('Erro ao salvar as informações do usuário.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`p-1 rounded-xl bg-brand-teal/10 dark:bg-brand-navy/30 transition-all ${isSubmitSuccessful ? 'animate-in fade-in slide-in-from-bottom-4 duration-300' : ''}`}
    >
      <div className="bg-white dark:bg-brand-navy rounded-lg p-6 sm:p-8 border border-brand-teal dark:border-brand-cyan/50 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="border-b border-brand-teal/50 pb-4 mb-6">
                <h3 className="text-[20px] font-bold text-brand-navy dark:text-white">
                  Informações Básicas
                </h3>
                <p className="text-[14px] text-brand-gray dark:text-brand-light/80 mt-1">
                  Defina os dados de acesso e perfil do usuário.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2 text-brand-navy dark:text-brand-light">
                  <Label>
                    Nome Completo <span className="text-brand-coral">*</span>
                  </Label>
                  <Input {...register('name')} placeholder="Nome do colaborador" />
                  {errors.name && (
                    <p className="text-[12px] font-medium text-brand-coral mt-1">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2 text-brand-navy dark:text-brand-light">
                  <Label>
                    E-mail Profissional <span className="text-brand-coral">*</span>
                  </Label>
                  <Input {...register('email')} type="email" placeholder="nome@empresa.com.br" />
                  {errors.email && (
                    <p className="text-[12px] font-medium text-brand-coral mt-1">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 text-brand-navy dark:text-brand-light">
                    <Label>
                      Senha {!userToEdit && <span className="text-brand-coral">*</span>}
                    </Label>
                    <div className="relative">
                      <Input
                        {...register('password')}
                        type={showPwd ? 'text' : 'password'}
                        placeholder={userToEdit ? '••••••••' : 'Senha segura'}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd(!showPwd)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-cyan hover:text-brand-cyan/80"
                      >
                        {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-[12px] font-medium text-brand-coral mt-1">
                        {errors.password.message as string}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 text-brand-navy dark:text-brand-light">
                    <Label>
                      Confirmar Senha {!userToEdit && <span className="text-brand-coral">*</span>}
                    </Label>
                    <div className="relative">
                      <Input
                        {...register('passwordConfirm')}
                        type={showPwdConfirm ? 'text' : 'password'}
                        placeholder={userToEdit ? '••••••••' : 'Repita a senha'}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwdConfirm(!showPwdConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-cyan hover:text-brand-cyan/80"
                      >
                        {showPwdConfirm ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.passwordConfirm && (
                      <p className="text-[12px] font-medium text-brand-coral mt-1">
                        {errors.passwordConfirm.message as string}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 text-brand-navy dark:text-brand-light">
                    <Label>
                      Papel / Role <span className="text-brand-coral">*</span>
                    </Label>
                    <Select
                      onValueChange={(v) => setValue('role', v)}
                      defaultValue={userToEdit?.role || 'analista'}
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
                  <div className="space-y-2 text-brand-navy dark:text-brand-light">
                    <Label>
                      Status da Conta <span className="text-brand-coral">*</span>
                    </Label>
                    <Select
                      onValueChange={(v) => setValue('status_conta', v)}
                      defaultValue={userToEdit?.status_conta || 'ativo'}
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
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b border-brand-teal/50 pb-4 mb-6">
                <h3 className="text-[20px] font-bold text-brand-navy dark:text-white">
                  Permissões Específicas
                </h3>
                <p className="text-[14px] text-brand-gray dark:text-brand-light/80 mt-1">
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

          <div className="flex items-center justify-end gap-4 pt-6 border-t border-brand-teal/50">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="h-11 px-6 font-bold border-brand-teal text-brand-navy hover:bg-brand-light dark:text-white dark:hover:bg-brand-navy/50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="h-11 px-8 font-bold bg-brand-cyan text-white hover:bg-brand-cyan/90"
            >
              {loading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
              {userToEdit ? 'Atualizar Usuário' : 'Criar Usuário'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
