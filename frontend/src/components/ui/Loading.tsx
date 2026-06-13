import { Loader2 } from 'lucide-react'

interface LoadingProps {
  message?: string
}

export default function Loading({ message = 'Carregando...' }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <Loader2 size={32} className="text-blue-500 animate-spin" />
      <p className="text-slate-500 text-sm">{message}</p>
    </div>
  )
}
