import { ProcessoOperacional } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

interface Props {
  processo: ProcessoOperacional
  canEdit: boolean
  onSave: (data: Partial<ProcessoOperacional>) => void
}

export function TabInformacoesGerais({ processo, canEdit, onSave }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<ProcessoOperacional>>(processo)

  const handleChange = (field: keyof ProcessoOperacional, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave(formData)
    setIsEditing(false)
  }

  const fields = [
    { key: 'numero_controle', label: 'Número Controle' },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: ['em_elaboracao', 'em_execucao', 'finalizado', 'cancelado', 'analise_inicial'],
    },
    { key: 'cia', label: 'Seguradora' },
    { key: 'tipo_servico', label: 'Tipo de Serviço' },
    { key: 'local_sinistro', label: 'Local Sinistro' },
    { key: 'agente_prestador', label: 'Agente Prestador' },
    { key: 'data_entrada', label: 'Data Entrada', type: 'date' },
    { key: 'dias_uteis', label: 'Dias Úteis', type: 'number' },
    { key: 'data_retorno', label: 'Data Retorno', type: 'date' },
    { key: 'data_saida', label: 'Data Saída', type: 'date' },
    {
      key: 'resultado',
      label: 'Resultado',
      type: 'select',
      options: ['regular', 'irregular', 'analise', 'cancelado'],
    },
    { key: 'dias_totais', label: 'Dias Totais', type: 'number' },
    { key: 'controle_cia', label: 'Controle Cia' },
    { key: 'nome_segurado', label: 'Nome Segurado' },
    { key: 'placas_veiculos', label: 'Placas Veículos' },
    { key: 'analista_solicitante', label: 'Analista Solicitante' },
    { key: 'revisor', label: 'Revisor' },
  ]

  return (
    <div className="space-y-6 pt-4 animate-in fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Dados Cadastrais
        </h3>
        {canEdit && !isEditing && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Editar Dados
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {fields.map((f) => (
          <div key={f.key} className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground font-medium">{f.label}</span>
            {isEditing ? (
              f.type === 'select' ? (
                <Select
                  value={(formData as any)[f.key] || ''}
                  onValueChange={(v) => handleChange(f.key as any, v)}
                >
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {f.options?.map((opt) => (
                      <SelectItem key={opt} value={opt} className="capitalize">
                        {opt.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={f.type || 'text'}
                  className="h-9 text-sm"
                  value={(formData as any)[f.key] || ''}
                  onChange={(e) => handleChange(f.key as any, e.target.value)}
                />
              )
            ) : (
              <span className="text-sm font-medium text-foreground capitalize">
                {(processo as any)[f.key]
                  ? String((processo as any)[f.key]).replace('_', ' ')
                  : '-'}
              </span>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="flex justify-end gap-3 pt-4 border-t mt-6">
          <Button
            variant="ghost"
            onClick={() => {
              setIsEditing(false)
              setFormData(processo)
            }}
          >
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </div>
      )}
    </div>
  )
}
