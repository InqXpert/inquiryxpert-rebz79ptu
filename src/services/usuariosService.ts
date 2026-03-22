import pb from '@/lib/pocketbase/client'
import type { User, UsuarioHistorico, UsuarioSessao } from '@/types'

const logAction = async (acao: string, descricao: string, usuario_afetado_id?: string) => {
  try {
    await pb.collection('usuarios_historico').create({
      user_id: pb.authStore.record?.id,
      acao,
      descricao,
      usuario_afetado_id,
      ip_address: '0.0.0.0',
      user_agent: navigator.userAgent,
    })
  } catch (e) {
    console.error('Failed to log action', e)
  }
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
    const user = await pb.collection('users').create(data)
    await logAction('criar_usuario', `Criou o usuário ${data.email}`, user.id)
    return user
  },

  updateUsuario: async (id: string, data: any) => {
    const user = await pb.collection('users').update(id, data)
    await logAction('editar_usuario', `Atualizou o usuário ${user.email}`, user.id)
    return user
  },

  resetSenha: async (id: string) => {
    const tempPassword = Math.random().toString(36).slice(-8) + 'A1@'
    const user = await pb.collection('users').update(id, {
      password: tempPassword,
      passwordConfirm: tempPassword,
    })
    await logAction('resetar_senha', `Resetou a senha do usuário ${user.email}`, user.id)
    return tempPassword
  },

  alterarRole: async (userId: string, novoRole: string) => {
    const user = await pb.collection('users').update(userId, { role: novoRole })
    await logAction(
      'alterar_role',
      `Alterou role do usuário ${user.email} para ${novoRole}`,
      user.id,
    )
    return user
  },

  permitirUsuario: async (id: string) => {
    const user = await pb.collection('users').update(id, { status_conta: 'ativo' })
    await logAction('alterar_status_usuario', `Ativou o usuário ${user.email}`, user.id)
    return user
  },

  bloquearUsuario: async (id: string) => {
    const user = await pb.collection('users').update(id, { status_conta: 'bloqueado' })
    await logAction('alterar_status_usuario', `Bloqueou o usuário ${user.email}`, user.id)
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
    await logAction('logout', `Forçou logout da sessão ${sessionId}`, session.user_id)
    return session
  },
}
