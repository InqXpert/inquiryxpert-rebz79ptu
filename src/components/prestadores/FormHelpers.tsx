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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
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
      render={({ field }) => {
        const inputNode = (
          <Input
            placeholder={placeholder}
            type={type}
            {...field}
            value={field.value ?? ''}
            className={cn(
              isImported &&
                'border-l-[3px] border-l-green-500 bg-green-50/40 transition-opacity duration-300 animate-in fade-in',
            )}
          />
        )
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            {isImported ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative w-full">
                    <FormControl>{inputNode}</FormControl>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-foreground text-background text-[11px] rounded-md px-[8px] py-[4px]">
                  <p>Preenchido automaticamente via planilha</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <FormControl>{inputNode}</FormControl>
            )}
            <FormMessage />
          </FormItem>
        )
      }}
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
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              {isImported ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative w-full">
                      <FormControl>
                        <SelectTrigger className="border-l-[3px] border-l-green-500 bg-green-50/40 transition-opacity duration-300 animate-in fade-in">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-foreground text-background text-[11px] rounded-md px-[8px] py-[4px]">
                    <p>Preenchido automaticamente via planilha</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
              )}
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
        )
      }}
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
      render={({ field }) => {
        const textareaNode = (
          <Textarea
            placeholder={placeholder}
            {...field}
            value={field.value ?? ''}
            className={cn(
              isImported &&
                'border-l-[3px] border-l-green-500 bg-green-50/40 transition-opacity duration-300 animate-in fade-in',
            )}
          />
        )
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            {isImported ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative w-full">
                    <FormControl>{textareaNode}</FormControl>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-foreground text-background text-[11px] rounded-md px-[8px] py-[4px]">
                  <p>Preenchido automaticamente via planilha</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <FormControl>{textareaNode}</FormControl>
            )}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
