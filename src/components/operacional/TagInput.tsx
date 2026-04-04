import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X, Plus } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { getTagColor } from '@/services/processosService'
import { cn } from '@/lib/utils'

const SUGGESTIONS = ['Urgente', 'Documentação Pendente', 'Aguardando Terceiro', 'Em Análise']

export function TagInput({
  tags = [],
  onChange,
}: {
  tags: string[]
  onChange: (tags: string[]) => void
}) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleAdd = (tag: string) => {
    const trimmed = tag.trim()
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed])
    }
    setInputValue('')
  }

  const handleRemove = (tag: string) => {
    onChange(tags.filter((t) => t !== tag))
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-wrap gap-2 min-h-[44px] items-center border border-brand-teal/20 dark:border-brand-cyan/20 rounded-[6px] p-2 bg-white dark:bg-brand-navy/80 focus-within:ring-2 focus-within:ring-brand-cyan transition-all">
        {tags.map((tag) => (
          <Badge
            key={tag}
            className={cn('flex items-center gap-1 text-[11px] px-2 py-0.5', getTagColor(tag))}
          >
            {tag}
            <div
              role="button"
              tabIndex={0}
              className="hover:bg-black/20 rounded-full p-0.5 transition-colors cursor-pointer ml-1"
              onClick={(e) => {
                e.stopPropagation()
                handleRemove(tag)
              }}
            >
              <X className="w-3 h-3" />
            </div>
          </Badge>
        ))}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-[12px] text-brand-gray hover:text-brand-navy dark:hover:text-white ml-auto sm:ml-0"
            >
              <Plus className="w-3 h-3 mr-1" /> Adicionar Tag
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-0" align="start">
            <Command>
              <CommandInput
                placeholder="Buscar ou criar tag..."
                value={inputValue}
                onValueChange={setInputValue}
              />
              <CommandList>
                <CommandEmpty>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm px-2 font-normal text-brand-cyan"
                    onClick={() => {
                      handleAdd(inputValue)
                      setOpen(false)
                    }}
                  >
                    Criar "{inputValue}"
                  </Button>
                </CommandEmpty>
                <CommandGroup heading="Sugestões">
                  {SUGGESTIONS.filter((s) => !tags.includes(s)).map((s) => (
                    <CommandItem
                      key={s}
                      onSelect={() => {
                        handleAdd(s)
                        setOpen(false)
                      }}
                    >
                      {s}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
