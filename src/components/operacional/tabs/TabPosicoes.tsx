import { ProcessoOperacional } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface Props {
  processo: ProcessoOperacional
  canAdd: boolean
  onAdd: (posicaoNumber: number, text: string) => void
}

export function TabPosicoes({ processo, canAdd, onAdd }: Props) {
  const [editingPos, setEditingPos] = useState<number | null>(null)
  const [text, setText] = useState('')

  const handleEdit = (n: number, val: string) => {
    setEditingPos(n)
    setText(val)
  }

  const handleSave = (n: number) => {
    onAdd(n, text)
    setEditingPos(null)
  }

  const posicoes = [
    { n: 1, label: 'Posição 1', val: processo.posicao_1 },
    { n: 2, label: 'Posição 2', val: processo.posicao_2 },
    { n: 3, label: 'Posição 3', val: processo.posicao_3 },
  ]

  return (
    <div className="space-y-6 pt-4 animate-in fade-in pl-2">
      <div className="relative border-l-2 border-muted ml-3 space-y-8 pb-4">
        {posicoes.map((p) => (
          <div key={p.n} className="relative pl-6">
            <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 ring-4 ring-background" />
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase">
                {p.label}
              </span>
              {editingPos === p.n ? (
                <div className="flex flex-col gap-2 w-full max-w-md">
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Descreva a posição..."
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleSave(p.n)}>
                      Salvar
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingPos(null)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 items-start">
                  <p className="text-sm text-foreground bg-muted/50 p-3 rounded-md w-full max-w-md border">
                    {p.val || (
                      <span className="text-muted-foreground italic">
                        Aguardando preenchimento...
                      </span>
                    )}
                  </p>
                  {canAdd && (
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-xs text-primary"
                      onClick={() => handleEdit(p.n, p.val)}
                    >
                      {p.val ? 'Editar Posição' : 'Adicionar Posição'}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
