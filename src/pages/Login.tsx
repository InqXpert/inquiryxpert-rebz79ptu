import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import { useToast } from '@/hooks/use-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const { error } = await signIn(email, password)
    setIsSubmitting(false)

    if (error) {
      toast({
        title: 'Erro de Autenticação',
        description: getErrorMessage(error),
        variant: 'destructive',
      })
    } else {
      toast({ title: 'Bem-vindo!' })
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6 sm:p-8">
      <Card className="w-full max-w-md rounded-[24px] shadow-2xl border-none bg-card overflow-hidden">
        <CardHeader className="text-center pb-8 pt-10 px-8 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="mx-auto w-20 h-20 bg-primary rounded-[20px] flex items-center justify-center mb-8 shadow-md">
            <svg
              className="w-10 h-10 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <CardTitle className="text-3xl font-bold text-primary tracking-tight mb-2">
            Acesso ao Sistema
          </CardTitle>
          <CardDescription className="text-[15px] font-medium">
            Insira suas credenciais para gerenciar a operação
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2.5">
              <label className="text-[14px] font-bold text-muted-foreground uppercase tracking-wider">
                E-mail
              </label>
              <Input
                type="email"
                placeholder="nome@empresa.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-border h-12 rounded-xl text-[15px] focus-visible:ring-primary focus-visible:border-primary bg-muted/20"
              />
            </div>
            <div className="space-y-2.5">
              <label className="text-[14px] font-bold text-muted-foreground uppercase tracking-wider">
                Senha
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-border h-12 rounded-xl text-[15px] focus-visible:ring-primary focus-visible:border-primary bg-muted/20"
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-xl h-14 mt-6 text-primary-foreground font-bold text-[16px] shadow-md transition-all hover:-translate-y-0.5"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
