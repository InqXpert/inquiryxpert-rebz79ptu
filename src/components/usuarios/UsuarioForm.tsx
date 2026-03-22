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
import { Switch } from '@/components/ui/switch'
import { PermissoesChecklist } from './PermissoesChecklist'
import { Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { getAvatarUrl } from '@/utils/fileUtils'
import { totpService } from '@/services/totpService'
import { TwoFactorModal } from './TwoFactorModal'
import { DisableTwoFactorModal } from './DisableTwoFactorModal'

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

  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(getAvatarUrl(userToEdit) || null)

  const [tfaEnabled, setTfaEnabled] = useState(userToEdit?.two_fa_enabled || false)
  const [tfaSecret, setTfaSecret] = useState(userToEdit?.two_fa_secret || '')

  const [showTfaModal, setShowTfaModal] = useState(false)
  const [tfaModalData, setTfaModalData] = useState<{ secret: string; qrUrl: string } | null>(null)
  const [showDisableTfaModal, setShowDisableTfaModal] = useState(false)

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
  const watchEmail = watch('email')

  useEffect(() => {
    if (userToEdit?.permissoes_customizadas)
      setSelectedPermissoes(userToEdit.permissoes_customizadas)
    else usuariosService.fetchRolePermissoes(watchRole).then(setSelectedPermissoes)
  }, [userToEdit, watchRole])

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) return toast.error('Arquivo excede 2MB')
    if (!['image/jpeg', 'image/png'].includes(file.type))
      return toast.error('Formato inválido. Use JPG ou PNG')

    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
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

  const confirmTfaSetup = () => {
    if (tfaModalData) {
      setTfaEnabled(true)
      setTfaSecret(tfaModalData.secret)
      setShowTfaModal(false)
    }
  }

  const confirmTfaDisable = () => {
    setTfaEnabled(false)
    setTfaSecret('')
    setShowDisableTfaModal(false)
  }

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

              <div className="flex items-center gap-6 mb-6 bg-brand-light/50 dark:bg-black/20 p-4 rounded-lg border border-brand-teal/30">
                <div className="w-16 h-16 rounded-full border-2 border-brand-cyan overflow-hidden bg-white shrink-0">
                  {photoPreview ? (
                    <img src={photoPreview} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-brand-light"></div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Label className="text-brand-navy dark:text-brand-light">
                    {userToEdit ? 'Atualizar Foto Perfil' : 'Foto Perfil (Opcional)'}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/jpeg, image/png"
                      className="h-9 text-xs"
                      onChange={handlePhotoChange}
                    />
                    {(photoPreview || userToEdit?.foto_perfil) && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="h-9 px-3 shrink-0"
                        onClick={() => {
                          setPhotoFile(null)
                          setPhotoPreview(null)
                        }}
                      >
                        Remover
                      </Button>
                    )}
                  </div>
                  <p className="text-[11px] text-brand-gray">Max 2MB, JPG ou PNG</p>
                </div>
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
                <Switch checked={tfaEnabled} onCheckedChange={handleTfaToggle} />
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
              disabled={loading}
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
          onConfirm={confirmTfaSetup}
          secret={tfaModalData.secret}
          qrUrl={tfaModalData.qrUrl}
          email={watchEmail}
        />
      )}

      {showDisableTfaModal && (
        <DisableTwoFactorModal
          open={showDisableTfaModal}
          onClose={() => setShowDisableTfaModal(false)}
          onConfirm={confirmTfaDisable}
          hasActiveSessions={false} // Will be checked server side mostly, but mock false here for form builder
        />
      )}
    </div>
  )
}
