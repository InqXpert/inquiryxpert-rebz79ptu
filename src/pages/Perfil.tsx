import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/use-auth'
import { Mail, Shield, Clock, Activity } from 'lucide-react'

export default function Perfil() {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Meu Perfil</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie suas informações e preferências da conta no sistema.
        </p>
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <div className="h-32 bg-primary/10 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent mix-blend-overlay"></div>
        </div>
        <CardContent className="px-6 sm:px-10 pb-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8">
            <Avatar className="w-32 h-32 border-4 border-background shadow-md">
              <AvatarImage
                src={`https://img.usecurling.com/ppl/large?gender=female&seed=${user?.id || 1}`}
              />
              <AvatarFallback className="text-3xl bg-muted text-foreground">
                {user?.name?.substring(0, 2).toUpperCase() || 'US'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left mb-2 sm:mb-0">
              <h2 className="text-2xl font-bold text-foreground">
                {user?.name || 'Usuário Não Identificado'}
              </h2>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <Badge variant="secondary" className="capitalize px-3 py-0.5 text-xs font-semibold">
                  {user?.role || 'Visitante'}
                </Badge>
                <Badge
                  variant={user?.status_conta === 'ativo' ? 'default' : 'outline'}
                  className="capitalize px-3 py-0.5 text-xs"
                >
                  {user?.status_conta || 'Ativo'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border/50">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-primary">
                <Shield className="w-5 h-5" /> Informações da Conta
              </h3>

              <div className="bg-muted/40 p-4 rounded-xl space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4" /> Endereço de E-mail
                  </p>
                  <p className="text-base font-semibold">{user?.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4" /> Nível de Acesso
                  </p>
                  <p className="text-base font-semibold capitalize">{user?.role || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-primary">
                <Clock className="w-5 h-5" /> Atividade
              </h3>

              <div className="bg-muted/40 p-4 rounded-xl space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Último Login</p>
                  <p className="text-base font-semibold">
                    {user?.ultimo_login
                      ? new Date(user.ultimo_login).toLocaleString('pt-BR')
                      : 'Primeiro acesso'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Conta Criada em</p>
                  <p className="text-base font-semibold">
                    {user?.created ? new Date(user.created).toLocaleDateString('pt-BR') : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
