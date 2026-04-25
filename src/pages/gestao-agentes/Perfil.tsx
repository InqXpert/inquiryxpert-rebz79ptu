import { Card, CardContent } from '@/components/ui/card'
import { UserCircle } from 'lucide-react'
import { useCurrentUser } from '@/hooks/use-current-user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function GestaoAgentesPerfil() {
  const { avatarUrl } = useCurrentUser()

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
          <Avatar className="w-24 h-24 mb-6 border-2 border-muted shadow-sm">
            <AvatarImage src={avatarUrl || ''} className="object-cover" />
            <AvatarFallback className="bg-muted text-muted-foreground">
              <UserCircle className="w-12 h-12 text-muted-foreground/50" />
            </AvatarFallback>
          </Avatar>
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
