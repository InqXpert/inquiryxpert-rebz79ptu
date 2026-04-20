import React, { Component, ReactNode } from 'react'
import { toast } from 'sonner'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  zoneName: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ZoneErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    toast.error(`Erro ao carregar zona: ${this.props.zoneName}`)
    console.error(`ErrorBoundary caught error in ${this.props.zoneName}:`, error)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 border border-destructive/20 bg-destructive/5 rounded-lg flex flex-col items-center justify-center text-center space-y-4 shadow-sm w-full h-full min-h-[200px]">
          <AlertCircle className="w-8 h-8 text-destructive" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-destructive">
              Falha ao carregar {this.props.zoneName}
            </p>
            <p className="text-xs text-destructive/80 max-w-[250px] truncate mx-auto">
              {this.state.error?.message || 'Ocorreu um erro inesperado.'}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={this.handleRetry}
            className="border-destructive/30 hover:bg-destructive/10 text-destructive hover:text-destructive"
          >
            Tentar novamente
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
