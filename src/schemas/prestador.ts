import { z } from 'zod'

const simNaoSchema = z.enum(['Sim', 'Não'])

export const prestadorSchema = z.object({
  nomeCompleto: z.string().min(3, 'Nome é obrigatório'),
  dataNascimento: z.string().min(1, 'Data obrigatória'),
  cpf: z.string().min(11, 'CPF inválido'),
  rg: z.string().min(5, 'RG obrigatório'),
  cnpj: z.string().optional(),
  possuiCnpj: simNaoSchema,
  emiteNotaFiscal: simNaoSchema,
  notaTerceiros: simNaoSchema,
  vinculoTerceiroNf: z.string().optional(),
  baseAtendimento: z.string().min(2, 'Obrigatório'),
  regiaoAbrangencia: z.string().min(2, 'Obrigatório'),
  cepBase: z.string().min(8, 'CEP inválido'),
  telefone: z.string().min(10, 'Telefone inválido'),
  email: z.string().email('E-mail inválido'),

  banco: z.string().min(2, 'Banco obrigatório'),
  agencia: z.string().min(2, 'Agência obrigatória'),
  conta: z.string().min(2, 'Conta obrigatória'),
  titularConta: z.string().min(3, 'Titular obrigatório'),
  chavePix: z.string().min(3, 'Pix obrigatório'),
  dadosBancariosTerceiros: simNaoSchema,
  vinculoTerceiroBanco: z.string().optional(),

  valorHonorario: z.coerce.number().min(0),
  valorKm: z.coerce.number().min(0),

  ativo: simNaoSchema,
  dataAtivacao: z.string().min(1, 'Data obrigatória'),
  dataInativacao: z.string().optional(),
  naBlackList: simNaoSchema,
  motivoBlackList: z.string().optional(),

  outrasEmpresas: z.string().optional(),
  origemIndicacao: z.string().optional(),
  observacoes: z.string().optional(),
})

export type PrestadorFormValues = z.infer<typeof prestadorSchema>
