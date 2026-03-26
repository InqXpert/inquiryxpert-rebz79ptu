import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UseFormReturn } from 'react-hook-form'

interface FormProps {
  form: UseFormReturn<any>
  name: string
  label: string
}

export const FormSelect = ({ form, name, label, options }: FormProps & { options: string[] }) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {label}
        </FormLabel>
        <Select
          onValueChange={field.onChange}
          value={field.value ? String(field.value) : undefined}
        >
          <FormControl>
            <SelectTrigger className="bg-muted/20">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
)

export const FormInput = ({
  form,
  name,
  label,
  uppercase,
}: FormProps & { uppercase?: boolean }) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {label}
        </FormLabel>
        <FormControl>
          <Input
            className="bg-muted/20"
            {...field}
            value={field.value || ''}
            onChange={(e) =>
              field.onChange(uppercase ? e.target.value.toUpperCase() : e.target.value)
            }
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export const FormCombobox = ({
  form,
  name,
  label,
  options,
}: FormProps & { options: { label: string; value: string }[] }) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-col justify-end">
        <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
          {label}
        </FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-between font-normal bg-muted/20 h-11 md:h-10',
                  !field.value && 'text-muted-foreground',
                )}
              >
                {field.value ? options.find((o) => o.value === field.value)?.label : 'Selecione...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Buscar..." />
              <CommandList>
                <CommandEmpty>Nenhum encontrado.</CommandEmpty>
                <CommandGroup>
                  {options.map((o) => (
                    <CommandItem
                      value={o.label}
                      key={o.value}
                      onSelect={() => {
                        form.setValue(name, o.value === field.value ? '' : o.value, {
                          shouldValidate: true,
                        })
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          o.value === field.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {o.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
)
