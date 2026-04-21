import { z } from 'zod'

export const placaRegex = /^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/
export const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/

export const terceiroSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').toUpperCase(),
  cpf: z
    .string()
    .optional()
    .refine((val) => !val || cpfRegex.test(val), 'CPF inválido'),
  veiculo: z
    .string()
    .optional()
    .transform((v) => v?.toUpperCase()),
  placa: z
    .string()
    .optional()
    .transform((v) => v?.toUpperCase())
    .refine((val) => !val || placaRegex.test(val), 'Placa inválida'),
})

export const novoProcessoSchema = z
  .object({
    seguradora: z.string().min(1, 'Preencha todos os campos obrigatorios'),
    controle_cia: z
      .string()
      .min(1, 'Preencha todos os campos obrigatorios')
      .refine((val) => val === val.toUpperCase(), 'Todos os campos devem estar em MAIUSCULAS'),
    natureza_sinistro: z.string().min(1, 'Preencha todos os campos obrigatorios'),
    tipo_investigacao: z.string().min(1, 'Preencha todos os campos obrigatorios'),
    regiao_sinistro: z
      .string()
      .min(1, 'Preencha todos os campos obrigatorios')
      .refine((val) => val === val.toUpperCase(), 'Todos os campos devem estar em MAIUSCULAS')
      .regex(
        /^[A-Z]{2}\s\/\s[A-Z\s]+$/,
        'Formato invalido. Use ESTADO / CIDADE (exemplo: SP / SAO PAULO)',
      ),
    nome_segurado: z
      .string()
      .min(1, 'Preencha todos os campos obrigatorios')
      .refine((val) => val === val.toUpperCase(), 'Todos os campos devem estar em MAIUSCULAS'),
    cpf_segurado: z
      .string()
      .optional()
      .refine((val) => !val || cpfRegex.test(val), 'CPF inválido'),
    nome_condutor: z
      .string()
      .optional()
      .transform((v) => v?.toUpperCase()),
    cpf_condutor: z
      .string()
      .optional()
      .refine((val) => !val || cpfRegex.test(val), 'CPF inválido'),
    placas_veiculos: z
      .string()
      .optional()
      .refine(
        (val) => !val || val === val.toUpperCase(),
        'Todos os campos devem estar em MAIUSCULAS',
      )
      .refine((val) => {
        if (!val) return true
        const placas = val.split(',').map((p) => p.trim())
        return placas.every((p) => placaRegex.test(p))
      }, 'Formato de placa invalido. Use ABC-1234 ou ABC1D34'),
    solicitante_id: z.string().min(1, 'Preencha todos os campos obrigatorios'),
    analista_cliente_id: z.string().optional().or(z.literal('')),
    agente_id: z.string().optional().or(z.literal('')),
    supervisor_id: z.string().min(1, 'Preencha todos os campos obrigatorios'),
    status: z.string().default('ANALISE_INICIAL'),
    dados_terceiros: z.array(terceiroSchema).optional().default([]),
  })
  .superRefine((data, ctx) => {
    const isProperty =
      data.natureza_sinistro === 'PROPERTY' ||
      (data.tipo_investigacao && data.tipo_investigacao.includes('PROPERTY'))
    if (!isProperty && !data.placas_veiculos) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Placa obrigatória para este tipo de sinistro',
        path: ['placas_veiculos'],
      })
    }
  })

export type NovoProcessoFormData = z.infer<typeof novoProcessoSchema>
