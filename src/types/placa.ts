export type ValidationState = 'IDLE' | 'TYPING' | 'VALIDATING' | 'VALID' | 'WARNING' | 'INVALID'

export interface ProcessoSummary {
  id: string
  numero_controle?: string
  cia: string
  placas_veiculos: string
  data_entrada: string
  status: string
}

export interface PlateValidationResult {
  state: ValidationState
  message?: string
  duplicates: ProcessoSummary[]
}

export interface InsuredValidationResult {
  state: ValidationState
  message?: string
  related: ProcessoSummary[]
}
