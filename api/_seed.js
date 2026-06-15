function seedData() {
  const now = new Date();
  return {
    leads: [
      { _id: undefined, name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999', company: 'Tech Solutions', status: 'new', stage: 'lead', value: 15000, probability: 10, source: 'website', notes: 'Interessado em ERP completo', crmClientId: null, expectedCloseDate: null, createdAt: now, updatedAt: now },
      { _id: undefined, name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 88888-8888', company: 'Digital Corp', status: 'contacted', stage: 'qualification', value: 25000, probability: 25, source: 'referral', notes: 'Solicitou proposta', crmClientId: null, expectedCloseDate: null, createdAt: now, updatedAt: now },
      { _id: undefined, name: 'Pedro Costa', email: 'pedro@email.com', phone: '(11) 77777-7777', company: 'Innovate Ltda', status: 'qualified', stage: 'proposal', value: 35000, probability: 50, source: 'social', notes: 'Em negociação avançada', crmClientId: null, expectedCloseDate: null, createdAt: now, updatedAt: now },
      { _id: undefined, name: 'Ana Oliveira', email: 'ana@email.com', phone: '(11) 66666-6666', company: 'Business Inc', status: 'negotiation', stage: 'negotiation', value: 45000, probability: 75, source: 'ads', notes: 'Quase fechando', crmClientId: null, expectedCloseDate: null, createdAt: now, updatedAt: now },
      { _id: undefined, name: 'Carlos Ferreira', email: 'carlos@email.com', phone: '(11) 55555-5555', company: 'StartUp Hub', status: 'won', stage: 'closed_won', value: 50000, probability: 100, source: 'website', notes: 'Cliente convertido', crmClientId: 'client-1', expectedCloseDate: null, createdAt: now, updatedAt: now },
    ],
    clients: [
      { _id: undefined, name: 'Tech Solutions', email: 'contato@techsolutions.com', phone: '(11) 99999-0000', document: '12.345.678/0001-90', documentType: 'cnpj', address: { street: 'Av. Paulista, 1000', city: 'São Paulo', state: 'SP', zipCode: '01310-100', country: 'Brasil' }, status: 'active', score: 85, totalPurchases: 3, totalSpent: 15000, crmLeadId: null, createdAt: now, updatedAt: now },
      { _id: undefined, name: 'Digital Corp', email: 'contato@digitalcorp.com', phone: '(11) 88888-0000', document: '98.765.432/0001-10', documentType: 'cnpj', address: { street: 'Rua Augusta, 500', city: 'São Paulo', state: 'SP', zipCode: '01304-000', country: 'Brasil' }, status: 'active', score: 72, totalPurchases: 5, totalSpent: 28000, crmLeadId: null, createdAt: now, updatedAt: now },
      { _id: undefined, name: 'Innovate Ltda', email: 'contato@innovateltda.com', phone: '(11) 77777-0000', document: '11.222.333/0001-44', documentType: 'cnpj', address: { street: 'Alameda Santos, 200', city: 'São Paulo', state: 'SP', zipCode: '01418-000', country: 'Brasil' }, status: 'active', score: 60, totalPurchases: 2, totalSpent: 8500, crmLeadId: null, createdAt: now, updatedAt: now },
    ],
    products: [
      { _id: undefined, name: 'Software ERP Completo', sku: 'ERP-001', description: 'Sistema de gestão empresarial completo', category: 'Software', costPrice: 1000, salePrice: 2500, quantity: 50, minStock: 10, unit: 'un', active: true, createdAt: now, updatedAt: now },
      { _id: undefined, name: 'Licença Anual ERP', sku: 'LIC-001', description: 'Licença de uso anual do sistema ERP', category: 'Licença', costPrice: 500, salePrice: 1200, quantity: 100, minStock: 20, unit: 'un', active: true, createdAt: now, updatedAt: now },
      { _id: undefined, name: 'Suporte Premium 24/7', sku: 'SUP-001', description: 'Suporte técnico especializado com SLA de 2 horas', category: 'Serviço', costPrice: 200, salePrice: 500, quantity: 30, minStock: 5, unit: 'un', active: true, createdAt: now, updatedAt: now },
      { _id: undefined, name: 'Treinamento Presencial', sku: 'TRE-001', description: 'Capacitação técnica presencial para equipe', category: 'Serviço', costPrice: 300, salePrice: 800, quantity: 20, minStock: 5, unit: 'un', active: true, createdAt: now, updatedAt: now },
      { _id: undefined, name: 'Módulo CRM Avançado', sku: 'CRM-001', description: 'Módulo adicional de CRM com automação', category: 'Software', costPrice: 800, salePrice: 1800, quantity: 3, minStock: 5, unit: 'un', active: true, createdAt: now, updatedAt: now },
    ],
    sales: [
      { _id: undefined, clientId: null, clientName: 'Tech Solutions', items: [{ productId: null, productName: 'Software ERP Completo', quantity: 1, unitPrice: 2500, total: 2500 }], subtotal: 2500, tax: 250, total: 2750, status: 'delivered', invoiceNumber: 'NF00000001', paymentMethod: 'transfer', notes: '', createdAt: now, updatedAt: now },
      { _id: undefined, clientId: null, clientName: 'Digital Corp', items: [{ productId: null, productName: 'Licença Anual ERP', quantity: 5, unitPrice: 1200, total: 6000 }], subtotal: 6000, tax: 600, total: 6600, status: 'confirmed', invoiceNumber: 'NF00000002', paymentMethod: 'card', notes: '', createdAt: now, updatedAt: now },
      { _id: undefined, clientId: null, clientName: 'Tech Solutions', items: [{ productId: null, productName: 'Suporte Premium 24/7', quantity: 2, unitPrice: 500, total: 1000 }], subtotal: 1000, tax: 100, total: 1100, status: 'shipped', invoiceNumber: 'NF00000003', paymentMethod: 'credit', notes: '', createdAt: now, updatedAt: now },
    ],
    transactions: [
      { _id: undefined, type: 'income', category: 'Vendas', amount: 9350, description: 'Vendas do período', date: now, reference: 'sales', referenceId: null, paymentMethod: null, createdAt: now },
      { _id: undefined, type: 'expense', category: 'Salários', amount: 2000, description: 'Folha de pagamento mensal', date: now, reference: 'payroll', referenceId: null, paymentMethod: null, createdAt: now },
      { _id: undefined, type: 'expense', category: 'Marketing', amount: 500, description: 'Campanha de anúncios', date: now, reference: 'marketing', referenceId: null, paymentMethod: null, createdAt: now },
      { _id: undefined, type: 'income', category: 'Serviços', amount: 1800, description: 'Consultoria técnica', date: now, reference: 'services', referenceId: null, paymentMethod: null, createdAt: now },
      { _id: undefined, type: 'expense', category: 'Infraestrutura', amount: 1200, description: 'Hospedagem e servidores', date: now, reference: 'infra', referenceId: null, paymentMethod: null, createdAt: now },
    ],
    syncLogs: [
      { _id: undefined, event: 'lead.converted', source: 'crm', target: 'erp', status: 'success', details: { leadId: 'lead-5', clientId: 'client-1' }, sourceId: null, targetId: null, createdAt: now },
      { _id: undefined, event: 'sale.closed', source: 'crm', target: 'erp', status: 'success', details: { saleId: 'sale-1' }, sourceId: null, targetId: null, createdAt: now },
      { _id: undefined, event: 'stock.updated', source: 'erp', target: 'crm', status: 'success', details: { productId: 'prod-1', previousQuantity: 50, newQuantity: 49 }, sourceId: null, targetId: null, createdAt: now },
    ],
    interactions: [],
  };
}

module.exports = { seedData };
