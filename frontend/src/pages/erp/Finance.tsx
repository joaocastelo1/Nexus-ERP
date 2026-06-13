import { useEffect, useState } from 'react'
import { erpApi } from '../../services/api'
import type { Transaction } from '../../types'
import { Plus, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import Loading from '../../components/ui/Loading'
import EmptyState from '../../components/ui/EmptyState'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#22C55E', '#EF4444', '#3B82F6', '#8B5CF6', '#F59E0B', '#10B981']

export default function Finance() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [summary, setSummary] = useState<{ incomes: { _id: string; total: number }[]; expenses: { _id: string; total: number }[]; totalIncome: number; totalExpense: number; profit: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [period, setPeriod] = useState('month')
  const [formData, setFormData] = useState<{ type: 'income' | 'expense'; category: string; amount: number; description: string; date: string }>({ type: 'income', category: '', amount: 0, description: '', date: new Date().toISOString().split('T')[0] })

  useEffect(() => { loadData() }, [period])

  const loadData = async () => {
    try {
      const [transactionsData, summaryData] = await Promise.all([
        erpApi.getTransactions(),
        erpApi.getFinanceSummary(period)
      ])
      setTransactions(transactionsData)
      setSummary(summaryData)
    } catch (error) { console.error(error) }
    finally { setLoading(false) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await erpApi.createTransaction({ ...formData, date: formData.date } as Parameters<typeof erpApi.createTransaction>[0])
      loadData()
      setShowForm(false)
      setFormData({ type: 'income', category: '', amount: 0, description: '', date: new Date().toISOString().split('T')[0] })
    } catch (error) { console.error(error) }
  }

  if (loading) return <Loading />

  const pieData = [
    ...(summary?.incomes.map(i => ({ name: i._id, value: i.total, type: 'income' })) || []),
    ...(summary?.expenses.map(e => ({ name: e._id, value: e.total, type: 'expense' })) || [])
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Financeiro</h1>
          <p className="text-slate-500">Controle de receitas e despesas</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn btn-primary flex items-center gap-2">
          <Plus size={18} /> Nova Transação
        </button>
      </div>

      <div className="flex gap-2">
        {['week', 'month', 'year', 'all'].map(p => (
          <button 
            key={p} 
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${period === p ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {p === 'all' ? 'Todos' : p === 'week' ? 'Semana' : p === 'month' ? 'Mês' : 'Ano'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-emerald-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Receitas</p>
              <p className="text-xl font-bold text-emerald-600">R$ {summary?.totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Despesas</p>
              <p className="text-xl font-bold text-red-600">R$ {summary?.totalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Lucro</p>
              <p className={`text-xl font-bold ${(summary?.profit || 0) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                R$ {summary?.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Receitas por Categoria</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={summary?.incomes || []} dataKey="total" nameKey="_id" cx="50%" cy="50%" outerRadius={80} label={({ _id, total }) => `${_id}: R$ ${total.toLocaleString('pt-BR')}`}>
                {(summary?.incomes || []).map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Despesas por Categoria</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={summary?.expenses || []} dataKey="total" nameKey="_id" cx="50%" cy="50%" outerRadius={80} label={({ _id, total }) => `${_id}: R$ ${total.toLocaleString('pt-BR')}`}>
                {(summary?.expenses || []).map((_, index) => <Cell key={index} fill={COLORS[(index + 2) % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Nova Transação</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })} className="input">
                  <option value="income">Receita</option>
                  <option value="expense">Despesa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
                <input type="text" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="input" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Valor</label>
                <input type="number" value={formData.amount} onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })} className="input" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="input" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data</label>
                <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="input" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary flex-1">Cancelar</button>
                <button type="submit" className="btn btn-primary flex-1">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Transações Recentes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-slate-500">Data</th>
                <th className="text-left p-3 text-sm font-medium text-slate-500">Tipo</th>
                <th className="text-left p-3 text-sm font-medium text-slate-500">Categoria</th>
                <th className="text-left p-3 text-sm font-medium text-slate-500">Descrição</th>
                <th className="text-left p-3 text-sm font-medium text-slate-500">Valor</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t._id} className="table-row">
                  <td className="p-3 text-slate-600">{new Date(t.date).toLocaleDateString('pt-BR')}</td>
                  <td className="p-3">
                    <span className={t.type === 'income' ? 'badge bg-emerald-100 text-emerald-800' : 'badge bg-red-100 text-red-800'}>
                      {t.type === 'income' ? 'Receita' : 'Despesa'}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{t.category}</td>
                  <td className="p-3 text-slate-600">{t.description || '-'}</td>
                  <td className={`p-3 font-medium ${t.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {t.type === 'income' ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr><td colSpan={5}><EmptyState title="Nenhuma transação encontrada" description="Registre sua primeira transação financeira" /></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}