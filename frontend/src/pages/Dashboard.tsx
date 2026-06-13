import { useEffect, useState } from 'react'
import { integrationApi } from '../services/api'
import type { DashboardData } from '../types'
import { Users, UserCheck, ShoppingCart, Package, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import Loading from '../components/ui/Loading'

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444']

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setError(null)
      const result = await integrationApi.getDashboardData()
      setData(result)
    } catch (err) {
      setError('Erro ao carregar dashboard')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading message="Carregando dashboard..." />
  if (error) return (
    <div className="text-center py-12">
      <p className="text-red-500 mb-4">{error}</p>
      <button onClick={loadData} className="btn btn-primary">Tentar novamente</button>
    </div>
  )

  const statusColors: Record<string, string> = {
    new: '#3B82F6',
    contacted: '#8B5CF6',
    qualified: '#10B981',
    proposal: '#F59E0B',
    negotiation: '#F97316',
    won: '#22C55E',
    lost: '#EF4444'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500">Visão geral do sistema</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Leads</p>
              <p className="text-2xl font-bold text-slate-800">{data?.leadsByStatus.reduce((s, l) => s + l.count, 0) || 0}</p>
            </div>
            <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center">
              <Users className="text-violet-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Clientes Ativos</p>
              <p className="text-2xl font-bold text-slate-800">{data?.clients.active || 0}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserCheck className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Vendas Realizadas</p>
              <p className="text-2xl font-bold text-slate-800">{data?.sales.total || 0}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-emerald-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Produtos</p>
              <p className="text-2xl font-bold text-slate-800">{data?.products.total || 0}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Package className="text-amber-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Receita Mensal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.revenueByMonth.map(m => ({ month: m._id, revenue: m.total })) || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Leads por Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data?.leadsByStatus || []}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ _id, count }) => `${_id}: ${count}`}
              >
                {data?.leadsByStatus.map((entry, index) => (
                  <Cell key={entry._id} fill={statusColors[entry._id] || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Financeiro</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-emerald-600" size={20} />
                <span className="text-slate-600">Receitas</span>
              </div>
              <span className="font-bold text-emerald-600">R$ {data?.sales.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingDown className="text-red-600" size={20} />
                <span className="text-slate-600">Despesas</span>
              </div>
              <span className="font-bold text-red-600">R$ {data?.sales.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <DollarSign className="text-blue-600" size={20} />
                <span className="text-slate-600">Lucro</span>
              </div>
              <span className="font-bold text-blue-600">R$ {data?.sales.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}</span>
            </div>
          </div>
        </div>

        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Clientes Mais Valiosos</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                  <th className="pb-3 font-medium">Cliente</th>
                  <th className="pb-3 font-medium">Compras</th>
                  <th className="pb-3 font-medium">Total Gasto</th>
                </tr>
              </thead>
              <tbody>
                {data?.topClients.map((client, i) => (
                  <tr key={client._id} className="table-row">
                    <td className="py-3 font-medium text-slate-800">{client.name}</td>
                    <td className="py-3 text-slate-600">{client.totalPurchases}</td>
                    <td className="py-3 text-emerald-600 font-medium">R$ {client.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
                {(!data?.topClients || data.topClients.length === 0) && (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-slate-500">Nenhum cliente ainda</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}