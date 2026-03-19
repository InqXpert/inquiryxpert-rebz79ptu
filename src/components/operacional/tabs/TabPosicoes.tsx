import { ProcessoOperacional } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'

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

  const handleDelete = (n: number) => {
    onAdd(n, '')
  }

  const posicoes = [
    { n: 1, label: 'Posição 1', val: processo.posicao_1 },
    { n: 2, label: 'Posição 2', val: processo.posicao_2 },
    { n: 3, label: 'Posição 3', val: processo.posicao_3 },
  ]

  return (
    <div className="pt-2">
      <div className="space-y-0 relative">
        {posicoes.map((p, index) => (
          <div key={p.n} className="flex flex-row gap-[12px] pb-[16px] relative">
            {/* Timeline dot */}
            <div className="w-[8px] h-[8px] rounded-full bg-[hsl(210_60%_25%)] mt-[6px] z-10 shrink-0" />

            {/* Vertical connector */}
            {index < posicoes.length - 1 && (
              <div className="absolute left-[3px] top-[14px] w-[2px] h-full bg-border" />
            )}

            <div className="flex flex-col w-full">
              <span className="text-[13px] font-medium text-foreground">{p.label}</span>
              <span className="text-[12px] text-muted-foreground mt-[2px]">Status Atualizado</span>

              {editingPos === p.n ? (
                <div className="flex flex-col gap-2 mt-2 w-full max-w-md">
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Descreva a posição..."
                    className="h-[40px] text-[13px] rounded-[6px]"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-[hsl(210_60%_25%)] text-white hover:bg-[hsl(210_60%_35%)] h-[32px] px-[16px]"
                      onClick={() => handleSave(p.n)}
                    >
                      Salvar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-[32px] px-[16px]"
                      onClick={() => setEditingPos(null)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-1 flex flex-col items-start gap-2">
                  {p.val && (
                    <div className="flex flex-row gap-2 items-center w-full max-w-md">
                      <p className="text-[13px] text-foreground p-3 bg-muted/50 rounded-[6px] border border-border flex-1 min-h-[40px]">
                        {p.val}
                      </p>
                      {canAdd && (
                        <div className="flex flex-row gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-[32px] h-[32px]"
                            onClick={() => handleEdit(p.n, p.val)}
                          >
                            <Pencil className="w-4 h-4 text-muted-foreground" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-[32px] h-[32px] hover:text-destructive hover:border-destructive"
                            onClick={() => handleDelete(p.n)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {!p.val && canAdd && (
                    <Button
                      size="sm"
                      className="bg-[hsl(210_60%_25%)] text-white mt-[12px] hover:bg-[hsl(210_60%_35%)] h-[32px] px-[16px]"
                      onClick={() => handleEdit(p.n, '')}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Adicionar Posição
                    </Button>
                  )}
                  {!p.val && !canAdd && (
                    <span className="text-[13px] text-muted-foreground italic mt-2">
                      Aguardando preenchimento...
                    </span>
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
