import { useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error('Erro 404: Usuário tentou acessar rota inexistente:', location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-transparent animate-in fade-in duration-500">
      <div className="text-center bg-card p-12 rounded-2xl shadow-sm border border-border max-w-md w-full">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <h1 className="text-4xl font-bold text-muted-foreground">404</h1>
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">Ops! Página não encontrada</h2>
        <p className="text-sm text-muted-foreground mb-8">
          A rota que você tentou acessar não existe ou foi movida.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-xl font-semibold shadow-sm transition-colors"
        >
          Voltar para o Início
        </Link>
      </div>
    </div>
  )
}

export default NotFound
