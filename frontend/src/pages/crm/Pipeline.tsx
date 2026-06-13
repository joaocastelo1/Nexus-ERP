import { useEffect, useState } from 'react'
import { crmApi } from '../../services/api'
import type { Lead } from '../../types'
import { TrendingUp, DollarSign, Users } from 'lucide-react'
import clsx from 'clsx'
import Loading from '../../components/ui/Loading'

const stageConfig = {
  lead: { label: 'Lead', color: 'bg-blue-500', probability: 10 },
  qualification: { label: 'Qualificação', color: 'bg-violet-500', probability: 25 },
  proposal: { label: 'Proposta', color: 'bg-emerald-500', probability: 50 },
  negotiation: { label: 'Negociação', color: 'bg-amber-500', probability: 75 },
  closed_won: { label: 'Fechado', color: 'bg-green-500', probability: 100 },
  closed_lost: { label: 'Perdido', color: 'bg-red-500', probability: 0 }
}

interface PipelineStage {
  stage: string
  count: number
  value: number
  leads: Lead[]
}

export default function Pipeline() {
  const [pipeline, setPipeline] = useState<PipelineStage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadPipeline() }, [])

  const loadPipeline = async () => {
    try {
      const data = await crmApi.getPipeline()
      setPipeline(data)
    } catch (error) { console.error(error) }
    finally { setLoading(false) }
  }

  const totalValue = pipeline.reduce((sum, s) => sum + s.value, 0)
  const wonValue = pipeline.find(s => s.stage === 'closed_won')?.value || 0
  const lostValue = pipeline.find(s => s.stage === 'closed_lost')?.value || 0
  const activeValue = pipeline.filter(s => s.stage !== 'closed_won' && s.stage !== 'closed_lost').reduce((s, st) => s + st.value, 0)

  if (loading) return <Loading />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Pipeline de Vendas</h1>
        <p className="text-slate-500">Visão geral do funil de vendas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Pipeline</p>
              <p className="text-xl font-bold text-slate-800">R$ {totalValue.toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-emerald-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Valor Fechado</p>
              <p className="text-xl font-bold text-emerald-600">R$ {wonValue.toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-red-600 rotate-180" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Valor Perdido</p>
              <p className="text-xl font-bold text-red-600">R$ {lostValue.toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
              <Users className="text-violet-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Em Andamento</p>
              <p className="text-xl font-bold text-violet-600">R$ {activeValue.toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {pipeline.map((stage, index) => {
          const config = stageConfig[stage.stage as keyof typeof stageConfig]
          const percentage = totalValue > 0 ? (stage.value / totalValue) * 100 : 0
          
          return (
            <div key={stage.stage} className="card">
              <div className="flex items-center gap-2 mb-3">
                <div className={clsx("w-3 h-3 rounded-full", config.color)} />
                <span className="font-semibold text-slate-800">{config.label}</span>
              </div>
              
              <div className="space-y-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800">{stage.count}</p>
                  <p className="text-xs text-slate-500">leads</p>
                </div>
                
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-lg font-bold text-slate-800 text-center">R$ {stage.value.toLocaleString('pt-BR')}</p>
                  <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={clsx("h-full rounded-full transition-all", config.color)} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 text-center mt-1">{percentage.toFixed(1)}%</p>
                </div>
                
                <div className="pt-2 border-t border-slate-100 text-center">
                  <p className="text-sm text-slate-600">{config.probability}%</p>
                  <p className="text-xs text-slate-400">probabilidade</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Leads por Stage</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-slate-500">Lead</th>
                <th className="text-left p-3 text-sm font-medium text-slate-500">Empresa</th>
                <th className="text-left p-3 text-sm font-medium text-slate-500">Valor</th>
                <th className="text-left p-3 text-sm font-medium text-slate-500">Stage</th>
                <th className="text-left p-3 text-sm font-medium text-slate-500">Probabilidade</th>
              </tr>
            </thead>
            <tbody>
              {pipeline.flatMap(s => s.leads).map(lead => {
                const config = stageConfig[lead.stage as keyof typeof stageConfig]
                return (
                  <tr key={lead._id} className="table-row">
                    <td className="p-3 font-medium text-slate-800">{lead.name}</td>
                    <td className="p-3 text-slate-600">{lead.company || '-'}</td>
                    <td className="p-3 font-medium text-slate-800">R$ {lead.value.toLocaleString('pt-BR')}</td>
                    <td className="p-3">
                      <span className={clsx("badge", {
                        'bg-blue-100 text-blue-800': lead.stage === 'lead',
                        'bg-violet-100 text-violet-800': lead.stage === 'qualification',
                        'bg-emerald-100 text-emerald-800': lead.stage === 'proposal',
                        'bg-amber-100 text-amber-800': lead.stage === 'negotiation',
                        'bg-green-100 text-green-800': lead.stage === 'closed_won',
                        'bg-red-100 text-red-800': lead.stage === 'closed_lost',
                      })}>{config.label}</span>
                    </td>
                    <td className="p-3 text-slate-600">{lead.probability}%</td>
                  </tr>
                )
              })}
              {pipeline.flatMap(s => s.leads).length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Nenhum lead no pipeline</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}