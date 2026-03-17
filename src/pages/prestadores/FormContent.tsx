import { useFormContext } from 'react-hook-form'
import { FInput, FSimNao, FTextarea } from '@/components/prestadores/FormHelpers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function FormContent() {
  const { watch } = useFormContext()

  const notaTerceiros = watch('notaTerceiros')
  const dadosBancariosTerceiros = watch('dadosBancariosTerceiros')
  const naBlackList = watch('naBlackList')

  return (
    <div className="grid gap-8">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Dados Cadastrais do Prestador</CardTitle>
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
          <div className="col-span-full border-t my-2" />
          <FInput name="baseAtendimento" label="Base de atendimento" />
          <FInput name="regiaoAbrangencia" label="Região de abrangência" />
          <FInput name="cepBase" label="CEP de saída da base" />
          <FInput name="telefone" label="Telefone" />
          <FInput name="email" label="E-mail" type="email" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Dados Bancários</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FInput name="banco" label="Banco" />
            <FInput name="agencia" label="Agência" />
            <FInput name="conta" label="Conta" />
            <FInput name="titularConta" label="Titular da conta" />
            <FInput name="chavePix" label="Chave Pix" />
            <FSimNao name="dadosBancariosTerceiros" label="Bancários de terceiros?" />
            {dadosBancariosTerceiros === 'Sim' && (
              <FInput name="vinculoTerceiroBanco" label="Qual o vínculo?" />
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Condições Comerciais</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FInput name="valorHonorario" label="Valor do honorário (R$)" type="number" />
            <FInput name="valorKm" label="Valor do km (R$)" type="number" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Status do Prestador</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FSimNao name="ativo" label="Prestador ativo?" />
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

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Outras Informações</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6">
            <FTextarea name="outrasEmpresas" label="Outras empresas onde presta serviço" />
            <FInput name="origemIndicacao" label="De onde veio a indicação" />
            <FTextarea name="observacoes" label="Observações" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
