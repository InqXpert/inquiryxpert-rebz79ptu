import pb from '@/lib/pocketbase/client'

export const getPeriodos = async (status?: string, clienteId?: string) => {
  const filters: string[] = []
  if (status && status !== 'all') filters.push(`status = '${status}'`)
  if (clienteId && clienteId !== 'all') filters.push(`cliente_id = '${clienteId}'`)

  return pb.collection('periodos_faturamento').getFullList({
    filter: filters.join(' && '),
    expand: 'cliente_id',
    sort: '-created',
  })
}

export const getClientesAtivos = async () => {
  return pb.collection('clientes_contratos').getFullList({
    filter: "status = 'ativo'",
    sort: 'razao_social',
  })
}

export const createPeriodo = async (data: {
  cliente_id: string
  data_inicio: string
  data_fim: string
}) => {
  const filter = `cliente_id = '${data.cliente_id}' && status = 'FINALIZADO' && data_saida >= '${data.data_inicio}' && data_saida <= '${data.data_fim}'`

  let total_processos = 0
  try {
    const processos = await pb.collection('processos_operacionais').getList(1, 1, {
      filter,
    })
    total_processos = processos.totalItems || 0
  } catch (err) {
    console.error('Error fetching processos', err)
  }

  const baseRate = 850.0
  const faturamento_total = total_processos * baseRate

  return pb.collection('periodos_faturamento').create({
    cliente_id: data.cliente_id,
    data_inicio: new Date(data.data_inicio + 'T00:00:00Z').toISOString(),
    data_fim: new Date(data.data_fim + 'T23:59:59Z').toISOString(),
    status: 'aberto',
    total_processos,
    faturamento_total,
  })
}

export const fecharPeriodo = async (id: string) => {
  return pb.collection('periodos_faturamento').update(id, {
    status: 'fechado',
  })
}

export const deletarPeriodo = async (id: string) => {
  return pb.collection('periodos_faturamento').delete(id)
}
