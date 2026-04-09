import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getEncaminhamento } from '@/services/sindicancia'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle2, XCircle, FileIcon, Download } from 'lucide-react'
import pb from '@/lib/pocketbase/client'

export default function SindicanciaDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [record, setRecord] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      getEncaminhamento(id)
        .then(setRecord)
        .catch(() => navigate('/dashboard'))
        .finally(() => setLoading(false))
    }
  }, [id, navigate])

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground animate-pulse">
        Carregando detalhes da sindicância...
      </div>
    )
  }

  if (!record) {
    return <div className="p-8 text-center text-muted-foreground">Registro não encontrado.</div>
  }

  const processo = record.expand?.processo_id
  const user = record.expand?.user_id

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="-ml-4 text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>

      <div>
        <h1 className="text-3xl font-bold text-primary">
          Sindicancia {processo?.numero_controle || processo?.id || record.processo_id}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Enviado por: {user?.name || user?.email || 'Sistema'} em {formatDate(record.created)}
        </p>
      </div>

      <Card className="border-none shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg">Orientações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 p-5 rounded-lg font-mono text-sm whitespace-pre-wrap text-muted-foreground border border-border/50">
            {record.orientacoes}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg">Documentos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {record.documentos && record.documentos.length > 0 ? (
            record.documentos.map((doc: string, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 border border-border/50 rounded-lg bg-background hover:bg-muted/5 transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md shrink-0">
                    <FileIcon className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium truncate">{doc}</span>
                </div>
                <Button variant="outline" size="sm" asChild className="shrink-0 ml-4">
                  <a href={pb.files.getURL(record, doc)} target="_blank" rel="noreferrer">
                    <Download className="h-4 w-4 mr-2" /> Baixar
                  </a>
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Nenhum documento anexado a este encaminhamento.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg">Status de Entrega</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-6 sm:gap-12">
          <div className="flex items-center gap-3">
            <span className="font-medium text-sm text-muted-foreground">E-mail:</span>
            {record.email_enviado ? (
              <div className="flex items-center text-green-600 gap-1.5 font-medium text-sm">
                <CheckCircle2 className="h-5 w-5" /> Entregue
              </div>
            ) : (
              <div className="flex items-center text-red-500 gap-1.5 font-medium text-sm">
                <XCircle className="h-5 w-5" /> Falha
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium text-sm text-muted-foreground">WhatsApp:</span>
            {record.whatsapp_enviado ? (
              <div className="flex items-center text-green-600 gap-1.5 font-medium text-sm">
                <CheckCircle2 className="h-5 w-5" /> Entregue
              </div>
            ) : (
              <div className="flex items-center text-red-500 gap-1.5 font-medium text-sm">
                <XCircle className="h-5 w-5" /> Falha
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
