import { z } from 'zod'

export const placaRegex = /^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/

export const novoProcessoSchema = z.object({
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
  placas_veiculos: z
    .string()
    .min(1, 'Preencha todos os campos obrigatorios')
    .refine((val) => val === val.toUpperCase(), 'Todos os campos devem estar em MAIUSCULAS')
    .refine((val) => {
      const placas = val.split(',').map((p) => p.trim())
      return placas.every((p) => placaRegex.test(p))
    }, 'Formato de placa invalido. Use ABC-1234 ou ABC1D34'),
  solicitante_id: z.string().min(1, 'Preencha todos os campos obrigatorios'),
  agente_id: z.string().min(1, 'Preencha todos os campos obrigatorios'),
  supervisor_id: z.string().min(1, 'Preencha todos os campos obrigatorios'),
  status: z.string().default('ANALISE_INICIAL'),
})

export type NovoProcessoFormData = z.infer<typeof novoProcessoSchema>
