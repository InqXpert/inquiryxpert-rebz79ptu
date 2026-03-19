import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Edit, Trash, MapPin, Phone, Mail, Building, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getPrestador, deletePrestador } from '@/services/prestadores'
import { Prestador } from '@/types'
import { useToast } from '@/hooks/use-toast'
import { useRealtime } from '@/hooks/use-realtime'

export default function ProfilePrestador() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [p, setP] = useState<Prestador | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    if (!id) return
    try {
      const data = await getPrestador(id)
      setP(data)
    } catch (err) {
      toast({ title: 'Erro', description: 'Prestador não encontrado', variant: 'destructive' })
      navigate('/prestadores')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [id])

  useRealtime('prestadores', (e) => {
    if (e.record.id === id) {
      if (e.action === 'delete') navigate('/prestadores')
      else loadData()
    }
  })

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja remover este prestador?')) {
      try {
        await deletePrestador(id!)
        toast({ title: 'Removido', description: 'Prestador deletado com sucesso.' })
        navigate('/prestadores')
      } catch (err) {
        toast({ title: 'Erro', description: 'Falha ao remover.', variant: 'destructive' })
      }
    }
  }

  if (loading) return <div className="p-8 text-center">Carregando...</div>
  if (!p) return <div className="p-8 text-center text-xl">Prestador não encontrado.</div>

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Perfil do Prestador</h1>
        <div className="flex gap-3">
          <Button variant="destructive" onClick={handleDelete} className="rounded-full">
            <Trash className="w-4 h-4 mr-2" />
            Remover
          </Button>
          <Button asChild className="rounded-full px-6">
            <Link to={`/prestadores/${p.id}/editar`}>
              <Edit className="w-4 h-4 mr-2" /> Editar
            </Link>
          </Button>
        </div>
      </div>

      <Card className="rounded-3xl border-none shadow-elevation overflow-hidden mb-8">
        <div className="h-32 bg-primary/10 relative">
          {p.naBlackList === 'Sim' && (
            <div className="absolute top-4 right-4 bg-destructive text-white px-4 py-1 rounded-full text-sm font-bold shadow-md animate-pulse">
              NA BLACK LIST
            </div>
          )}
        </div>
        <CardContent className="px-8 pb-8 relative">
          <img
            src={`https://img.usecurling.com/ppl/large?gender=male&seed=${p.id}`}
            className="w-32 h-32 rounded-2xl border-4 border-card shadow-lg absolute -top-16 object-cover"
            alt="Profile"
          />
          <div className="mt-20 flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-primary">{p.nomeCompleto}</h2>
              <p className="text-muted-foreground font-medium flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4" /> {p.baseAtendimento} - {p.regiaoAbrangencia}
              </p>
            </div>
            <Badge
              variant={p.ativo === 'Sim' ? 'secondary' : 'outline'}
              className="text-sm px-4 py-1"
            >
              {p.ativo === 'Sim' ? 'Ativo' : 'Inativo'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 grid gap-4">
            <h3 className="font-bold text-lg text-primary mb-2 flex items-center gap-2">
              <Phone className="w-5 h-5" /> Contato
            </h3>
            <div>
              <p className="text-sm text-muted-foreground">E-mail</p>
              <p className="font-medium">{p.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telefone</p>
              <p className="font-medium">{p.telefone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Documento</p>
              <p className="font-medium">{p.cpf || p.cnpj}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 grid gap-4">
            <h3 className="font-bold text-lg text-primary mb-2 flex items-center gap-2">
              <Building className="w-5 h-5" /> Comercial
            </h3>
            <div>
              <p className="text-sm text-muted-foreground">Valor Honorário</p>
              <p className="font-medium text-xl">R$ {Number(p.valorHonorario || 0).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor KM</p>
              <p className="font-medium">R$ {Number(p.valorKm || 0).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Banco / Chave Pix</p>
              <p className="font-medium">
                {p.banco} / {p.chavePix}
              </p>
            </div>
          </CardContent>
        </Card>

        {p.naBlackList === 'Sim' && (
          <Card className="col-span-full border-destructive/50 bg-destructive/5 rounded-2xl shadow-sm">
            <CardContent className="p-6 flex gap-4">
              <AlertCircle className="w-8 h-8 text-destructive shrink-0" />
              <div>
                <h3 className="font-bold text-lg text-destructive">Motivo da Black List</h3>
                <p className="text-destructive/80 mt-1">{p.motivoBlackList || 'Não informado.'}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
