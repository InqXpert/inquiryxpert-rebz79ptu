import { memo, useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Calendar } from '@/components/ui/calendar'
import { Skeleton } from '@/components/ui/skeleton'
import { useInteractiveCalendar } from '@/hooks/use-interactive-calendar'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useHubPage } from '@/contexts/hub-page-context'

export const InteractiveCalendar = memo(function InteractiveCalendar() {
  const { user } = useCurrentUser()
  const { selectedDate: contextDate, setSelectedDate: setContextDate } = useHubPage()
  const [localDate, setLocalDate] = useState<Date | undefined>(contextDate)

  const { processes, loading, overdueDates, shortTermDates, longTermDates, error } =
    useInteractiveCalendar(user?.id)

  if (error) {
    throw error
  }

  // Debounce context update by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localDate?.getTime() !== contextDate?.getTime()) {
        setContextDate(localDate)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [localDate, contextDate, setContextDate])

  const dateProcesses = localDate
    ? processes.filter((p) => {
        if (!p.data_prazo) return false
        const pd = new Date(p.data_prazo)
        return (
          pd.getDate() === localDate.getDate() &&
          pd.getMonth() === localDate.getMonth() &&
          pd.getFullYear() === localDate.getFullYear()
        )
      })
    : []

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border border-border mb-4 transition-all duration-200 ease-in-out hover:shadow-md h-full flex flex-col">
      <div className="text-lg font-semibold text-foreground flex items-center justify-center gap-2 mb-4 shrink-0">
        <CalendarIcon className="w-5 h-5" /> Calendário
      </div>

      <div className="flex justify-center min-h-[300px] shrink-0 w-full px-2">
        {loading && processes.length === 0 ? (
          <div className="flex items-center justify-center w-full">
            <Skeleton className="w-full max-w-[280px] h-[280px] rounded-md" />
          </div>
        ) : (
          <Calendar
            mode="single"
            selected={localDate}
            onSelect={setLocalDate}
            locale={ptBR}
            formatters={{
              formatWeekdayName: (date) => {
                const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']
                return days[date.getDay()]
              },
              formatCaption: (month) => {
                const m = format(month, 'MMMM yyyy', { locale: ptBR })
                return m.charAt(0).toUpperCase() + m.slice(1)
              },
            }}
            className="pointer-events-auto flex flex-col w-full items-center"
            classNames={{
              root: 'flex flex-col w-full',
              months: 'flex flex-col w-full',
              month: 'space-y-4 w-full flex flex-col',
              caption: 'contents',
              caption_label:
                'text-lg font-semibold capitalize pt-1 w-full text-center order-1 mb-2',
              nav: 'flex items-center justify-center gap-6 order-3 mt-4 w-full !space-x-0',
              nav_button:
                'h-9 w-14 bg-background border border-input rounded-md flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-200 ease-in-out',
              nav_button_previous: 'static',
              nav_button_next: 'static',
              table: 'w-full border-collapse order-2',
              head_row: 'grid grid-cols-7 w-full mb-2',
              head_cell:
                'text-muted-foreground font-semibold text-xs text-center flex items-center justify-center',
              row: 'grid grid-cols-7 w-full mt-1',
              cell: 'text-center text-sm relative p-0 flex items-center justify-center focus-within:relative focus-within:z-20',
              day: 'h-8 w-8 sm:h-9 sm:w-9 rounded-md p-0 font-normal hover:bg-secondary transition-all duration-200 ease-in-out aria-selected:opacity-100 flex items-center justify-center mx-auto',
              day_selected:
                'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
              day_today: 'bg-accent text-accent-foreground',
              day_outside: 'text-muted-foreground opacity-50',
              day_disabled: 'text-muted-foreground opacity-50',
              day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
              day_hidden: 'invisible',
            }}
            modifiers={{
              overdue: overdueDates,
              shortTerm: shortTermDates,
              longTerm: longTermDates,
            }}
            modifiersClassNames={{
              overdue:
                "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-destructive after:rounded-full",
              shortTerm:
                "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-accent after:rounded-full",
              longTerm:
                "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-orange-500 after:rounded-full",
            }}
          />
        )}
      </div>

      <div className="pt-4 border-t border-border overflow-y-auto mt-2 flex-1 w-full px-2">
        <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          {localDate ? `Processos para ${format(localDate, 'dd/MM')}` : 'SELECIONE UMA DATA'}
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
                className="text-sm flex flex-col gap-1 bg-background p-2.5 rounded-md border border-border shadow-sm hover:border-primary/30 transition-all duration-200 ease-in-out"
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
})
