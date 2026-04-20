import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
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
    <Card className="shadow-sm overflow-hidden border-none ring-1 ring-border">
      <CardHeader className="p-4 border-b bg-card">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" /> Calendário
        </CardTitle>
      </CardHeader>
      <div className="p-3 flex justify-center bg-card min-h-[300px]">
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
            className="rounded-md pointer-events-auto"
            modifiers={{
              overdue: overdueDates,
              shortTerm: shortTermDates,
              longTerm: longTermDates,
            }}
            modifiersClassNames={{
              overdue:
                "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-red-500 after:rounded-full",
              shortTerm:
                "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-yellow-500 after:rounded-full",
              longTerm:
                "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-orange-500 after:rounded-full",
            }}
          />
        )}
      </div>
      <div className="p-4 border-t bg-muted/40 max-h-[250px] overflow-y-auto">
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
    </Card>
  )
}
