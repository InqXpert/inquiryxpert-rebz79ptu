import { ClientResponseError } from 'pocketbase'

export type FieldErrors = Record<string, string>

const ERROR_TRANSLATIONS: Record<string, string> = {
  'Failed to authenticate.': 'E-mail ou senha incorretos.',
  validation_required: 'Este campo é obrigatório.',
  validation_invalid_email: 'O formato do e-mail é inválido.',
  validation_not_unique: 'Este valor já está em uso.',
  validation_too_short: 'O texto é muito curto.',
  validation_too_long: 'O texto é muito longo.',
  validation_file_size_limit: 'O arquivo excede o tamanho máximo permitido.',
}

export function extractFieldErrors(error: unknown): FieldErrors {
  if (!(error instanceof ClientResponseError)) return {}
  const data = error.response?.data
  if (!data || typeof data !== 'object') return {}

  const errors: FieldErrors = {}
  for (const [field, detail] of Object.entries(data)) {
    if (detail && typeof detail === 'object' && 'code' in detail && 'message' in detail) {
      const code = (detail as { code: string }).code
      const msg = (detail as { message: string }).message
      errors[field] = ERROR_TRANSLATIONS[code] || msg
    }
  }
  return errors
}

export function getErrorMessage(error: unknown): string {
  if (!(error instanceof ClientResponseError)) {
    return error instanceof Error ? error.message : 'Ocorreu um erro inesperado no sistema.'
  }

  // Network / timeout errors
  if (error.status === 0) {
    return 'Falha na conexão com o servidor. Verifique sua internet.'
  }

  // Auth errors
  if (error.status === 400 && error.message === 'Failed to authenticate.') {
    return ERROR_TRANSLATIONS['Failed to authenticate.']
  }

  // Rate limits
  if (error.status === 429) {
    return 'Muitas requisições. Por favor, aguarde alguns minutos.'
  }

  const msgs = Object.values(extractFieldErrors(error))
  return msgs.length > 0
    ? msgs.join(' ')
    : ERROR_TRANSLATIONS[error.message] || error.message || 'Ocorreu um erro inesperado.'
}
