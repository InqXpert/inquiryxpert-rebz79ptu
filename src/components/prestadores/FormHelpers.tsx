import React, { createContext, useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export const ImportedFieldsContext = createContext<string[]>([])

interface FieldProps {
  name: string
  label: string
  placeholder?: string
}

export function FInput({
  name,
  label,
  placeholder,
  type = 'text',
}: FieldProps & { type?: string }) {
  const { control } = useFormContext()
  const importedFields = useContext(ImportedFieldsContext)
  const isImported = importedFields.includes(name)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              {...field}
              value={field.value ?? ''}
              className={cn(isImported && 'border-l-4 border-l-green-500 bg-green-50/10')}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function FSelect({
  name,
  label,
  options,
}: FieldProps & { options: { label: string; value: string }[] }) {
  const { control } = useFormContext()
  const importedFields = useContext(ImportedFieldsContext)
  const isImported = importedFields.includes(name)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                className={cn(isImported && 'border-l-4 border-l-green-500 bg-green-50/10')}
              >
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function FSimNao({ name, label }: FieldProps) {
  return (
    <FSelect
      name={name}
      label={label}
      options={[
        { label: 'Sim', value: 'Sim' },
        { label: 'Não', value: 'Não' },
      ]}
    />
  )
}

export function FTextarea({ name, label, placeholder }: FieldProps) {
  const { control } = useFormContext()
  const importedFields = useContext(ImportedFieldsContext)
  const isImported = importedFields.includes(name)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              value={field.value ?? ''}
              className={cn(isImported && 'border-l-4 border-l-green-500 bg-green-50/10')}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
