import { useEffect, useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { usuariosService } from '@/services/usuariosService'
import { useAuth } from '@/hooks/use-auth'
import { getErrorMessage } from '@/lib/pocketbase/errors'
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
import { Switch } from '@/components/ui/switch'
import { PermissoesChecklist } from './PermissoesChecklist'
import { Loader2, Eye, EyeOff, ShieldCheck, RefreshCw } from 'lucide-react'
import { getAvatarUrl } from '@/utils/fileUtils'
import { totpService } from '@/services/totpService'
import { TwoFactorModal } from './TwoFactorModal'
import { DisableTwoFactorModal } from './DisableTwoFactorModal'
import { useDebounce } from '@/hooks/use-debounce'

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const baseSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Formato de e-mail inválido'),
  role: z.enum(['c-level', 'admin', 'supervisor', 'analista'], {
    required_error: 'Selecione um papel',
  }),
  status_conta: z.enum(['ativo', 'suspenso', 'bloqueado'], {
    required_error: 'Selecione o status',
  }),
  motivo_acao: z
    .string()
    .min(5, 'Informe um motivo para esta ação na auditoria.')
    .optional()
    .or(z.literal('')),
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

  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(getAvatarUrl(userToEdit) || null)

  const [tfaEnabled, setTfaEnabled] = useState(userToEdit?.two_fa_enabled || false)
  const [tfaSecret, setTfaSecret] = useState(userToEdit?.two_fa_secret || '')
  const [showTfaModal, setShowTfaModal] = useState(false)
  const [tfaModalData, setTfaModalData] = useState<{ secret: string; qrUrl: string } | null>(null)
  const [showDisableTfaModal, setShowDisableTfaModal] = useState(false)

  const [emailChecking, setEmailChecking] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)

  const roleMap = { 'c-level': 4, admin: 3, supervisor: 2, analista: 1 }
  const currentLevel = roleMap[currentUser?.role as keyof typeof roleMap] || 1

  const schema = useMemo(() => {
    return baseSchema
      .extend({
        password: userToEdit
          ? z
              .string()
              .optional()
              .refine((val) => !val || passwordRegex.test(val), {
                message: 'Mín. 8 chars, 1 maiúscula, 1 número, 1 especial.',
              })
          : z
              .string()
              .min(8, 'Senha obrigatória')
              .regex(passwordRegex, 'Mín. 8 chars, 1 maiúscula, 1 número, 1 especial.'),
        passwordConfirm: z.string().optional(),
      })
      .refine(
        (data) => {
          if (data.password && data.password !== data.passwordConfirm) return false
          return true
        },
        { message: 'As senhas não conferem', path: ['passwordConfirm'] },
      )
  }, [userToEdit])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      name: userToEdit?.name || '',
      email: userToEdit?.email || '',
      password: '',
      passwordConfirm: '',
      role: userToEdit?.role || 'analista',
      status_conta: userToEdit?.status_conta || 'ativo',
      motivo_acao: '',
    },
  })

  const watchRole = watch('role')
  const watchEmail = watch('email')
  const watchPassword = watch('password')
  const debouncedEmail = useDebounce(watchEmail, 500)

  useEffect(() => {
    const checkEmail = async () => {
      if (debouncedEmail && debouncedEmail.includes('@') && debouncedEmail !== userToEdit?.email) {
        setEmailChecking(true)
        const exists = await usuariosService.checkEmailExists(debouncedEmail, userToEdit?.id)
        setEmailError(exists ? 'Este e-mail já está em uso por outro usuário.' : null)
        setEmailChecking(false)
      } else {
        setEmailError(null)
      }
    }
    checkEmail()
  }, [debouncedEmail, userToEdit])

  useEffect(() => {
    if (userToEdit?.permissoes_customizadas)
      setSelectedPermissoes(userToEdit.permissoes_customizadas)
    else usuariosService.fetchRolePermissoes(watchRole).then(setSelectedPermissoes)
  }, [userToEdit, watchRole])

  const getPasswordStrength = (pass: string) => {
    let score = 0
    if (!pass) return { score: 0, label: '', color: 'bg-transparent', w: 'w-0' }
    if (pass.length >= 8) score += 1
    if (/[A-Z]/.test(pass)) score += 1
    if (/[0-9]/.test(pass)) score += 1
    if (/[^A-Za-z0-9]/.test(pass)) score += 1

    if (score <= 2) return { score, label: 'Fraca', color: 'bg-brand-coral', w: 'w-1/3' }
    if (score === 3) return { score, label: 'Média', color: 'bg-brand-orange', w: 'w-2/3' }
    return { score, label: 'Forte', color: 'bg-brand-cyan', w: 'w-full' }
  }

  const pwdStrength = getPasswordStrength(watchPassword)

  const onSubmit = async (data: any) => {
    if (emailError) return toast.error('Corrija o erro de e-mail antes de salvar.')
    if (roleMap[data.role as keyof typeof roleMap] > currentLevel)
      return toast.error('Permissão negada: Você não pode atribuir um papel superior ao seu.')

    try {
      setLoading(true)
      const payload = {
        ...data,
        permissoes_customizadas: selectedPermissoes,
        two_fa_enabled: tfaEnabled,
        two_fa_secret: tfaEnabled ? tfaSecret : '',
      }
      if (!payload.password) {
        delete payload.password
        delete payload.passwordConfirm
      }
      if (photoFile) payload.foto_perfil = photoFile

      if (userToEdit) {
        await usuariosService.updateUsuario(userToEdit.id, payload, data.motivo_acao)
        toast.success('Usuário atualizado com sucesso!')
      } else {
        await usuariosService.createUsuario(payload, data.motivo_acao)
        toast.success('Usuário criado com sucesso!')
      }
      onSuccess()
    } catch (err: any) {
      const msg = getErrorMessage(err)
      toast.error(msg, {
        action:
          err.status === 0
            ? {
                label: 'Tentar Novamente',
                onClick: () => onSubmit(getValues()),
              }
            : undefined,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleTfaToggle = async (checked: boolean) => {
    if (checked) {
      if (!watchEmail) return toast.error('Preencha o e-mail primeiro para gerar o 2FA')
      const data = totpService.generateSecret(watchEmail)
      setTfaModalData(data)
      setShowTfaModal(true)
    } else {
      if (userToEdit) {
        setShowDisableTfaModal(true)
      } else {
        setTfaEnabled(false)
        setTfaSecret('')
      }
    }
  }

  return (
    <div className="p-1 rounded-xl bg-brand-teal/10 dark:bg-brand-navy/30 transition-all animate-in fade-in slide-in-from-bottom-4 duration-300">
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
                <div className="space-y-2">
                  <Label className="text-brand-navy dark:text-brand-light">
                    Nome Completo <span className="text-brand-coral">*</span>
                  </Label>
                  <Input {...register('name')} placeholder="Nome do colaborador" />
                  {errors.name && (
                    <p className="text-[12px] font-medium text-brand-coral">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2 relative">
                  <Label className="text-brand-navy dark:text-brand-light">
                    E-mail Profissional <span className="text-brand-coral">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      {...register('email')}
                      type="email"
                      placeholder="nome@empresa.com.br"
                      className={
                        emailError ? 'border-brand-coral focus-visible:ring-brand-coral' : ''
                      }
                    />
                    {emailChecking && (
                      <RefreshCw className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cyan animate-spin" />
                    )}
                  </div>
                  {(errors.email || emailError) && (
                    <p className="text-[12px] font-medium text-brand-coral">
                      {emailError || (errors.email?.message as string)}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-brand-navy dark:text-brand-light">
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
                    {watchPassword && (
                      <div className="mt-1">
                        <div className="h-1.5 w-full bg-brand-light rounded-full overflow-hidden">
                          <div
                            className={`h-full ${pwdStrength.color} ${pwdStrength.w} transition-all duration-300`}
                          />
                        </div>
                        <p
                          className={`text-[11px] font-bold mt-1 ${pwdStrength.color.replace('bg-', 'text-')}`}
                        >
                          {pwdStrength.label}
                        </p>
                      </div>
                    )}
                    {errors.password && (
                      <p className="text-[12px] font-medium text-brand-coral">
                        {errors.password.message as string}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-brand-navy dark:text-brand-light">
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
                      <p className="text-[12px] font-medium text-brand-coral">
                        {errors.passwordConfirm.message as string}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-brand-navy dark:text-brand-light">
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
                        <SelectItem value="c-level" disabled={currentLevel < 4}>
                          C-Level
                        </SelectItem>
                        <SelectItem value="admin" disabled={currentLevel < 3}>
                          Administrador
                        </SelectItem>
                        <SelectItem value="supervisor" disabled={currentLevel < 2}>
                          Supervisor
                        </SelectItem>
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

                <div className="space-y-2 pt-2">
                  <Label className="text-brand-navy dark:text-brand-light flex items-center justify-between">
                    <span>Motivo da Ação (Auditoria)</span>
                    <span className="text-[11px] font-normal text-brand-gray">Recomendado</span>
                  </Label>
                  <Input
                    {...register('motivo_acao')}
                    placeholder="Ex: Solicitação do RH via Ticket #1234"
                  />
                  {errors.motivo_acao && (
                    <p className="text-[12px] font-medium text-brand-coral">
                      {errors.motivo_acao.message as string}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b border-brand-teal/50 pb-4 mb-6">
                <h3 className="text-[20px] font-bold text-brand-navy dark:text-white">
                  Segurança & Permissões
                </h3>
                <p className="text-[14px] text-brand-gray dark:text-brand-light/80 mt-1">
                  Configure autenticação avançada e privilégios.
                </p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 mb-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-brand-cyan" />
                  <div>
                    <Label className="text-[14px] font-bold text-brand-navy dark:text-white mb-0.5 block cursor-pointer">
                      Habilitar 2FA (Autenticador)
                    </Label>
                    <span className="text-[12px] text-brand-gray dark:text-brand-light font-medium">
                      Requer app autenticador no login
                    </span>
                  </div>
                </div>
                <Switch
                  checked={tfaEnabled}
                  onCheckedChange={handleTfaToggle}
                  disabled={currentLevel < 3}
                />
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
              className="h-11 px-6 font-bold border-brand-teal text-brand-navy"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading || emailChecking || !!emailError}
              className="h-11 px-8 font-bold bg-brand-cyan text-white hover:bg-brand-cyan/90"
            >
              {loading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
              {userToEdit ? 'Atualizar Usuário' : 'Criar Usuário'}
            </Button>
          </div>
        </form>
      </div>

      {tfaModalData && (
        <TwoFactorModal
          open={showTfaModal}
          onClose={() => {
            setShowTfaModal(false)
            setTfaEnabled(false)
          }}
          onConfirm={() => {
            setTfaEnabled(true)
            setTfaSecret(tfaModalData.secret)
            setShowTfaModal(false)
          }}
          secret={tfaModalData.secret}
          qrUrl={tfaModalData.qrUrl}
          email={watchEmail}
        />
      )}
      {showDisableTfaModal && (
        <DisableTwoFactorModal
          open={showDisableTfaModal}
          onClose={() => setShowDisableTfaModal(false)}
          onConfirm={() => {
            setTfaEnabled(false)
            setTfaSecret('')
            setShowDisableTfaModal(false)
          }}
          hasActiveSessions={false}
        />
      )}
    </div>
  )
}
