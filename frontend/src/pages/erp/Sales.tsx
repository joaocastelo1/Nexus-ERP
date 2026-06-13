import { useEffect, useState } from 'react'
import { erpApi, crmApi } from '../../services/api'
import type { Sale, Product, Client } from '../../types'
import { Plus, Search, ShoppingCart, FileText } from 'lucide-react'
import Loading from '../../components/ui/Loading'
import EmptyState from '../../components/ui/EmptyState'
import clsx from 'clsx'

const statusColors: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-violet-100 text-violet-800',
  shipped: 'bg-amber-100 text-amber-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800'
}

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<{ clientId: string; items: { productId: string; quantity: number }[]; paymentMethod: string; notes: string }>({ clientId: '', items: [{ productId: '', quantity: 1 }], paymentMethod: 'cash', notes: '' })

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    try {
      const [salesData, productsData, clientsData] = await Promise.all([
        erpApi.getSales(),
        erpApi.getProducts(),
        crmApi.getClients()
      ])
      setSales(salesData)
      setProducts(productsData)
      setClients(clientsData)
    } catch (error) { console.error(error) }
    finally { setLoading(false) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validItems = formData.items.filter(i => i.productId && i.quantity > 0)
    if (!formData.clientId || validItems.length === 0) return

    try {
      await erpApi.createSale({ clientId: formData.clientId, items: validItems, paymentMethod: formData.paymentMethod, notes: formData.notes } as Parameters<typeof erpApi.createSale>[0])
      loadData()
      setShowForm(false)
      setFormData({ clientId: '', items: [{ productId: '', quantity: 1 }], paymentMethod: 'cash', notes: '' })
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : 'Erro ao criar venda')
    }
  }

  const addItem = () => setFormData({ ...formData, items: [...formData.items, { productId: '', quantity: 1 }] })
  
  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData({ ...formData, items: formData.items.filter((_, i) => i !== index) })
    }
  }

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [field]: value }
    setFormData({ ...formData, items: newItems })
  }

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => {
      const product = products.find(p => p._id === item.productId)
      return sum + (product ? product.salePrice * item.quantity : 0)
    }, 0)
  }

  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0)

  if (loading) return <Loading />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Vendas</h1>
          <p className="text-slate-500">Pedidos e notas fiscais</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn btn-primary flex items-center gap-2">
          <Plus size={18} /> Nova Venda
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-emerald-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Vendas</p>
              <p className="text-xl font-bold text-slate-800">{sales.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold">R$</span>
            </div>
            <div>
              <p className="text-sm text-slate-500">Receita Total</p>
              <p className="text-xl font-bold text-emerald-600">R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
              <FileText className="text-violet-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Ticket Médio</p>
              <p className="text-xl font-bold text-slate-800">R$ {sales.length > 0 ? (totalRevenue / sales.length).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input type="text" placeholder="Buscar vendas..." className="input pl-10" />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Nova Venda</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cliente</label>
                <select value={formData.clientId} onChange={e => setFormData({ ...formData, clientId: e.target.value })} className="input" required>
                  <option value="">Selecione um cliente</option>
                  {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Itens</label>
                {formData.items.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <select 
                      value={item.productId} 
                      onChange={e => updateItem(index, 'productId', e.target.value)}
                      className="input flex-1"
                    >
                      <option value="">Selecione</option>
                      {products.map(p => <option key={p._id} value={p._id}>{p.name} - R$ {p.salePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</option>)}
                    </select>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      onChange={e => updateItem(index, 'quantity', Number(e.target.value))}
                      className="input w-20" 
                      min={1}
                    />
                    <button type="button" onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">×</button>
                  </div>
                ))}
                <button type="button" onClick={addItem} className="text-sm text-blue-600 hover:text-blue-700">+ Adicionar item</button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Forma de Pagamento</label>
                <select value={formData.paymentMethod} onChange={e => setFormData({ ...formData, paymentMethod: e.target.value as 'cash' | 'card' | 'transfer' | 'credit' })} className="input">
                  <option value="cash">Dinheiro</option>
                  <option value="card">Cartão</option>
                  <option value="transfer">Transferência</option>
                  <option value="credit">Crédito</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Observações</label>
                <textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} className="input" rows={2} />
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-emerald-600">R$ {calculateTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary flex-1">Cancelar</button>
                <button type="submit" className="btn btn-primary flex-1">Finalizar Venda</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-slate-500">Pedido</th>
              <th className="text-left p-4 text-sm font-medium text-slate-500">Cliente</th>
              <th className="text-left p-4 text-sm font-medium text-slate-500">Itens</th>
              <th className="text-left p-4 text-sm font-medium text-slate-500">Total</th>
              <th className="text-left p-4 text-sm font-medium text-slate-500">Status</th>
              <th className="text-left p-4 text-sm font-medium text-slate-500">Data</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale._id} className="table-row">
                <td className="p-4">
                  <span className="font-mono text-sm text-slate-600">{sale.invoiceNumber}</span>
                </td>
                <td className="p-4 font-medium text-slate-800">{sale.clientName}</td>
                <td className="p-4 text-slate-600">{sale.items.length} itens</td>
                <td className="p-4 font-bold text-emerald-600">R$ {sale.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td className="p-4">
                  <span className={clsx("badge", statusColors[sale.status])}>{sale.status}</span>
                </td>
                <td className="p-4 text-slate-500">{new Date(sale.createdAt).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr><td colSpan={6}><EmptyState title="Nenhuma venda encontrada" description="Crie sua primeira venda para começar" /></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}