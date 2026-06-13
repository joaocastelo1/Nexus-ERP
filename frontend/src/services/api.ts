import axios from 'axios'
import type { Lead, Client, Interaction, Product, Sale, Transaction, SyncLog, DashboardData } from '../types'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
})

export const crmApi = {
  getLeads: () => api.get<Lead[]>('/crm/leads').then(r => r.data),
  createLead: (data: Partial<Lead>) => api.post<Lead>('/crm/leads', data).then(r => r.data),
  updateLead: (id: string, data: Partial<Lead>) => api.put<Lead>(`/crm/leads/${id}`, data).then(r => r.data),
  deleteLead: (id: string) => api.delete(`/crm/leads/${id}`),
  
  getClients: () => api.get<Client[]>('/crm/clients').then(r => r.data),
  getClient: (id: string) => api.get<{ client: Client; interactions: Interaction[]; purchases: Sale[] }>(`/crm/clients/${id}`).then(r => r.data),
  createClient: (data: Partial<Client>) => api.post<Client>('/crm/clients', data).then(r => r.data),
  updateClient: (id: string, data: Partial<Client>) => api.put<Client>(`/crm/clients/${id}`, data).then(r => r.data),
  deleteClient: (id: string) => api.delete(`/crm/clients/${id}`),
  
  getInteractions: (clientId?: string) => api.get<Interaction[]>('/crm/interactions', { params: { clientId } }).then(r => r.data),
  createInteraction: (data: Partial<Interaction>) => api.post<Interaction>('/crm/interactions', data).then(r => r.data),
  
  getPipeline: () => api.get('/crm/pipeline').then(r => r.data),
  getStats: () => api.get('/crm/stats').then(r => r.data)
}

export const erpApi = {
  getProducts: () => api.get<Product[]>('/erp/products').then(r => r.data),
  getProduct: (id: string) => api.get<Product>(`/erp/products/${id}`).then(r => r.data),
  createProduct: (data: Partial<Product>) => api.post<Product>('/erp/products', data).then(r => r.data),
  updateProduct: (id: string, data: Partial<Product>) => api.put<Product>(`/erp/products/${id}`, data).then(r => r.data),
  deleteProduct: (id: string) => api.delete(`/erp/products/${id}`),
  
  getSales: () => api.get<Sale[]>('/erp/sales').then(r => r.data),
  getSale: (id: string) => api.get<Sale>(`/erp/sales/${id}`).then(r => r.data),
  createSale: (data: Partial<Sale>) => api.post<Sale>('/erp/sales', data).then(r => r.data),
  updateSaleStatus: (id: string, data: { status: string }) => api.put<Sale>(`/erp/sales/${id}`, data).then(r => r.data),
  
  getTransactions: (params?: { type?: string; startDate?: string; endDate?: string }) => 
    api.get<Transaction[]>('/erp/transactions', { params }).then(r => r.data),
  createTransaction: (data: Partial<Transaction>) => api.post<Transaction>('/erp/transactions', data).then(r => r.data),
  getFinanceSummary: (period?: string) => api.get('/erp/finance/summary', { params: { period } }).then(r => r.data),
  getStats: () => api.get('/erp/stats').then(r => r.data)
}

export const integrationApi = {
  convertLead: (leadId: string) => api.post('/integration/convert-lead', { leadId }).then(r => r.data),
  createSaleFromLead: (data: { leadId: string; items: { productId: string; quantity: number }[]; paymentMethod?: string; notes?: string }) => 
    api.post('/integration/create-sale', data).then(r => r.data),
  getSyncLogs: () => api.get<SyncLog[]>('/integration/sync-logs').then(r => r.data),
  getDashboardData: () => api.get<DashboardData>('/integration/dashboard').then(r => r.data)
}

export default api