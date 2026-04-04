import pb from '@/lib/pocketbase/client'

export async function getPeriodoFaturamentoProcesso(clienteId: string, dataSaidaStr: string) {
  if (!clienteId || !dataSaidaStr) return null

  let isoDate = dataSaidaStr
  if (dataSaidaStr.includes('/')) {
    const parts = dataSaidaStr.split('/')
    if (parts.length === 3) {
      isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`
    }
  } else {
    const d = new Date(dataSaidaStr)
    if (!isNaN(d.getTime())) {
      isoDate = d.toISOString().split('T')[0]
    }
  }

  try {
    const periodos = await pb.collection('periodos_faturamento').getFullList({
      filter: `cliente_id = "${clienteId}" && data_inicio <= "${isoDate} 23:59:59" && data_fim >= "${isoDate} 00:00:00"`,
    })
    return periodos.length > 0 ? periodos[0] : null
  } catch (error) {
    console.error('Erro ao buscar periodo faturamento:', error)
    return null
  }
}
