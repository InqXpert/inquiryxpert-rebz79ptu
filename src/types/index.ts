export type SimNao = 'Sim' | 'Não'

export interface Agente {
  id: string
  created?: string
  updated?: string
  numero_controle?: string
  // 1. Dados Cadastrais
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
  regiaoAbrangencia: string
  cepBase: string
  telefone: string
  email: string
  // 2. Dados Bancários
  banco: string
  agencia: string
  conta: string
  titularConta: string
  chavePix: string
  dadosBancariosTerceiros: SimNao
  vinculoTerceiroBanco?: string
  // 3. Condições Comerciais
  valorHonorario: number
  valorKm: number
  // 4. Status
  ativo: SimNao
  dataAtivacao: string
  dataInativacao?: string
  naBlackList: SimNao
  motivoBlackList?: string
  // 5. Outras Informações
  outrasEmpresas: string
  origemIndicacao: string
  observacoes: string
}

export type ProcessoStatus =
  | 'em_elaboracao'
  | 'em_execucao'
  | 'finalizado'
  | 'cancelado'
  | 'analise_inicial'
export type ProcessoResultado = 'regular' | 'irregular' | 'analise' | 'cancelado' | ''

export interface ProcessoOperacional {
  id: string
  numero_controle: string
  status: ProcessoStatus
  cia: string
  tipo_servico: string
  local_sinistro: string
  agente_prestador: string
  data_entrada: string
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
  observacoes: string
  posicao_1: string
  posicao_2: string
  posicao_3: string
  user_id: string
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
