import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FInput, FSimNao, FTextarea, FSelect, FCombobox } from '@/components/agentes/FormHelpers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Upload } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useMunicipios } from '@/hooks/use-municipios'
import { Label } from '@/components/ui/label'
import pb from '@/lib/pocketbase/client'

const QUALIDADE_OPTIONS = [
  {
    label: 'NÍVEL 1 - Insatisfatório/Abaixo do Esperado',
    value: 'NIVEL 1 - Insatisfatorio/Abaixo do Esperado',
  },
  { label: 'NÍVEL 2 - Básico/Regular', value: 'NIVEL 2 - Basico/Regular' },
  { label: 'NÍVEL 3 - Alto/Esperado', value: 'NIVEL 3 - Alto/Esperado' },
  {
    label: 'NÍVEL 4 - Excede as Expectativas/Excelente',
    value: 'NIVEL 4 - Excede as Expectativas/Excelente',
  },
]

const EXPERIENCIA_OPTIONS = [
  { label: 'SÊNIOR: Atende todos os ramos', value: 'SENIOR: Atende todos os ramos' },
  { label: 'PLENO: Atende 1-2 ramos', value: 'PLENO: Atende 1-2 ramos' },
  { label: 'JÚNIOR: Atende 1 ramo com supervisão', value: 'JUNIOR: Atende 1 ramo com supervisao' },
  { label: 'EM TREINAMENTO: Executa etapas', value: 'EM TREINAMENTO: Executa etapas' },
]

const COMPLIANCE_OPTIONS = [
  { label: 'COMPLIANCE TOTAL (BAIXO RISCO)', value: 'COMPLIANCE TOTAL (BAIXO RISCO)' },
  { label: 'COMPLIANCE PARCIAL (MÉDIO RISCO)', value: 'COMPLIANCE PARCIAL (MEDIO RISCO)' },
  { label: 'COMPLIANCE ZERO (ALTO RISCO)', value: 'COMPLIANCE ZERO (ALTO RISCO)' },
]

export function FormContent({ isNew = false }: { isNew?: boolean }) {
  const { watch, setValue } = useFormContext()
  const { toast } = useToast()
  const { states, getCitiesByState } = useMunicipios()

  const numeroControle = watch('numero_controle')
  const formValues = watch()

  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  useEffect(() => {
    const fileOrString = formValues.foto_perfil
    if (fileOrString instanceof File) {
      const url = URL.createObjectURL(fileOrString)
      setPhotoPreview(url)
      return () => URL.revokeObjectURL(url)
    } else if (typeof fileOrString === 'string' && fileOrString && formValues.id) {
      setPhotoPreview(pb.files.getUrl(formValues, fileOrString))
    } else {
      setPhotoPreview(null)
    }
  }, [formValues.foto_perfil, formValues.id])

  const notaTerceiros = watch('notaTerceiros')
  const dadosBancariosTerceiros = watch('dadosBancariosTerceiros')
  const naBlackList = watch('naBlackList')
  const estadoSelecionado = watch('base_atendimento_estado')

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    if (numeroControle) {
      navigator.clipboard.writeText(numeroControle)
      toast({
        title: 'Número copiado!',
        description: 'O número de controle foi copiado.',
        className: 'bg-emerald-600 text-white border-none',
      })
    }
  }

  const cidadesOptions = estadoSelecionado
    ? getCitiesByState(estadoSelecionado).map((c) => ({ label: c.nome, value: c.nome }))
    : []

  return (
    <div className="grid gap-8">
      {numeroControle && (
        <div className="bg-primary text-primary-foreground p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center font-bold shadow-sm gap-4">
          <span className="text-[15px] tracking-wide">Número de Controle: {numeroControle}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-primary-foreground hover:text-primary hover:bg-white font-bold rounded-xl h-10 px-4 w-full sm:w-auto"
          >
            <Copy className="w-4 h-4 mr-2" /> Copiar
          </Button>
        </div>
      )}

      <Card className="rounded-2xl shadow-sm border border-border/50 bg-card overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/20 pb-5 pt-6 px-6 sm:px-8">
          <CardTitle className="text-xl font-bold text-primary">
            Dados Cadastrais do Agente
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 sm:p-8">
          <div className="col-span-full flex flex-col md:flex-row items-start md:items-center gap-6 mb-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-muted flex shrink-0 items-center justify-center bg-muted/30">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-muted-foreground font-medium text-xs text-center">
                  Sem Foto
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold text-primary">Foto de Perfil</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('agente-foto-upload')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Carregar Imagem
                </Button>
                {photoPreview && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => {
                      setValue('foto_perfil', null, { shouldDirty: true })
                      const el = document.getElementById('agente-foto-upload') as HTMLInputElement
                      if (el) el.value = ''
                    }}
                  >
                    Remover
                  </Button>
                )}
              </div>
              <input
                id="agente-foto-upload"
                type="file"
                className="hidden"
                accept="image/jpeg, image/png, image/webp"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setValue('foto_perfil', file, { shouldDirty: true })
                  }
                }}
              />
              <p className="text-[12px] text-muted-foreground">JPG, PNG ou WEBP (máx. 5MB)</p>
            </div>
          </div>

          <FInput name="nomeCompleto" label="Nome completo" />
          <FInput name="dataNascimento" label="Data de nascimento" type="date" />
          <FInput name="cpf" label="CPF" />
          <FInput name="rg" label="RG" />
          <FInput name="cnpj" label="CNPJ" />
          <FSimNao name="possuiCnpj" label="Possui CNPJ?" />
          <FSimNao name="emiteNotaFiscal" label="Emite nota fiscal?" />
          <FSimNao name="notaTerceiros" label="Dados da nota fiscal são de terceiros?" />
          {notaTerceiros === 'Sim' && (
            <FInput name="vinculoTerceiroNf" label="Qual o vínculo do terceiro (NF)?" />
          )}

          <div className="col-span-full border-t border-border my-2" />
          <div className="col-span-full font-bold text-primary text-[15px] uppercase tracking-wider mb-2">
            Localização e Contato
          </div>
          <FCombobox
            name="base_atendimento_estado"
            label="Estado (Base)"
            options={states.map((s) => ({ label: s, value: s }))}
          />
          <FCombobox
            name="base_atendimento_cidade"
            label="Cidade (Base)"
            options={cidadesOptions}
          />

          <FInput name="baseAtendimento" label="Endereço da Base / Bairro" />
          <FInput name="regiaoAbrangencia" label="Região de abrangência" />
          <FInput name="cepBase" label="CEP de saída da base" />
          <FInput name="telefone" label="Telefone" />
          <FInput name="email" label="E-mail" type="email" />

          {isNew && (
            <>
              <div className="col-span-full border-t border-border my-2" />
              <div className="col-span-full font-bold text-primary text-[15px] uppercase tracking-wider mb-2">
                Credenciais de Acesso
              </div>
              <FInput name="senha" label="Senha" type="password" />
              <FInput name="confirmarSenha" label="Confirmar Senha" type="password" />
            </>
          )}

          <div className="col-span-full border-t border-border my-2" />
          <div className="col-span-full font-bold text-primary text-[15px] uppercase tracking-wider mb-2">
            Métricas de Avaliação (KPIs)
          </div>
          <FSelect name="qualidade_nivel" label="Nível de Qualidade" options={QUALIDADE_OPTIONS} />
          <FSelect
            name="experiencia_nivel"
            label="Nível de Experiência"
            options={EXPERIENCIA_OPTIONS}
          />
          <FSelect
            name="compliance_nivel"
            label="Nível de Compliance"
            options={COMPLIANCE_OPTIONS}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-2xl shadow-sm border border-border/50 bg-card overflow-hidden">
          <CardHeader className="border-b border-border bg-muted/20 pb-5 pt-6 px-6 sm:px-8">
            <CardTitle className="text-xl font-bold text-primary">Dados Bancários</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8">
            <FInput name="banco" label="Banco" />
            <FInput name="agencia" label="Agência" />
            <FInput name="conta" label="Conta" />
            <FInput name="titularConta" label="Titular da conta" />
            <div className="sm:col-span-2">
              <FInput name="chavePix" label="Chave Pix" />
            </div>
            <FSimNao name="dadosBancariosTerceiros" label="Bancários de terceiros?" />
            {dadosBancariosTerceiros === 'Sim' && (
              <FInput name="vinculoTerceiroBanco" label="Qual o vínculo?" />
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border border-border/50 bg-card overflow-hidden">
          <CardHeader className="border-b border-border bg-muted/20 pb-5 pt-6 px-6 sm:px-8">
            <CardTitle className="text-xl font-bold text-primary">Condições Comerciais</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8">
            <FInput name="valorHonorario" label="Valor do honorário Fixo (R$)" type="number" />
            <FInput name="valorKm" label="Valor do km (R$)" type="number" />
            <FInput name="valor_hora" label="Valor por Hora (R$)" type="number" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-2xl shadow-sm border border-border/50 bg-card overflow-hidden">
          <CardHeader className="border-b border-border bg-muted/20 pb-5 pt-6 px-6 sm:px-8">
            <CardTitle className="text-xl font-bold text-primary">Status do Agente</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8">
            <FSimNao name="ativo" label="Agente ativo?" />
            <FInput name="dataAtivacao" label="Data de ativação" type="date" />
            <FInput name="dataInativacao" label="Data de inativação" type="date" />
            <FSimNao name="naBlackList" label="Está na Black List?" />
            {naBlackList === 'Sim' && (
              <div className="col-span-full">
                <FInput name="motivoBlackList" label="Motivo da inclusão" />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border border-border/50 bg-card overflow-hidden">
          <CardHeader className="border-b border-border bg-muted/20 pb-5 pt-6 px-6 sm:px-8">
            <CardTitle className="text-xl font-bold text-primary">Outras Informações</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 p-6 sm:p-8">
            <FInput name="origemIndicacao" label="De onde veio a indicação" />
            <FTextarea name="outrasEmpresas" label="Outras empresas onde presta serviço" />
            <FTextarea name="observacoes" label="Observações" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
