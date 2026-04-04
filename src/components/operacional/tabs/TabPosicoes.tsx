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
            <div className="w-[8px] h-[8px] rounded-full bg-brand-cyan mt-[6px] z-10 shrink-0 shadow-sm" />

            {/* Vertical connector */}
            {index < posicoes.length - 1 && (
              <div className="absolute left-[3px] top-[14px] w-[2px] h-full bg-brand-teal/20 dark:bg-brand-cyan/20" />
            )}

            <div className="flex flex-col w-full">
              <span className="text-[13px] font-bold text-brand-navy dark:text-white">
                {p.label}
              </span>
              <span className="text-[12px] text-brand-gray dark:text-brand-light mt-[2px]">
                Status Atualizado
              </span>

              {editingPos === p.n ? (
                <div className="flex flex-col gap-2 mt-2 w-full max-w-md animate-in fade-in duration-200">
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Descreva a posição..."
                    className="h-[40px] text-[13px] rounded-[6px] border-brand-teal/20 dark:border-brand-cyan/20 focus-visible:ring-brand-cyan bg-white dark:bg-brand-navy/80"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold h-[32px] px-[16px] shadow-sm"
                      onClick={() => handleSave(p.n)}
                    >
                      Salvar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-[32px] px-[16px] border-brand-teal text-brand-navy dark:text-white"
                      onClick={() => setEditingPos(null)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-1 flex flex-col items-start gap-2">
                  {p.val && (
                    <div className="flex flex-row gap-2 items-center w-full max-w-md animate-in fade-in duration-200">
                      <p className="text-[13px] text-brand-navy dark:text-white p-3 bg-brand-light/30 dark:bg-black/10 rounded-[6px] border border-brand-teal/20 dark:border-brand-cyan/20 flex-1 min-h-[40px]">
                        {p.val}
                      </p>
                      {canAdd && (
                        <div className="flex flex-row gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-[32px] h-[32px] border-brand-teal/20 hover:bg-brand-teal/10 dark:hover:bg-brand-cyan/10 text-brand-gray dark:text-brand-light"
                            onClick={() => handleEdit(p.n, p.val)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-[32px] h-[32px] border-brand-teal/20 hover:bg-brand-coral/10 hover:text-brand-coral hover:border-brand-coral/50 text-brand-gray dark:text-brand-light"
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
                      className="bg-brand-cyan text-brand-navy mt-[12px] hover:bg-brand-cyan/90 font-bold h-[32px] px-[16px] shadow-sm animate-in fade-in duration-200"
                      onClick={() => handleEdit(p.n, '')}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Adicionar Posição
                    </Button>
                  )}
                  {!p.val && !canAdd && (
                    <span className="text-[13px] text-brand-gray dark:text-brand-light italic mt-2">
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
