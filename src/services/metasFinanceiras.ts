import pb from '@/lib/pocketbase/client'

export async function getMetasGerais(mes: number, ano: number) {
  try {
    const records = await pb.collection('metas_gerais').getFullList({
      filter: `mes = ${mes} && ano = ${ano}`,
    })
    return records[0] || null
  } catch (e) {
    return null
  }
}

export async function saveMetasGerais(data: any, id?: string) {
  if (id) {
    return pb.collection('metas_gerais').update(id, data)
  }
  return pb.collection('metas_gerais').create(data)
}

export async function getAllMetasIndividuais() {
  try {
    return await pb.collection('metas_individuais').getFullList({
      expand: 'usuario_id',
    })
  } catch (e) {
    return []
  }
}

export async function saveMetaIndividual(data: any, id?: string) {
  if (id) {
    return pb.collection('metas_individuais').update(id, data)
  }
  return pb.collection('metas_individuais').create(data)
}

export async function deleteMetaIndividual(id: string) {
  return pb.collection('metas_individuais').delete(id)
}

export async function getActualsGerais(mes: number, ano: number) {
  const startDate = new Date(ano, mes - 1, 1).toISOString().split('T')[0]
  const endDate = new Date(ano, mes, 0).toISOString().split('T')[0]

  try {
    const despesas = await pb.collection('processos_despesas').getFullList({
      filter: `processo_id.data_conclusao >= '${startDate} 00:00:00' && processo_id.data_conclusao <= '${endDate} 23:59:59'`,
      expand: 'processo_id',
    })

    let receita = 0
    let custo = 0
    let totalPrazo = 0
    let countPrazo = 0

    despesas.forEach((d: any) => {
      receita += d.total_a_receber || 0
      custo += d.total_a_pagar || 0

      if (d.data_recebimento && d.expand?.processo_id?.data_conclusao) {
        const conclu = new Date(d.expand.processo_id.data_conclusao)
        const receb = new Date(d.data_recebimento)
        const diff = Math.floor((receb.getTime() - conclu.getTime()) / (1000 * 60 * 60 * 24))
        if (diff >= 0) {
          totalPrazo += diff
          countPrazo++
        }
      }
    })

    const margem = receita > 0 ? ((receita - custo) / receita) * 100 : 0
    const prazo = countPrazo > 0 ? Math.round(totalPrazo / countPrazo) : 0

    return { receita, custo, margem: Math.round(margem), prazo }
  } catch (e) {
    return { receita: 0, custo: 0, margem: 0, prazo: 0 }
  }
}

export async function getActualsIndividuais(
  usuario_id: string,
  periodo: string,
  mes_inicio: number,
  ano_inicio: number,
) {
  const startDate = new Date(ano_inicio, mes_inicio - 1, 1)
  let endDate = new Date(ano_inicio, mes_inicio, 0)

  if (periodo === 'trimestral') {
    endDate = new Date(ano_inicio, mes_inicio + 2, 0)
  } else if (periodo === 'anual') {
    endDate = new Date(ano_inicio + 1, mes_inicio - 1, 0)
  }

  const startStr = startDate.toISOString().split('T')[0]
  const endStr = endDate.toISOString().split('T')[0]

  try {
    const processos = await pb.collection('processos_operacionais').getFullList({
      filter: `solicitante_id = '${usuario_id}' && data_conclusao >= '${startStr} 00:00:00' && data_conclusao <= '${endStr} 23:59:59'`,
    })

    const despesas = await pb.collection('processos_despesas').getFullList({
      filter: `processo_id.solicitante_id = '${usuario_id}' && processo_id.data_conclusao >= '${startStr} 00:00:00' && processo_id.data_conclusao <= '${endStr} 23:59:59'`,
    })

    let processosConcluidos = processos.length
    let receita = 0
    let custo = 0

    despesas.forEach((d: any) => {
      receita += d.total_a_receber || 0
      custo += d.total_a_pagar || 0
    })

    const margem = receita > 0 ? ((receita - custo) / receita) * 100 : 0

    return { receita, processos: processosConcluidos, margem: Math.round(margem) }
  } catch (e) {
    return { receita: 0, processos: 0, margem: 0 }
  }
}

export async function getUsersForMetas() {
  try {
    return await pb.collection('users').getFullList({
      filter: "role != 'agente' && status_conta = 'ativo'",
      sort: 'name',
    })
  } catch (e) {
    return []
  }
}
