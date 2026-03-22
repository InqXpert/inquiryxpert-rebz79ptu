import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class GestaoAgentesErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro no Módulo de Gestão de Agentes:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8 bg-card rounded-2xl border border-border shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
            Falha no Módulo de Agentes
          </h2>
          <p className="text-muted-foreground text-[15px] max-w-md mx-auto mb-8 leading-relaxed">
            Encontramos um erro inesperado ao processar esta tela. Por favor, tente recarregar a
            página. Se o problema persistir, contate o suporte.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="rounded-xl h-12 px-8 font-bold shadow-sm"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Recarregar Página
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
