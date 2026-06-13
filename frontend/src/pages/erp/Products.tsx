import { useEffect, useState } from 'react'
import { erpApi } from '../../services/api'
import type { Product } from '../../types'
import { Plus, Search, Package, AlertTriangle } from 'lucide-react'
import Loading from '../../components/ui/Loading'
import EmptyState from '../../components/ui/EmptyState'
import clsx from 'clsx'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', sku: '', description: '', category: '', costPrice: 0, salePrice: 0, quantity: 0, minStock: 5, unit: 'un' })

  useEffect(() => { loadProducts() }, [])

  const loadProducts = async () => {
    try {
      const data = await erpApi.getProducts()
      setProducts(data)
    } catch (error) { console.error(error) }
    finally { setLoading(false) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await erpApi.createProduct(formData)
      loadProducts()
      setShowForm(false)
      setFormData({ name: '', sku: '', description: '', category: '', costPrice: 0, salePrice: 0, quantity: 0, minStock: 5, unit: 'un' })
    } catch (error) { console.error(error) }
  }

  const updateStock = async (id: string, newQuantity: number) => {
    try {
      await erpApi.updateProduct(id, { quantity: newQuantity })
      loadProducts()
    } catch (error) { console.error(error) }
  }

  const lowStockProducts = products.filter(p => p.quantity <= p.minStock)
  const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.costPrice), 0)

  if (loading) return <Loading />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Estoque</h1>
          <p className="text-slate-500">Gerenciamento de produtos e inventário</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn btn-primary flex items-center gap-2">
          <Plus size={18} /> Novo Produto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Package className="text-emerald-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Produtos</p>
              <p className="text-xl font-bold text-slate-800">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-amber-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Estoque Baixo</p>
              <p className="text-xl font-bold text-amber-600">{lowStockProducts.length}</p>
            </div>
          </div>
        </div>
        <div className="card col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold">R$</span>
            </div>
            <div>
              <p className="text-sm text-slate-500">Valor Total em Estoque</p>
              <p className="text-xl font-bold text-slate-800">R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input type="text" placeholder="Buscar produtos..." className="input pl-10" />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Novo Produto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="input" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">SKU</label>
                  <input type="text" value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} className="input" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
                  <input type="text" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Preço Custo</label>
                  <input type="number" value={formData.costPrice} onChange={e => setFormData({ ...formData, costPrice: Number(e.target.value) })} className="input" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Preço Venda</label>
                  <input type="number" value={formData.salePrice} onChange={e => setFormData({ ...formData, salePrice: Number(e.target.value) })} className="input" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Quantidade</label>
                  <input type="number" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })} className="input" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Estoque Mínimo</label>
                  <input type="number" value={formData.minStock} onChange={e => setFormData({ ...formData, minStock: Number(e.target.value) })} className="input" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                  <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="input" rows={2} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary flex-1">Cancelar</button>
                <button type="submit" className="btn btn-primary flex-1">Criar Produto</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-slate-500">Produto</th>
              <th className="text-left p-4 text-sm font-medium text-slate-500">SKU</th>
              <th className="text-left p-4 text-sm font-medium text-slate-500">Categoria</th>
              <th className="text-left p-4 text-sm font-medium text-slate-500">Custo</th>
              <th className="text-left p-4 text-sm font-medium text-slate-500">Venda</th>
              <th className="text-left p-4 text-sm font-medium text-slate-500">Estoque</th>
              <th className="text-left p-4 text-sm font-medium text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              const margin = ((product.salePrice - product.costPrice) / product.costPrice) * 100
              return (
                <tr key={product._id} className="table-row">
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-slate-800">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.description?.substring(0, 40)}</p>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">{product.sku}</td>
                  <td className="p-4 text-slate-600">{product.category || '-'}</td>
                  <td className="p-4 text-slate-600">R$ {product.costPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-4 text-slate-800 font-medium">R$ {product.salePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={product.quantity <= product.minStock ? "text-amber-600 font-bold" : "text-slate-800"}>{product.quantity}</span>
                      <span className="text-xs text-slate-400">{product.unit}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {product.quantity <= product.minStock ? (
                      <span className="badge bg-amber-100 text-amber-800">Estoque Baixo</span>
                    ) : (
                      <span className="badge bg-emerald-100 text-emerald-800">Normal</span>
                    )}
                  </td>
                </tr>
              )
            })}
            {products.length === 0 && (
              <tr><td colSpan={7}><EmptyState title="Nenhum produto encontrado" description="Cadastre seu primeiro produto no estoque" /></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}