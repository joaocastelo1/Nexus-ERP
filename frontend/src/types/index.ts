export interface Lead {
  _id: string
  name: string
  email: string
  phone?: string
  company?: string
  source: 'website' | 'referral' | 'social' | 'ads' | 'other'
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
  value: number
  notes?: string
  stage: 'lead' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost'
  probability: number
  expectedCloseDate?: string
  crmClientId?: string
  createdAt: string
  updatedAt: string
}

export interface Client {
  _id: string
  name: string
  email: string
  phone?: string
  document?: string
  documentType?: 'cpf' | 'cnpj'
  address?: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  status: 'active' | 'inactive' | 'blocked'
  score: number
  totalPurchases: number
  totalSpent: number
  crmLeadId?: string
  createdAt: string
  updatedAt: string
}

export interface Interaction {
  _id: string
  clientId: string | Client
  type: 'call' | 'email' | 'meeting' | 'note'
  description: string
  date: string
  nextAction?: string
  nextActionDate?: string
  outcome?: string
  createdAt: string
}

export interface Product {
  _id: string
  name: string
  sku: string
  description?: string
  category?: string
  costPrice: number
  salePrice: number
  quantity: number
  minStock: number
  unit: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface SaleItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Sale {
  _id: string
  clientId: string | Client
  clientName: string
  items: SaleItem[]
  subtotal: number
  tax: number
  total: number
  status: 'draft' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  invoiceNumber?: string
  paymentMethod: 'cash' | 'card' | 'transfer' | 'credit'
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Transaction {
  _id: string
  type: 'income' | 'expense'
  category: string
  amount: number
  description?: string
  date: string
  reference?: string
  referenceId?: string
  paymentMethod?: string
  createdAt: string
}

export interface SyncLog {
  _id: string
  event: string
  source: string
  target: string
  status: 'success' | 'failed' | 'pending'
  details?: Record<string, unknown>
  sourceId?: string
  targetId?: string
  createdAt: string
}

export interface DashboardData {
  leadsByStatus: { _id: string; count: number }[]
  clients: { total: number; active: number }
  sales: { total: number; revenue: number; expenses: number; profit: number }
  products: { total: number; lowStock: number }
  revenueByMonth: { _id: string; total: number; count?: number }[]
  salesByMonth: { _id: string; count: number; total: number }[]
  topClients: { _id: string; name: string; totalSpent: number; totalPurchases: number }[]
}