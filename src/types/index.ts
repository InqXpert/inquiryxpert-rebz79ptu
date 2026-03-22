export type SimNao = 'Sim' | 'Não'

export type UserRole = 'c-level' | 'admin' | 'supervisor' | 'analista' | 'agente'
export type UserStatus = 'ativo' | 'suspenso' | 'bloqueado'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  status_conta: UserStatus
  ultimo_login?: string
  tempo_uso_total: number
  foto_perfil?: string
  two_fa_enabled: boolean
  two_fa_secret?: string
  created: string
  updated: string
  collectionId?: string
}

export interface UsuarioHistorico {
  id: string
  user_id: string
  acao: string
  descricao: string
  ip_address: string
  user_agent: string
  created: string
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

export interface Agente {
  id: string
  user_id?: string
  created?: string
  updated?: string
  numero_controle?: string
  nome?: string
  nomeCompleto: string
  dataNascimento: string
  cpf: string
  rg: string
  cnpj: string
  possuiCnpj: SimNao
  emiteNotaFiscal: SimNao
  notaTerceiros: SimNao
  vinculoTerceiroNf?: string
  baseAtendimento: string
  base_atendimento_estado?: string
  base_atendimento_cidade?: string
  regiaoAbrangencia: string
  cepBase: string
  telefone: string
  email: string
  banco: string
  agencia: string
  conta: string
  titularConta: string
  chavePix: string
  dadosBancariosTerceiros: SimNao
  vinculoTerceiroBanco?: string
  valorHonorario: number
  valorKm: number
  valor_hora?: number
  ativo: SimNao
  status_conta?: UserStatus
  dataAtivacao: string
  dataInativacao?: string
  naBlackList: SimNao
  motivoBlackList?: string
  outrasEmpresas: string
  origemIndicacao: string
  observacoes: string
  foto_perfil?: string
  qualidade_nivel?: string
  experiencia_nivel?: string
  compliance_nivel?: string
  criado_por?: string
}

export type ProcessoStatus =
  | 'em_elaboracao'
  | 'em_execucao'
  | 'finalizado'
  | 'cancelado'
  | 'analise_inicial'
  | 'em_andamento'
  | 'concluido'
  | 'pendente'
  | 'bloqueado_sem_audio'

export type ProcessoResultado = 'regular' | 'irregular' | 'analise' | 'cancelado' | ''

export interface ProcessoOperacional {
  id: string
  numero_controle: string
  numero_processo?: string
  agente_id?: string
  supervisor_id?: string
  status: ProcessoStatus
  cia: string
  tipo_servico: string
  local_sinistro: string
  agente_prestador: string
  data_entrada: string
  data_prazo?: string
  data_conclusao?: string
  dias_uteis: number
  data_retorno: string
  data_saida: string
  resultado: ProcessoResultado
  dias_totais: number
  controle_cia: string
  nome_segurado: string
  placas_veiculos: string
  analista_solicitante: string
  revisor: string
  descricao?: string
  observacoes: string
  orientacoes?: string
  posicao_1: string
  posicao_2: string
  posicao_3: string
  user_id: string
  relatorio_status?: 'rascunho' | 'enviado' | 'revisado' | 'aprovado'
  audio_obrigatorio_presente?: boolean
  audio_validado?: boolean
  data_validacao_audio?: string
  prioridade?: 'baixa' | 'media' | 'alta'
  created: string
  updated: string
}

export interface ProcessoHistorico {
  id: string
  processo_id: string
  tipo_evento: string
  descricao: string
  user_name: string
  data_anteriores?: string
  data_novos?: string
  created: string
}

export interface ProcessoDocumento {
  id: string
  processo_id: string
  arquivo: string
  name: string
  size: number
  created: string
  url?: string
}

export interface DocumentoProcesso {
  id: string
  processo_id: string
  agente_id: string
  arquivo_url: string
  tipo: 'cliente' | 'agente' | 'supervisor' | 'audio_entrevista'
  duracao_segundos?: number
  versao?: number
  validado?: boolean
  created: string
  updated: string
}

export interface RelatorioProcesso {
  id: string
  processo_id: string
  agente_id: string
  conteudo: string
  status: 'rascunho' | 'enviado' | 'revisado' | 'aprovado'
  data_envio?: string
  data_aprovacao?: string
  feedback_supervisor?: string
  pode_faturar: boolean
  created: string
  updated: string
}

export interface NotificacaoAgente {
  id: string
  agente_id: string
  tipo:
    | 'novo_processo'
    | 'prazo_proximo'
    | 'mensagem'
    | 'treinamento'
    | 'audio_obrigatorio_faltando'
  titulo: string
  descricao: string
  lida: boolean
  created: string
  updated: string
}
