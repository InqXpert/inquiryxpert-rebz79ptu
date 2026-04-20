import { useState, useEffect } from 'react'
import { startOfDay, addDays, isBefore, isAfter } from 'date-fns'
import pb from '@/lib/pocketbase/client'
import { useToast } from '@/hooks/use-toast'

export function useInteractiveCalendar(userId?: string) {
  const [processes, setProcesses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const { toast } = useToast()

  useEffect(() => {
    if (!userId) return

    const fetchProcesses = async () => {
      try {
        setLoading(true)
        const res = await pb.collection('processos_operacionais').getFullList({
          filter: `agente_id.user_id = "${userId}" || user_id = "${userId}"`,
        })
        setProcesses(res)
      } catch (error) {
        console.error('Error fetching processes for calendar:', error)
        toast({
          title: 'Erro',
          description: 'Nao foi possivel carregar prazos',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProcesses()
  }, [userId, toast])

  const today = startOfDay(new Date())
  const plus7 = addDays(today, 7)
  const plus30 = addDays(today, 30)

  const overdueDates: Date[] = []
  const shortTermDates: Date[] = []
  const longTermDates: Date[] = []

  const processesByDate = new Map<
    number,
    { prazo: Date; overdue: boolean; short: boolean; long: boolean }
  >()

  processes.forEach((p) => {
    if (!p.data_prazo) return
    const status = p.status?.toUpperCase() || ''
    if (status === 'CONCLUIDO' || status === 'FINALIZADO') return

    const prazo = startOfDay(new Date(p.data_prazo))
    const time = prazo.getTime()

    if (!processesByDate.has(time)) {
      processesByDate.set(time, { prazo, overdue: false, short: false, long: false })
    }

    const entry = processesByDate.get(time)!
    if (isBefore(prazo, today)) entry.overdue = true
    else if (!isBefore(prazo, today) && !isAfter(prazo, plus7)) entry.short = true
    else if (isAfter(prazo, plus7) && !isAfter(prazo, plus30)) entry.long = true
  })

  processesByDate.forEach((entry) => {
    if (entry.overdue) overdueDates.push(entry.prazo)
    else if (entry.short) shortTermDates.push(entry.prazo)
    else if (entry.long) longTermDates.push(entry.prazo)
  })

  return {
    selectedDate,
    setSelectedDate,
    processes,
    loading,
    overdueDates,
    shortTermDates,
    longTermDates,
  }
}
