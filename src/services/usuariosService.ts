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

  checkEmailExists: async (email: string, excludeId?: string) => {
    try {
      const filter = excludeId ? `email='${email}' && id != '${excludeId}'` : `email='${email}'`
      const res = await pb.collection('users').getList(1, 1, { filter })
      return res.totalItems > 0
    } catch {
      return false
    }
  },

  fetchRolePermissoes: async (role: string) => {
    try {
      const record = await pb.collection('roles_permissoes').getFirstListItem(`role='${role}'`)
      return record.permissoes || []
    } catch {
      return []
    }
  },

  createUsuario: async (data: any, motivo?: string) => {
    const payload = buildFormData(data)
    const user = await pb.collection('users').create(payload)
    await trackAcao('criar_usuario', `Criou o usuário ${data.email}`, user.id, motivo)
    return user
  },

  updateUsuario: async (id: string, data: any, motivo?: string) => {
    const sanitizedData = { ...data }

    // Strip out any empty password-related keys to prevent validation errors
    const passwordFields = ['password', 'passwordConfirm', 'oldPassword']
    passwordFields.forEach((field) => {
      if (!sanitizedData[field] || String(sanitizedData[field]).trim() === '') {
        delete sanitizedData[field]
      }
    })

    const payload = buildFormData(sanitizedData)
    const user = await pb.collection('users').update(id, payload)
    await trackAcao('editar_usuario', `Atualizou perfil do usuário ${user.email}`, user.id, motivo)
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
      'Solicitado pelo administrador ou próprio usuário',
    )
    return user
  },

  checkActiveSessionsFor2FA: async (userId: string) => {
    const res = await pb.collection('usuarios_sessoes').getList(1, 1, {
      filter: `user_id='${userId}' && expirada=false`,
    })
    return res.totalItems > 0
  },

  resetSenha: async (id: string, motivo?: string) => {
    const tempPassword = Math.random().toString(36).slice(-8) + 'A1@'
    const user = await pb.collection('users').update(id, {
      password: tempPassword,
      passwordConfirm: tempPassword,
    })
    await trackAcao('resetar_senha', `Resetou a senha do usuário ${user.email}`, user.id, motivo)
    return tempPassword
  },

  alterarRole: async (userId: string, novoRole: string, motivo?: string) => {
    const user = await pb.collection('users').update(userId, { role: novoRole })
    await trackAcao(
      'alterar_role',
      `Alterou role do usuário ${user.email} para ${novoRole}`,
      user.id,
      motivo,
    )
    return user
  },

  permitirUsuario: async (id: string, motivo?: string) => {
    const user = await pb.collection('users').update(id, { status_conta: 'ativo' })
    await trackAcao('alterar_status_usuario', `Ativou o usuário ${user.email}`, user.id, motivo)
    return user
  },

  bloquearUsuario: async (id: string, motivo?: string) => {
    const user = await pb.collection('users').update(id, { status_conta: 'bloqueado' })
    await trackAcao('alterar_status_usuario', `Bloqueou o usuário ${user.email}`, user.id, motivo)
    return user
  },

  fetchSessoes: async (userId: string) => {
    return await pb.collection('usuarios_sessoes').getFullList<UsuarioSessao>({
      filter: `user_id='${userId}' && expirada=false`,
      sort: '-created',
    })
  },

  forceLogout: async (sessionId: string) => {
    const session = await pb.collection('usuarios_sessoes').update(sessionId, { expirada: true })
    await trackAcao(
      'logout',
      `Forçou logout remoto da sessão ${sessionId}`,
      session.user_id,
      'Ação administrativa',
    )
    return session
  },

  archiveUsuario: async (id: string, newUserId?: string) => {
    const user = await pb.collection('users').getOne(id)

    if (newUserId) {
      await usuariosService.reassignActiveProcesses(id, newUserId)
    }

    const archivedDate = new Date().toISOString()
    const updated = await pb.collection('users').update(id, { archived_at: archivedDate })

    await pb
      .collection('registros_auditoria_adm')
      .create({
        acao: 'ARCHIVE_USER',
        executor_id: pb.authStore.record?.id,
        data_evento: archivedDate,
        registro_afetado_id: id,
        dados_registro: user,
        motivo: 'User archived manually',
      })
      .catch(console.error)

    return updated
  },

  restoreUsuario: async (id: string) => {
    const user = await pb.collection('users').getOne(id)
    const updated = await pb.collection('users').update(id, { archived_at: null })

    await pb
      .collection('registros_auditoria_adm')
      .create({
        acao: 'RESTORE_USER',
        executor_id: pb.authStore.record?.id,
        data_evento: new Date().toISOString(),
        registro_afetado_id: id,
        dados_registro: user,
        motivo: 'User restored manually',
      })
      .catch(console.error)

    return updated
  },

  deleteUsuario: async (id: string, newUserId?: string) => {
    const user = await pb.collection('users').getOne(id)

    if (newUserId) {
      await usuariosService.reassignActiveProcesses(id, newUserId)
    }

    try {
      const sessoes = await pb
        .collection('usuarios_sessoes')
        .getFullList({ filter: `user_id='${id}'` })
      await Promise.all(sessoes.map((s) => pb.collection('usuarios_sessoes').delete(s.id)))

      const notificacoes = await pb
        .collection('notificacoes_sistema')
        .getFullList({ filter: `user_id='${id}'` })
      await Promise.all(notificacoes.map((n) => pb.collection('notificacoes_sistema').delete(n.id)))

      const favoritos = await pb
        .collection('processos_favoritos')
        .getFullList({ filter: `user_id='${id}'` })
      await Promise.all(favoritos.map((f) => pb.collection('processos_favoritos').delete(f.id)))
    } catch (error) {
      console.error('Erro ao limpar registros associados', error)
    }

    await pb
      .collection('registros_auditoria_adm')
      .create({
        acao: 'DELETE_USER',
        executor_id: pb.authStore.record?.id,
        data_evento: new Date().toISOString(),
        registro_afetado_id: id,
        dados_registro: user,
        motivo: 'User deleted manually',
      })
      .catch(console.error)

    await pb.collection('users').delete(id)
    return true
  },

  getActiveProcessesForUser: async (userId: string) => {
    try {
      return await pb.collection('processos_operacionais').getFullList({
        filter: `(user_id = '${userId}' || supervisor_id = '${userId}') && status != 'FINALIZADO' && status != 'CANCELADO' && deleted_at = ""`,
      })
    } catch {
      return []
    }
  },

  reassignActiveProcesses: async (oldUserId: string, newUserId: string) => {
    const processes = await usuariosService.getActiveProcessesForUser(oldUserId)

    for (const proc of processes) {
      const dataToUpdate: any = { started_by: oldUserId }
      if (proc.user_id === oldUserId) dataToUpdate.user_id = newUserId
      if (proc.supervisor_id === oldUserId) dataToUpdate.supervisor_id = newUserId

      await pb.collection('processos_operacionais').update(proc.id, dataToUpdate)
    }
  },
}
