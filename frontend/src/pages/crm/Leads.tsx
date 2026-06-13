import { useEffect, useState } from 'react'
import { crmApi, integrationApi } from '../../services/api'
import type { Lead } from '../../types'
import { Plus, Search, ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import Loading from '../../components/ui/Loading'
import EmptyState from '../../components/ui/EmptyState'

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-violet-100 text-violet-800',
  qualified: 'bg-emerald-100 text-emerald-800',
  proposal: 'bg-amber-100 text-amber-800',
  negotiation: 'bg-orange-100 text-orange-800',
  won: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800'
}

const stageConfig = {
  lead: { label: 'Lead', color: 'border-blue-500', probability: 10 },
  qualification: { label: 'Qualificação', color: 'border-violet-500', probability: 25 },
  proposal: { label: 'Proposta', color: 'border-emerald-500', probability: 50 },
  negotiation: { label: 'Negociação', color: 'border-amber-500', probability: 75 },
  closed_won: { label: 'Fechado', color: 'border-green-500', probability: 100 },
  closed_lost: { label: 'Perdido', color: 'border-red-500', probability: 0 }
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<{ name: string; email: string; phone: string; company: string; source: string; value: number; notes: string }>({ name: '', email: '', phone: '', company: '', source: 'website', value: 0, notes: '' })
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list')

  useEffect(() => { loadLeads() }, [])

  const loadLeads = async () => {
    try {
      const data = await crmApi.getLeads()
      setLeads(data)
    } catch (error) { console.error(error) }
    finally { setLoading(false) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await crmApi.createLead(formData as Partial<Lead>)
      loadLeads()
      setShowForm(false)
      setFormData({ name: '', email: '', phone: '', company: '', source: 'website', value: 0, notes: '' })
    } catch (error) { console.error(error) }
  }

  const updateStage = async (id: string, newStage: string) => {
    try {
      const lead = leads.find(l => l._id === id)
      if (!lead) return
      const status = newStage === 'closed_won' ? 'won' : newStage === 'closed_lost' ? 'lost' : newStage
      await crmApi.updateLead(id, { stage: newStage as Lead['stage'], status: status as Lead['status'], probability: stageConfig[newStage as keyof typeof stageConfig].probability })
      loadLeads()
    } catch (error) { console.error(error) }
  }

  const convertLead = async (id: string) => {
    try {
      await integrationApi.convertLead(id)
      alert('Lead convertido em cliente!')
      loadLeads()
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : 'Erro ao converter lead')
    }
  }

  const stages = ['lead', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost'] as const

  if (loading) return <Loading />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Leads</h1>
          <p className="text-slate-500">Gerenciamento de leads e oportunidades</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn btn-primary flex items-center gap-2">
          <Plus size={18} /> Novo Lead
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex bg-slate-100 rounded-lg p-1">
          <button onClick={() => setViewMode('list')} className={clsx("px-4 py-2 rounded-md text-sm font-medium transition-colors", viewMode === 'list' ? "bg-white shadow-sm" : "text-slate-500")}>Lista</button>
          <button onClick={() => setViewMode('kanban')} className={clsx("px-4 py-2 rounded-md text-sm font-medium transition-colors", viewMode === 'kanban' ? "bg-white shadow-sm" : "text-slate-500")}>Kanban</button>
        </div>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Buscar leads..." className="input pl-10" />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Novo Lead</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="input" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="input" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Empresa</label>
                  <input type="text" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="input" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Fonte</label>
                  <select value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })} className="input">
                    <option value="website">Website</option>
                    <option value="referral">Indicação</option>
                    <option value="social">Redes Sociais</option>
                    <option value="ads">Anúncios</option>
                    <option value="other">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Valor Estimado</label>
                  <input type="number" value={formData.value} onChange={e => setFormData({ ...formData, value: Number(e.target.value) })} className="input" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Notas</label>
                <textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} className="input" rows={3} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary flex-1">Cancelar</button>
                <button type="submit" className="btn btn-primary flex-1">Criar Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewMode === 'list' ? (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-slate-500">Nome</th>
                <th className="text-left p-4 text-sm font-medium text-slate-500">Email</th>
                <th className="text-left p-4 text-sm font-medium text-slate-500">Empresa</th>
                <th className="text-left p-4 text-sm font-medium text-slate-500">Valor</th>
                <th className="text-left p-4 text-sm font-medium text-slate-500">Status</th>
                <th className="text-left p-4 text-sm font-medium text-slate-500">Ações</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead._id} className="table-row">
                  <td className="p-4 font-medium text-slate-800">{lead.name}</td>
                  <td className="p-4 text-slate-600">{lead.email}</td>
                  <td className="p-4 text-slate-600">{lead.company || '-'}</td>
                  <td className="p-4 text-slate-800 font-medium">R$ {lead.value.toLocaleString('pt-BR')}</td>
                  <td className="p-4">
                    <span className={clsx("badge", statusColors[lead.status])}>{lead.status}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {lead.stage !== 'closed_won' && lead.stage !== 'closed_lost' && (
                        <button onClick={() => convertLead(lead._id)} className="btn btn-success text-xs py-1">Converter</button>
                      )}
                      <select 
                        value={lead.stage} 
                        onChange={(e) => updateStage(lead._id, e.target.value)}
                        className="text-xs border border-slate-200 rounded px-2 py-1"
                      >
                        {stages.map(s => <option key={s} value={s}>{stageConfig[s].label}</option>)}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr><td colSpan={6}><EmptyState title="Nenhum lead encontrado" description="Crie seu primeiro lead para começar" /></td></tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-4 overflow-x-auto pb-4">
          {stages.map(stage => (
            <div key={stage} className="min-w-[250px]">
              <div className={clsx("bg-white rounded-t-lg p-3 border-t-4", stageConfig[stage].color)}>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{stageConfig[stage].label}</span>
                  <span className="text-sm text-slate-500">{leads.filter(l => l.stage === stage).length}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  R$ {leads.filter(l => l.stage === stage).reduce((s, l) => s + l.value, 0).toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="bg-slate-50 rounded-b-lg p-2 min-h-[400px] space-y-2">
                {leads.filter(l => l.stage === stage).map(lead => (
                  <div key={lead._id} className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{lead.name}</p>
                        <p className="text-xs text-slate-500">{lead.company || 'Sem empresa'}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-emerald-600">R$ {lead.value.toLocaleString('pt-BR')}</span>
                      {stage !== 'closed_won' && stage !== 'closed_lost' && (
                        <button onClick={() => convertLead(lead._id)} className="text-violet-600 hover:text-violet-700">
                          <ArrowRight size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}