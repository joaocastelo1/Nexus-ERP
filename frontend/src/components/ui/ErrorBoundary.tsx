import { Component, type ReactNode, type ErrorInfo } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="flex flex-col items-center justify-center h-64 text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Algo deu errado</h2>
          <p className="text-slate-500 mb-4 max-w-md">
            Ocorreu um erro inesperado ao carregar esta página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary flex items-center gap-2"
          >
            <RefreshCw size={16} /> Recarregar
          </button>
          {import.meta.env.DEV && this.state.error && (
            <pre className="mt-4 p-4 bg-slate-100 rounded-lg text-left text-xs text-red-600 max-w-lg overflow-auto">
              {this.state.error.message}
            </pre>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
