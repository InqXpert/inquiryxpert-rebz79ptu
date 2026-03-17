export type SimNao = 'Sim' | 'Não'

export interface Prestador {
  id: string
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
