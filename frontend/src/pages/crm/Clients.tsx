import { useEffect, useState } from 'react'
import { crmApi } from '../../services/api'
import type { Client, Interaction, Sale } from '../../types'
import { Plus, Search, Phone, Mail, Calendar, ShoppingBag, Star } from 'lucide-react'
import Loading from '../../components/ui/Loading'
import EmptyState from '../../components/ui/EmptyState'
import clsx from 'clsx'

const statusColors = {
  active: 'bg-emerald-100 text-emerald-800',
  inactive: 'bg-slate-100 text-slate-800',
  blocked: 'bg-red-100 text-red-800'
}

interface ClientWithDetails extends Client {
  interactions?: Interaction[]
  purchases?: Sale[]
}

export default function Clients() {
  const [clients, setClients] = useState<ClientWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedClient, setSelectedClient] = useState<ClientWithDetails | null>(null)
  const [formData, setFormData] = useState<{ name: string; email: string; phone: string; document: string; documentType: 'cpf' | 'cnpj'; address: { street: string; city: string; state: string; zipCode: string } }>({ name: '', email: '', phone: '', document: '', documentType: 'cpf', address: { street: '', city: '', state: '', zipCode: '' } })

  useEffect(() => { loadClients() }, [])

  const loadClients = async () => {
    try {
      const data = await crmApi.getClients()
      setClients(data)
    } catch (error) { console.error(error) }
    finally { setLoading(false) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await crmApi.createClient(formData)
      loadClients()
      setShowForm(false)
      setFormData({ name: '', email: '', phone: '', document: '', documentType: 'cpf', address: { street: '', city: '', state: '', zipCode: '' } })
    } catch (error) { console.error(error) }
  }

  const viewClientDetails = async (client: Client) => {
    try {
      const data = await crmApi.getClient(client._id)
      setSelectedClient({ ...data.client, interactions: data.interactions, purchases: data.purchases })
    } catch (error) { console.error(error) }
  }

  if (loading) return <Loading />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Clientes</h1>
          <p className="text-slate-500">Gestão de clientes e histórico</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn btn-primary flex items-center gap-2">
          <Plus size={18} /> Novo Cliente
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input type="text" placeholder="Buscar clientes..." className="input pl-10" />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Novo Cliente</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="input" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="input" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">CPF/CNPJ</label>
                  <input type="text" value={formData.document} onChange={e => setFormData({ ...formData, document: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
                  <select value={formData.documentType} onChange={e => setFormData({ ...formData, documentType: e.target.value as 'cpf' | 'cnpj' })} className="input">
                    <option value="cpf">CPF</option>
                    <option value="cnpj">CNPJ</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary flex-1">Cancelar</button>
                <button type="submit" className="btn btn-primary flex-1">Criar Cliente</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">{selectedClient.name}</h2>
                <p className="text-slate-500">{selectedClient.email}</p>
              </div>
              <button onClick={() => setSelectedClient(null)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <Star className="mx-auto text-amber-500 mb-1" size={24} />
                <p className="text-2xl font-bold text-slate-800">{selectedClient.score}</p>
                <p className="text-xs text-slate-500">Score</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <ShoppingBag className="mx-auto text-blue-500 mb-1" size={24} />
                <p className="text-2xl font-bold text-slate-800">{selectedClient.totalPurchases}</p>
                <p className="text-xs text-slate-500">Compras</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <span className="text-2xl font-bold text-emerald-600">R$</span>
                <p className="text-2xl font-bold text-emerald-600">{selectedClient.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p className="text-xs text-slate-500">Total Gasto</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-slate-800 mb-3">Compras Realizadas</h3>
              {selectedClient.purchases && selectedClient.purchases.length > 0 ? (
                <div className="space-y-2">
                  {selectedClient.purchases.map(purchase => (
                    <div key={purchase._id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-800">Pedido {purchase.invoiceNumber}</p>
                        <p className="text-sm text-slate-500">{new Date(purchase.createdAt).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <span className="font-bold text-emerald-600">R$ {purchase.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">Nenhuma compra realizada</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Interações Recentes</h3>
              {selectedClient.interactions && selectedClient.interactions.length > 0 ? (
                <div className="space-y-2">
                  {selectedClient.interactions.map(interaction => (
                    <div key={interaction._id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className={clsx(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        interaction.type === 'call' ? "bg-blue-100" :
                        interaction.type === 'email' ? "bg-violet-100" :
                        interaction.type === 'meeting' ? "bg-emerald-100" : "bg-slate-100"
                      )}>
                        {interaction.type === 'call' && <Phone size={14} className="text-blue-600" />}
                        {interaction.type === 'email' && <Mail size={14} className="text-violet-600" />}
                        {interaction.type === 'meeting' && <Calendar size={14} className="text-emerald-600" />}
                        {interaction.type === 'note' && <Star size={14} className="text-slate-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-800">{interaction.description}</p>
                        <p className="text-xs text-slate-500">{new Date(interaction.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">Nenhuma interação registrada</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map(client => (
          <div key={client._id} className="card hover:shadow-lg cursor-pointer" onClick={() => viewClientDetails(client)}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {client.name.charAt(0).toUpperCase()}
              </div>
              <span className={clsx("badge", statusColors[client.status])}>{client.status}</span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">{client.name}</h3>
            <p className="text-sm text-slate-500 mb-3">{client.email}</p>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-amber-500" />
                <span className="text-sm font-medium text-slate-700">{client.score}</span>
              </div>
              <div className="text-sm text-slate-500">
                <ShoppingBag size={14} className="inline mr-1" />
                {client.totalPurchases} compras
              </div>
            </div>
          </div>
        ))}
        {clients.length === 0 && (
          <div className="col-span-full"><EmptyState title="Nenhum cliente encontrado" description="Clientes aparecerão aqui após conversão de leads" /></div>
        )}
      </div>
    </div>
  )
}