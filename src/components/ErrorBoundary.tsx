import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro detectado pelo ErrorBoundary:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
          <div className="max-w-md w-full p-8 bg-card border rounded-2xl shadow-sm text-center">
            <h1 className="text-2xl font-bold text-destructive mb-3">Ops! Algo deu errado.</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Ocorreu um erro inesperado na aplicação. Nossa equipe foi notificada, mas você pode
              tentar recarregar a página.
            </p>
            {this.state.error && (
              <pre className="p-4 bg-muted rounded-lg text-xs overflow-auto mb-6 text-foreground text-left border">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-primary-foreground font-medium px-6 py-3 rounded-xl w-full hover:opacity-90 transition-opacity"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
