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
import { Pencil } from 'lucide-react'

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
    <div className="pt-2 relative">
      {canEdit && !isEditing && (
        <Button
          variant="outline"
          size="sm"
          className="absolute right-0 -top-[52px] z-10 text-[13px] h-[32px]"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="w-3 h-3 mr-2" /> Editar
        </Button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        {fields.map((f) => (
          <div key={f.key} className="flex flex-col gap-[4px]">
            <span className="text-[12px] font-medium text-muted-foreground">{f.label}</span>
            {isEditing ? (
              f.type === 'select' ? (
                <Select
                  value={(formData as any)[f.key] || ''}
                  onValueChange={(v) => handleChange(f.key as any, v)}
                >
                  <SelectTrigger className="h-[40px] text-[13px] rounded-[6px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {f.options?.map((opt) => (
                      <SelectItem key={opt} value={opt} className="capitalize text-[13px]">
                        {opt.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={f.type || 'text'}
                  className="h-[40px] text-[13px] rounded-[6px]"
                  value={(formData as any)[f.key] || ''}
                  onChange={(e) => handleChange(f.key as any, e.target.value)}
                />
              )
            ) : (
              <span className="text-[13px] text-foreground capitalize">
                {(processo as any)[f.key]
                  ? String((processo as any)[f.key]).replace('_', ' ')
                  : '-'}
              </span>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="flex flex-row gap-[12px] justify-end mt-[24px]">
          <Button
            variant="outline"
            className="h-[40px] px-[20px]"
            onClick={() => {
              setIsEditing(false)
              setFormData(processo)
            }}
          >
            Cancelar
          </Button>
          <Button
            className="bg-[hsl(210_60%_25%)] text-white h-[40px] px-[20px] hover:bg-[hsl(210_60%_35%)]"
            onClick={handleSave}
          >
            Salvar Alterações
          </Button>
        </div>
      )}
    </div>
  )
}
