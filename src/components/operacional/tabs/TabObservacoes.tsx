import { ProcessoOperacional } from '@/types'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Pencil } from 'lucide-react'

interface Props {
  processo: ProcessoOperacional
  canAdd: boolean
  onAdd: (text: string) => void
}

export function TabObservacoes({ processo, canAdd, onAdd }: Props) {
  const [text, setText] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const handleSave = () => {
    if (!text.trim()) return
    onAdd(text)
    setText('')
    setIsAdding(false)
  }

  return (
    <div className="pt-2 relative">
      {canAdd && !isAdding && (
        <Button
          variant="outline"
          size="sm"
          className="absolute right-0 -top-[52px] z-10 text-[13px] h-[32px] border-brand-teal text-brand-navy dark:text-white"
          onClick={() => setIsAdding(true)}
        >
          <Pencil className="w-3 h-3 mr-2" /> Editar
        </Button>
      )}

      {isAdding && (
        <div className="flex flex-col gap-3 mb-[24px] animate-in fade-in duration-200">
          <textarea
            placeholder="Digite aqui para adicionar ao histórico de observações..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] border border-brand-teal/20 dark:border-brand-cyan/20 rounded-[6px] p-[12px] text-[13px] resize-y bg-white dark:bg-brand-navy/80 text-brand-navy dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan placeholder:text-brand-gray/50 dark:placeholder:text-brand-light/50"
          />
          <div className="flex justify-end gap-[12px]">
            <Button
              variant="outline"
              className="h-[40px] px-[20px] border-brand-teal text-brand-navy dark:text-white"
              onClick={() => setIsAdding(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold h-[40px] px-[20px] shadow-sm"
              onClick={handleSave}
              disabled={!text.trim()}
            >
              Salvar Observação
            </Button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <h4 className="text-[13px] font-bold text-brand-navy dark:text-white mb-3">
          Histórico de Observações
        </h4>
        <div className="p-[12px] bg-brand-light/30 dark:bg-black/10 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-[6px] min-h-[200px] whitespace-pre-wrap text-[13px] text-brand-navy dark:text-white">
          {processo.observacoes || (
            <span className="text-brand-gray dark:text-brand-light italic">
              Nenhuma observação registrada.
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
