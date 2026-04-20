import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Calendar } from '@/components/ui/calendar'
import { Skeleton } from '@/components/ui/skeleton'
import { useInteractiveCalendar } from '@/hooks/use-interactive-calendar'
import { useCurrentUser } from '@/hooks/use-current-user'

export function InteractiveCalendar() {
  const { user } = useCurrentUser()
  const {
    selectedDate,
    setSelectedDate,
    processes,
    loading,
    overdueDates,
    shortTermDates,
    longTermDates,
  } = useInteractiveCalendar(user?.id)

  const dateProcesses = selectedDate
    ? processes.filter((p) => {
        if (!p.data_prazo) return false
        const pd = new Date(p.data_prazo)
        return (
          pd.getDate() === selectedDate.getDate() &&
          pd.getMonth() === selectedDate.getMonth() &&
          pd.getFullYear() === selectedDate.getFullYear()
        )
      })
    : []

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm mb-4">
      <div className="text-lg font-semibold text-foreground flex items-center justify-center gap-2 mb-4">
        <CalendarIcon className="w-5 h-5" /> Calendário
      </div>
      <div className="flex justify-center min-h-[300px]">
        {loading && processes.length === 0 ? (
          <div className="flex items-center justify-center w-full">
            <Skeleton className="w-[280px] h-[280px] rounded-md" />
          </div>
        ) : (
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={ptBR}
            formatters={{
              formatWeekdayName: (date) => {
                const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
                return days[date.getDay()]
              },
              formatCaption: (month) => {
                const m = format(month, 'MMMM yyyy', { locale: ptBR })
                return m.charAt(0).toUpperCase() + m.slice(1)
              },
            }}
            className="pointer-events-auto"
            modifiers={{
              overdue: overdueDates,
              shortTerm: shortTermDates,
              longTerm: longTermDates,
            }}
            modifiersClassNames={{
              overdue:
                "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-2 after:h-2 after:bg-destructive after:rounded-full",
              shortTerm:
                "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-2 after:h-2 after:bg-accent after:rounded-full",
              longTerm:
                "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-2 after:h-2 after:bg-orange-500 after:rounded-full",
            }}
          />
        )}
      </div>
      <div className="pt-4 border-t border-border max-h-[250px] overflow-y-auto mt-2">
        <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          {selectedDate ? `Processos para ${format(selectedDate, 'dd/MM')}` : 'Selecione uma data'}
        </h4>
        {dateProcesses.length === 0 ? (
          <p className="text-sm text-muted-foreground/80 py-2 text-center">
            Nenhum prazo neste dia.
          </p>
        ) : (
          <ul className="space-y-2">
            {dateProcesses.map((p) => (
              <li
                key={p.id}
                className="text-sm flex flex-col gap-1 bg-background p-2.5 rounded-md border shadow-sm hover:border-primary/30 transition-colors"
              >
                <Link
                  to={`/processos/${p.id}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {p.numero_controle || p.numero_processo || 'Processo sem número'}
                </Link>
                <span className="text-xs text-muted-foreground font-medium">{p.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
