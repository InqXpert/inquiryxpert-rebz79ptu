import { useFormContext } from 'react-hook-form'
import { FInput, FSimNao, FTextarea, FSelect } from '@/components/agentes/FormHelpers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { BR_STATES, getCitiesByState } from '@/services/brazilCities'

const QUALIDADE_OPTIONS = [
  {
    label: 'NIVEL 1 - Insatisfatorio/Abaixo do Esperado',
    value: 'NIVEL 1 - Insatisfatorio/Abaixo do Esperado',
  },
  { label: 'NIVEL 2 - Basico/Regular', value: 'NIVEL 2 - Basico/Regular' },
  { label: 'NIVEL 3 - Alto/Esperado', value: 'NIVEL 3 - Alto/Esperado' },
  {
    label: 'NIVEL 4 - Excede as Expectativas/Excelente',
    value: 'NIVEL 4 - Excede as Expectativas/Excelente',
  },
]

const EXPERIENCIA_OPTIONS = [
  { label: 'SENIOR: Atende todos os ramos', value: 'SENIOR: Atende todos os ramos' },
  { label: 'PLENO: Atende 1-2 ramos', value: 'PLENO: Atende 1-2 ramos' },
  { label: 'JUNIOR: Atende 1 ramo com supervisao', value: 'JUNIOR: Atende 1 ramo com supervisao' },
  { label: 'EM TREINAMENTO: Executa etapas', value: 'EM TREINAMENTO: Executa etapas' },
]

const COMPLIANCE_OPTIONS = [
  { label: 'COMPLIANCE TOTAL (BAIXO RISCO)', value: 'COMPLIANCE TOTAL (BAIXO RISCO)' },
  { label: 'COMPLIANCE PARCIAL (MEDIO RISCO)', value: 'COMPLIANCE PARCIAL (MEDIO RISCO)' },
  { label: 'COMPLIANCE ZERO (ALTO RISCO)', value: 'COMPLIANCE ZERO (ALTO RISCO)' },
]

export function FormContent() {
  const { watch } = useFormContext()
  const { toast } = useToast()

  const numeroControle = watch('numero_controle')
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
        className: 'bg-green-500 text-white border-none',
      })
    }
  }

  const cidadesOptions = estadoSelecionado
    ? getCitiesByState(estadoSelecionado).map((c) => ({ label: c.name, value: c.name }))
    : []

  return (
    <div className="grid gap-6">
      {numeroControle && (
        <div className="bg-primary text-white p-[12px] rounded-xl flex justify-between items-center font-bold shadow-sm">
          <span>Número de Controle: {numeroControle}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-white hover:text-primary hover:bg-white font-semibold rounded-lg h-9"
          >
            <Copy className="w-4 h-4 mr-2" /> Copiar
          </Button>
        </div>
      )}

      <Card className="rounded-2xl shadow-sm border-none">
        <CardHeader className="border-b border-muted/50 pb-4 mb-4">
          <CardTitle className="text-lg font-semibold text-primary">
            Dados Cadastrais do Agente
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="col-span-full border-t border-muted/50 my-2" />

          {/* New Geo Fields */}
          <FSelect
            name="base_atendimento_estado"
            label="Estado (Base)"
            options={BR_STATES.map((s) => ({ label: s, value: s }))}
          />
          <FSelect name="base_atendimento_cidade" label="Cidade (Base)" options={cidadesOptions} />

          <FInput name="baseAtendimento" label="Endereço da Base / Bairro" />
          <FInput name="regiaoAbrangencia" label="Região de abrangência" />
          <FInput name="cepBase" label="CEP de saída da base" />
          <FInput name="telefone" label="Telefone" />
          <FInput name="email" label="E-mail" type="email" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow-sm border-none">
          <CardHeader className="border-b border-muted/50 pb-4 mb-4">
            <CardTitle className="text-lg font-semibold text-primary">Dados Bancários</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

        <Card className="rounded-2xl shadow-sm border-none">
          <CardHeader className="border-b border-muted/50 pb-4 mb-4">
            <CardTitle className="text-lg font-semibold text-primary">
              Condições Comerciais
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FInput name="valorHonorario" label="Valor do honorário Fixo (R$)" type="number" />
            <FInput name="valorKm" label="Valor do km (R$)" type="number" />
            <FInput name="valor_hora" label="Valor por Hora (R$)" type="number" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow-sm border-none">
          <CardHeader className="border-b border-muted/50 pb-4 mb-4">
            <CardTitle className="text-lg font-semibold text-primary">Status do Agente</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

        <Card className="rounded-2xl shadow-sm border-none">
          <CardHeader className="border-b border-muted/50 pb-4 mb-4">
            <CardTitle className="text-lg font-semibold text-primary">Outras Informações</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6">
            <FInput name="origemIndicacao" label="De onde veio a indicação" />
            <FTextarea name="outrasEmpresas" label="Outras empresas onde presta serviço" />
            <FTextarea name="observacoes" label="Observações" />
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl shadow-sm border-none md:col-span-2">
        <CardHeader className="border-b border-muted/50 pb-4 mb-4">
          <CardTitle className="text-lg font-semibold text-primary">
            Performance e Compliance (KPIs)
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  )
}
