import { Card, CardContent } from '@/components/ui/card'
import { UserCircle } from 'lucide-react'

export default function GestaoAgentesPerfil() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#282c59]">
          Meu Perfil Profissional
        </h1>
        <p className="text-muted-foreground mt-1">
          Visualize seus dados cadastrais e área de atuação.
        </p>
      </div>

      <Card className="border-border shadow-sm rounded-2xl bg-card min-h-[400px] flex items-center justify-center">
        <CardContent className="p-12 text-center text-muted-foreground flex flex-col items-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
            <UserCircle className="w-10 h-10 text-muted-foreground/50" />
          </div>
          <p className="font-bold text-lg text-[#282c59] mb-2">Gestão de Perfil</p>
          <p className="font-medium text-[15px] max-w-md">
            Módulo de atualização de cadastro em desenvolvimento. Em breve você poderá editar seus
            dados e documentos diretamente pelo portal.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
