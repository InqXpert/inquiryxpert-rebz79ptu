import * as React from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-background group/calendar p-4 flex flex-col w-full h-full [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('flex flex-col w-full h-full min-h-[350px]', defaultClassNames.root),
        months: cn('relative flex flex-col gap-4 md:flex-row flex-1', defaultClassNames.months),
        month: cn('flex w-full flex-col gap-4 flex-1', defaultClassNames.month),
        nav: cn(
          'flex w-full items-center justify-between gap-2 order-last mt-auto pt-4 border-t border-border/40',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'h-10 px-6 flex items-center justify-center gap-2 select-none aria-disabled:opacity-50 text-brand-navy hover:text-brand-cyan hover:bg-brand-cyan/10 transition-colors border border-border/50 rounded-md',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'h-10 px-6 flex items-center justify-center gap-2 select-none aria-disabled:opacity-50 text-brand-navy hover:text-brand-cyan hover:bg-brand-cyan/10 transition-colors border border-border/50 rounded-md',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex h-10 w-full items-center justify-center font-bold text-lg text-brand-navy mb-1',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'flex h-10 w-full items-center justify-center gap-1.5 text-sm font-medium',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          'has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border',
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn('absolute inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'select-none font-semibold text-lg text-brand-navy',
          captionLayout === 'label'
            ? ''
            : '[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 [&>svg]:size-3.5',
          defaultClassNames.caption_label,
        ),
        table:
          'w-full h-full border-collapse flex flex-col [&>tbody]:flex [&>tbody]:flex-col [&>tbody]:flex-1 [&>tbody]:justify-between [&>tbody]:gap-1 [&>thead]:flex [&>thead]:w-full',
        weekdays: cn('flex w-full mb-2', defaultClassNames.weekdays),
        weekday: cn(
          'text-muted-foreground flex-1 select-none rounded-md text-xs font-bold text-center uppercase tracking-wider',
          defaultClassNames.weekday,
        ),
        week: cn('flex w-full flex-1 gap-1', defaultClassNames.week),
        week_number_header: cn('w-10 select-none', defaultClassNames.week_number_header),
        week_number: cn(
          'text-muted-foreground select-none text-[0.8rem]',
          defaultClassNames.week_number,
        ),
        day: cn(
          'group/day relative flex flex-1 items-center justify-center select-none p-0 text-center text-sm font-medium text-foreground [&:first-child[data-selected=true]_button]:rounded-full [&:last-child[data-selected=true]_button]:rounded-full',
          defaultClassNames.day,
        ),
        range_start: cn('bg-brand-cyan text-white rounded-full', defaultClassNames.range_start),
        range_middle: cn(
          'bg-brand-cyan/10 text-brand-navy rounded-full',
          defaultClassNames.range_middle,
        ),
        range_end: cn('bg-brand-cyan text-white rounded-full', defaultClassNames.range_end),
        today: cn(
          'bg-brand-cyan/10 text-brand-cyan font-bold rounded-full data-[selected=true]:rounded-full',
          defaultClassNames.today,
        ),
        outside: cn(
          'text-muted-foreground/50 aria-selected:text-muted-foreground',
          defaultClassNames.outside,
        ),
        disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return <ChevronLeftIcon className={cn('size-5', className)} {...props} />
          }

          if (orientation === 'right') {
            return <ChevronRightIcon className={cn('size-5', className)} {...props} />
          }

          return <ChevronDownIcon className={cn('size-5', className)} {...props} />
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-full items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'data-[selected-single=true]:bg-brand-cyan data-[selected-single=true]:text-white data-[range-middle=true]:bg-brand-cyan/10 data-[range-middle=true]:text-brand-navy data-[range-start=true]:bg-brand-cyan data-[range-start=true]:text-white data-[range-end=true]:bg-brand-cyan data-[range-end=true]:text-white group-data-[focused=true]/day:border-brand-cyan group-data-[focused=true]/day:ring-brand-cyan/50 flex w-full h-full min-h-[3rem] flex-col gap-1 font-medium text-sm leading-none rounded-md hover:bg-brand-cyan/10 hover:text-brand-navy cursor-pointer group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70 text-foreground transition-all',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
