import pb from '@/lib/pocketbase/client'
import type { ProcessoSummary } from '@/types/placa'

const PLATE_REGEX = /^([A-Z]{3}-[0-9]{4}|[A-Z]{3}[0-9][A-Z][0-9]{2})$/i

export const validatePlateFormat = (plate: string): boolean => {
  const p = plate.trim()
  if (!p) return true // Allow empty validation fallback to backend
  return PLATE_REGEX.test(p)
}

export const checkPlateDuplicates = async (
  plates: string[],
  userId?: string,
  excludeId?: string,
): Promise<ProcessoSummary[]> => {
  if (!plates.length) return []
  try {
    const filters = plates.map((p) => `placas_veiculos ~ "${p.trim()}"`).join(' || ')
    let filterStr = `(${filters}) && status != 'CANCELADO'`
    if (excludeId) filterStr += ` && id != '${excludeId}'`

    const records = await pb.collection('processos_operacionais').getList(1, 5, {
      filter: filterStr,
      sort: '-created',
    })

    return records.items.map((r) => ({
      id: r.id,
      numero_controle: r.numero_controle,
      cia: r.cia,
      placas_veiculos: r.placas_veiculos,
      data_entrada: r.data_entrada,
      status: r.status,
    }))
  } catch (error) {
    logValidationAudit(userId, 'checkPlateDuplicates', error)
    throw error
  }
}

export const checkRelatedInsured = async (
  nomeSegurado: string,
  userId?: string,
  excludeId?: string,
): Promise<ProcessoSummary[]> => {
  if (!nomeSegurado.trim()) return []
  try {
    let filterStr = `nome_segurado ~ "${nomeSegurado.trim()}" && status != 'CANCELADO'`
    if (excludeId) filterStr += ` && id != '${excludeId}'`

    const records = await pb.collection('processos_operacionais').getList(1, 3, {
      filter: filterStr,
      sort: '-created',
    })

    return records.items.map((r) => ({
      id: r.id,
      numero_controle: r.numero_controle,
      cia: r.cia,
      placas_veiculos: r.placas_veiculos,
      data_entrada: r.data_entrada,
      status: r.status,
    }))
  } catch (error) {
    logValidationAudit(userId, 'checkRelatedInsured', error)
    throw error
  }
}

export const logValidationAudit = async (
  userId: string | undefined,
  context: string,
  error: any,
) => {
  try {
    if (!userId) return
    // Utilizing usuarios_historico since audit_log requires a strictly mapped processo_id
    await pb.collection('usuarios_historico').create({
      user_id: userId,
      acao: 'criar_processo', // closest generic match for failed creation attempts
      descricao: `Validation Error in ${context}: ${error?.message || 'Unknown error'}`,
    })
  } catch (e) {
    console.error('Failed to log validation audit', e)
  }
}
