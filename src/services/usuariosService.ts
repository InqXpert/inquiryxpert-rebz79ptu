import pb from '@/lib/pocketbase/client'
import type { User, UsuarioHistorico, UsuarioSessao } from '@/types'
import { trackAcao } from '@/utils/trackAcao'

const buildFormData = (data: any) => {
  const fd = new FormData()
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      if (data[key] instanceof File) {
        fd.append(key, data[key])
      } else if (Array.isArray(data[key]) || typeof data[key] === 'object') {
        fd.append(key, JSON.stringify(data[key]))
      } else {
        fd.append(key, String(data[key]))
      }
    }
  }
  return fd
}

export const usuariosService = {
  fetchUsuarios: async () => {
    return await pb.collection('users').getFullList<User>({ sort: '-created' })
  },

  fetchRolePermissoes: async (role: string) => {
    try {
      const record = await pb.collection('roles_permissoes').getFirstListItem(`role='${role}'`)
      return record.permissoes || []
    } catch {
      return []
    }
  },

  createUsuario: async (data: any) => {
    const payload = buildFormData(data)
    const user = await pb.collection('users').create(payload)
    await trackAcao('criar_usuario', `Criou o usuário ${data.email}`, user.id)
    return user
  },

  updateUsuario: async (id: string, data: any) => {
    const payload = buildFormData(data)
    const user = await pb.collection('users').update(id, payload)
    await trackAcao('editar_usuario', `Atualizou o usuário ${user.email}`, user.id)
    return user
  },

  updateFotoPerfil: async (id: string, file: File | null) => {
    const fd = new FormData()
    if (file) fd.append('foto_perfil', file)
    else fd.append('foto_perfil', '')
    const user = await pb.collection('users').update(id, fd)
    await trackAcao('alteracao_perfil', `Atualizou a foto de perfil`, user.id)
    return user
  },

  toggle2FA: async (id: string, enabled: boolean, secret?: string) => {
    const data: any = { two_fa_enabled: enabled }
    if (secret) data.two_fa_secret = secret
    else if (!enabled) data.two_fa_secret = ''

    const user = await pb.collection('users').update(id, data)
    await trackAcao(
      'habilitar_2fa',
      `${enabled ? 'Habilitou' : 'Desabilitou'} 2FA para o usuário`,
      user.id,
    )
    return user
  },

  checkActiveSessionsFor2FA: async (userId: string) => {
    const res = await pb.collection('usuarios_sessoes').getList(1, 1, {
      filter: `user_id='${userId}' && expirada=false`,
    })
    return res.totalItems > 0
  },

  resetSenha: async (id: string) => {
    const tempPassword = Math.random().toString(36).slice(-8) + 'A1@'
    const user = await pb.collection('users').update(id, {
      password: tempPassword,
      passwordConfirm: tempPassword,
    })
    await trackAcao('resetar_senha', `Resetou a senha do usuário ${user.email}`, user.id)
    return tempPassword
  },

  alterarRole: async (userId: string, novoRole: string) => {
    const user = await pb.collection('users').update(userId, { role: novoRole })
    await trackAcao(
      'alterar_role',
      `Alterou role do usuário ${user.email} para ${novoRole}`,
      user.id,
    )
    return user
  },

  permitirUsuario: async (id: string) => {
    const user = await pb.collection('users').update(id, { status_conta: 'ativo' })
    await trackAcao('alterar_status_usuario', `Ativou o usuário ${user.email}`, user.id)
    return user
  },

  bloquearUsuario: async (id: string) => {
    const user = await pb.collection('users').update(id, { status_conta: 'bloqueado' })
    await trackAcao('alterar_status_usuario', `Bloqueou o usuário ${user.email}`, user.id)
    return user
  },

  fetchHistorico: async (userId?: string, limit = 50) => {
    const filter = userId ? `usuario_afetado_id='${userId}' || user_id='${userId}'` : ''
    return await pb.collection('usuarios_historico').getList<UsuarioHistorico>(1, limit, {
      filter,
      sort: '-created',
      expand: 'user_id,usuario_afetado_id',
    })
  },

  fetchAllHistorico: async () => {
    return await pb.collection('usuarios_historico').getFullList<any>({
      sort: '-created',
      expand: 'user_id,usuario_afetado_id',
    })
  },

  fetchSessoes: async (userId: string) => {
    return await pb.collection('usuarios_sessoes').getFullList<UsuarioSessao>({
      filter: `user_id='${userId}' && expirada=false`,
      sort: '-created',
    })
  },

  forceLogout: async (sessionId: string) => {
    const session = await pb.collection('usuarios_sessoes').update(sessionId, { expirada: true })
    await trackAcao('logout', `Forçou logout remoto da sessão ${sessionId}`, session.user_id)
    return session
  },
}
