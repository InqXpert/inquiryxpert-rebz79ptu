import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { AlertTriangle, Receipt, Search, CheckCircle2 } from 'lucide-react'
import { getFaturamento } from '@/services/gestaoAgentes'
import { RelatorioProcesso } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function GestaoAgentesFaturamento() {
  const { user } = useAuth()
  const [faturamentos, setFaturamentos] = useState<RelatorioProcesso[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.role === 'c-level' || user?.role === 'admin' || user?.role === 'supervisor') {
      getFaturamento().then((data) => {
        setFaturamentos(data)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [user])

  if (user?.role === 'agente' || user?.role === 'analista') {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-destructive/5 rounded-2xl border border-destructive/20 mt-10">
        <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-xl font-bold text-destructive">Acesso Negado</h2>
        <p className="text-muted-foreground mt-2">
          Você não possui permissão para visualizar esta página.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#282c59]">Faturamento</h1>
          <p className="text-muted-foreground mt-1">
            Controle de honorários e processos prontos para pagamento.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar prestador..." className="pl-9 h-11 rounded-xl" />
        </div>
      </div>

      <Card className="border-border shadow-sm rounded-2xl bg-card overflow-hidden">
        <div className="p-4 bg-muted/20 border-b border-border flex gap-4">
          <Button className="bg-[#282c59] text-white hover:bg-[#282c59]/90 rounded-xl">
            Prontos para Faturar
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:bg-muted rounded-xl">
            Histórico Pagamentos
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-semibold text-[13px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Processo</th>
                <th className="px-6 py-4">Agente Prestador</th>
                <th className="px-6 py-4">Status Processo</th>
                <th className="px-6 py-4">Relatório</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Carregando...
                  </td>
                </tr>
              ) : faturamentos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-muted-foreground">
                    <div className="flex flex-col items-center">
                      <Receipt className="w-12 h-12 text-muted-foreground/30 mb-3" />
                      <p className="font-medium text-[15px]">Nenhum faturamento pendente.</p>
                      <p className="text-xs mt-1">
                        Processos precisam estar Concluídos, com Áudio Validado e Relatório
                        Aprovado.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                faturamentos.map((f) => (
                  <tr key={f.id} className="hover:bg-muted/30">
                    <td className="px-6 py-4 font-bold text-[#282c59]">
                      {f.expand?.processo_id?.numero_processo ||
                        f.expand?.processo_id?.numero_controle}
                    </td>
                    <td className="px-6 py-4">{f.expand?.agente_id?.nomeCompleto || '-'}</td>
                    <td className="px-6 py-4">
                      <Badge variant="success">Concluído</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="border-[#2bc8cf] text-[#2bc8cf]">
                        Aprovado
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        className="bg-[#2bc8cf] text-[#282c59] hover:bg-[#2bc8cf]/80 rounded-lg"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Liberar Pagamento
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
