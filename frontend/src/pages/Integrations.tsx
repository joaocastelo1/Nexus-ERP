import { useEffect, useState } from 'react'
import { integrationApi } from '../services/api'
import type { SyncLog } from '../types'
import { Link2, ArrowRight, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react'
import Loading from '../components/ui/Loading'
import EmptyState from '../components/ui/EmptyState'
import clsx from 'clsx'

export default function Integrations() {
  const [logs, setLogs] = useState<SyncLog[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => { loadLogs() }, [])

  const loadLogs = async () => {
    try {
      const data = await integrationApi.getSyncLogs()
      setLogs(data)
    } catch (error) { console.error(error) }
    finally { setLoading(false) }
  }

  const statusConfig = {
    success: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    failed: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
    pending: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' }
  }

  const eventLabels: Record<string, string> = {
    'lead.converted': 'Lead Convertido',
    'sale.closed': 'Venda Fechada',
    'client.updated': 'Cliente Atualizado',
    'stock.updated': 'Estoque Atualizado'
  }

  if (loading) return <Loading />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Integrações</h1>
          <p className="text-slate-500">Logs de sincronização entre CRM e ERP</p>
        </div>
        <button onClick={loadLogs} disabled={syncing} className="btn btn-secondary flex items-center gap-2">
          <RefreshCw size={18} className={syncing ? 'animate-spin' : ''} /> Atualizar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
              <Link2 className="text-violet-600" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">CRM → ERP</h3>
              <p className="text-sm text-slate-500">Fluxo de dados do CRM para ERP</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <ArrowRight size={16} className="text-violet-500" />
              <span className="text-sm text-slate-600">Conversão de Lead → Cliente</span>
              <span className="badge bg-emerald-100 text-emerald-800 ml-auto">Ativo</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <ArrowRight size={16} className="text-violet-500" />
              <span className="text-sm text-slate-600">Fechamento de Venda → ERP</span>
              <span className="badge bg-emerald-100 text-emerald-800 ml-auto">Ativo</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Link2 className="text-emerald-600" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">ERP → CRM</h3>
              <p className="text-sm text-slate-500">Fluxo de dados do ERP para CRM</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <ArrowRight size={16} className="text-emerald-500" />
              <span className="text-sm text-slate-600">Venda → Histórico Cliente</span>
              <span className="badge bg-emerald-100 text-emerald-800 ml-auto">Ativo</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <ArrowRight size={16} className="text-emerald-500" />
              <span className="text-sm text-slate-600">Atualização de Estoque</span>
              <span className="badge bg-emerald-100 text-emerald-800 ml-auto">Ativo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Histórico de Sincronização</h3>
        <div className="space-y-3">
          {logs.map(log => {
            const config = statusConfig[log.status]
            return (
              <div key={log._id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center", config.bg)}>
                  <config.icon size={20} className={config.color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800">{eventLabels[log.event] || log.event}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-sm text-slate-500">{log.source} → {log.target}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(log.createdAt).toLocaleString('pt-BR')}
                  </p>
                </div>
                <span className={clsx("badge", 
                  log.status === 'success' ? 'bg-emerald-100 text-emerald-800' :
                  log.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                )}>
                  {log.status === 'success' ? 'Sucesso' : log.status === 'failed' ? 'Falhou' : 'Pendente'}
                </span>
              </div>
            )
          })}
          {logs.length === 0 && (
            <EmptyState title="Nenhuma sincronização registrada" description="As sincronizações aparecerão aqui automaticamente" />
          )}
        </div>
      </div>

      <div className="card bg-gradient-to-r from-violet-500/10 to-emerald-500/10 border-violet-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Como funciona a integração?</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1 text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-violet-600 font-bold">1</span>
            </div>
            <p className="text-sm text-slate-600">Lead é convertido em Cliente no CRM</p>
          </div>
          <ArrowRight size={20} className="text-slate-400" />
          <div className="flex-1 text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <p className="text-sm text-slate-600">Venda fecha e cria pedido no ERP</p>
          </div>
          <ArrowRight size={20} className="text-slate-400" />
          <div className="flex-1 text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-emerald-600 font-bold">3</span>
            </div>
            <p className="text-sm text-slate-600">Estoque é debitado e keuangan entrada</p>
          </div>
        </div>
      </div>
    </div>
  )
}