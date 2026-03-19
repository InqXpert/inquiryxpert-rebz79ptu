import { ProcessoOperacional } from '@/types'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

interface Props {
  processo: ProcessoOperacional
  canAdd: boolean
  onAdd: (text: string) => void
}

export function TabObservacoes({ processo, canAdd, onAdd }: Props) {
  const [text, setText] = useState('')

  const handleSave = () => {
    if (!text.trim()) return
    onAdd(text)
    setText('')
  }

  return (
    <div className="space-y-6 pt-4 animate-in fade-in flex flex-col h-full">
      <div className="flex-1 bg-muted/30 border rounded-xl p-4 min-h-[200px] overflow-y-auto whitespace-pre-wrap text-sm text-foreground">
        {processo.observacoes || (
          <span className="text-muted-foreground italic">Nenhuma observação registrada.</span>
        )}
      </div>

      {canAdd && (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold text-muted-foreground uppercase">
            Nova Observação
          </span>
          <Textarea
            placeholder="Digite aqui para adicionar ao histórico de observações..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="resize-y min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={!text.trim()}>
              Adicionar Observação
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
