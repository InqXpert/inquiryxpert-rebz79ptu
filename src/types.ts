export interface User {
  id: string
  collectionId: string
  collectionName: string
  username?: string
  verified: boolean
  emailVisibility: boolean
  email: string
  created: string
  updated: string
  name?: string
  avatar?: string
  role?: 'c-level' | 'admin' | 'supervisor' | 'analista'
  status_conta?: string
  ultimo_login?: string
  tempo_uso_total?: number
  foto_perfil?: string
  two_fa_enabled?: boolean
  two_fa_secret?: string
  [key: string]: any
}

export interface UsuarioHistorico {
  id: string
  user_id: string
  acao: string
  descricao: string
  ip_address: string
  user_agent: string
  created: string
  usuario_afetado_id?: string
  expand?: any
}

export interface UsuarioSessao {
  id: string
  user_id: string
  token: string
  ip_address: string
  duracao_minutos: number
  expirada: boolean
  created: string
}
