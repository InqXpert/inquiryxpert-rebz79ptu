import pb from '@/lib/pocketbase/client'
import { Alerta } from '@/types/alerta'
import { differenceInDays } from 'date-fns'

export const fetchAlertas = async () => {
  return await pb.collection('processos_operacionais').getFullList({
    filter: "status != 'FINALIZADO'",
    expand: 'supervisor_id,seguradora_id',
  })
}

export const calculateAlertLevel = (
  processos: any[],
  userId: string,
  userRole: string,
): Alerta[] => {
  const alertas: Alerta[] = []
  const today = new Date()

  const platesMap = new Map<string, any[]>()
  for (const p of processos) {
    if (p.placas_veiculos) {
      const plates = p.placas_veiculos
        .split(',')
        .map((s: string) => s.trim().toUpperCase())
        .filter(Boolean)
      for (const plate of plates) {
        if (!platesMap.has(plate)) platesMap.set(plate, [])
        platesMap.get(plate)!.push(p)
      }
    }
  }

  for (const p of processos) {
    if (userRole === 'supervisor' && p.supervisor_id !== userId) {
      continue
    }

    const baseAlerta = {
      processoId: p.id,
      numeroProcesso: p.numero_processo || p.numero_controle || 'S/N',
      supervisorId: p.supervisor_id || '',
      seguradoraId: p.seguradora_id || '',
      expand: p.expand,
    }

    const dataRefStr = p.data_saida || p.data_prazo
    if (dataRefStr) {
      const dueDate = new Date(dataRefStr)
      if (!isNaN(dueDate.getTime())) {
        const diff = differenceInDays(dueDate, today)
        if (diff < 0) {
          alertas.push({
            ...baseAlerta,
            id: `${p.id}-VENCIDO`,
            tipo: 'VENCIDO',
            mensagem: `Processo vencido há ${Math.abs(diff)} dias. Ação imediata necessária.`,
            severidade: 5,
            corTexto: 'text-red-600 dark:text-red-500',
            corFundo: 'bg-red-50 dark:bg-red-950/20',
            corBorda: 'border-red-600 dark:border-red-500',
            data: dataRefStr,
          })
        } else if (diff >= 0 && diff <= 3) {
          alertas.push({
            ...baseAlerta,
            id: `${p.id}-PROXIMO_VENCIMENTO`,
            tipo: 'PROXIMO_VENCIMENTO',
            mensagem: `Processo vence em ${diff} dias. Atenção necessária.`,
            severidade: 4,
            corTexto: 'text-orange-600 dark:text-orange-500',
            corFundo: 'bg-orange-50 dark:bg-orange-950/20',
            corBorda: 'border-orange-600 dark:border-orange-500',
            data: dataRefStr,
          })
        }
      }
    }

    if (p.updated) {
      const updatedDate = new Date(p.updated)
      const diffUpdated = differenceInDays(today, updatedDate)
      if (diffUpdated > 3) {
        alertas.push({
          ...baseAlerta,
          id: `${p.id}-SEM_ATUALIZACAO`,
          tipo: 'SEM_ATUALIZACAO',
          mensagem: `Processo sem atualização há ${diffUpdated} dias. Acompanhamento necessário.`,
          severidade: 3,
          corTexto: 'text-yellow-600 dark:text-yellow-500',
          corFundo: 'bg-yellow-50 dark:bg-yellow-950/20',
          corBorda: 'border-yellow-600 dark:border-yellow-500',
          data: p.updated,
        })
      }
    }

    const st = (p.status || '').toUpperCase()
    const relSt = (p.relatorio_status || '').toUpperCase()
    if (st === 'EM_ELABORACAO' && relSt !== 'ENVIADO' && relSt !== 'APROVADO') {
      alertas.push({
        ...baseAlerta,
        id: `${p.id}-AGUARDANDO_RELATORIO`,
        tipo: 'AGUARDANDO_RELATORIO',
        mensagem: `Processo aguardando relatório. Envie o relatório para continuar.`,
        severidade: 2,
        corTexto: 'text-blue-600 dark:text-blue-500',
        corFundo: 'bg-blue-50 dark:bg-blue-950/20',
        corBorda: 'border-blue-600 dark:border-blue-500',
        data: p.updated,
      })
    }

    if (p.placas_veiculos) {
      const plates = p.placas_veiculos
        .split(',')
        .map((s: string) => s.trim().toUpperCase())
        .filter(Boolean)
      for (const plate of plates) {
        const others = platesMap.get(plate)?.filter((op) => op.id !== p.id) || []
        if (others.length > 0) {
          alertas.push({
            ...baseAlerta,
            id: `${p.id}-DUPLICADO-${others[0].id}`,
            tipo: 'DUPLICADO',
            mensagem: `Placa ${plate} duplicada. Verificar possível duplicidade com o processo ${others[0].numero_processo || others[0].numero_controle}.`,
            severidade: 1,
            corTexto: 'text-purple-600 dark:text-purple-500',
            corFundo: 'bg-purple-50 dark:bg-purple-950/20',
            corBorda: 'border-purple-600 dark:border-purple-500',
            data: p.updated,
            relacionadoId: others[0].id,
          })
          break
        }
      }
    }
  }

  return alertas.sort((a, b) => b.severidade - a.severidade)
}

export const dismissAlert = (id: string) => {
  const dismissed = JSON.parse(localStorage.getItem('dismissedAlerts') || '[]')
  if (!dismissed.includes(id)) {
    dismissed.push(id)
    localStorage.setItem('dismissedAlerts', JSON.stringify(dismissed))
  }
}

export const markAsResolved = async (processoId: string, updates: any) => {
  return await pb.collection('processos_operacionais').update(processoId, updates)
}
