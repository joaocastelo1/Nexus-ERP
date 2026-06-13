# SPEC.md - Sistema Integrado ERP + CRM

## 1. Visão Geral do Projeto

**Nome do Projeto:** BizFlow - Sistema Integrado ERP + CRM  
**Tipo:** Aplicação Web Empresarial Full-Stack  
**Funcionalidade Principal:** Sistema unificado que combina gestão de relacionamento com clientes (CRM) e planejamento de recursos empresariais (ERP), com sincronização automática entre módulos.  
**Usuários Alvo:** Empresas de médio porte que precisam gerenciar clientes, vendas, estoque e financeiro em uma única plataforma.

---

## 2. Especificação de UI/UX

### 2.1 Estrutura de Layout

**Arquitetura de Navegação:**
- Sidebar fixa à esquerda (260px) com navegação principal
- Header superior com busca global, notificações e perfil do usuário
- Área de conteúdo principal com breadcrumbs
- Footer mínimo com versão do sistema

**Breakpoints Responsivos:**
- Desktop: 1200px+ (sidebar expansiva)
- Tablet: 768px-1199px (sidebar colapsada com ícones)
- Mobile: <768px (menu hamburger)

**Organização das Páginas:**
1. **Dashboard** - Visão geral com métricas integradas
2. **CRM**
   - Leads (lista e kanban)
   - Pipeline (funil de vendas)
   - Clientes (cadastro e histórico)
   - Interações (ligações, mensagens, reuniões)
3. **ERP**
   - Estoque (produtos e inventário)
   - Vendas (pedidos e notas)
   - Financeiro (entradas, saídas, fluxo de caixa)
4. **Integrações** - Logs de sincronização e configurações

### 2.2 Design Visual

**Paleta de Cores:**
- Primária: `#0F172A` (slate-900) - Sidebar e headers
- Secundária: `#3B82F6` (blue-500) - Ações principais
- Acento CRM: `#8B5CF6` (violet-500) - Elementos CRM
- Acento ERP: `#10B981` (emerald-500) - Elementos ERP
- Fundo: `#F8FAFC` (slate-50) - Background principal
- Cards: `#FFFFFF` (white)
- Bordas: `#E2E8F0` (slate-200)
- Texto Primário: `#1E293B` (slate-800)
- Texto Secundário: `#64748B` (slate-500)
- Sucesso: `#22C55E` (green-500)
- Alerta: `#F59E0B` (amber-500)
- Erro: `#EF4444` (red-500)

**Tipografia:**
- Família: Inter (system-ui fallback)
- Headings:
  - H1: 28px/700
  - H2: 22px/600
  - H3: 18px/600
  - H4: 16px/500
- Body: 14px/400
- Small: 12px/400

**Sistema de Espaçamento:**
- Base: 4px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

**Efeitos Visuais:**
- Sombras Cards: `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)`
- Sombras Hover: `0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)`
- Border Radius: 8px (cards), 6px (inputs), 4px (buttons small)
- Transições: 150ms ease-in-out

### 2.3 Componentes UI

**Componentes Principais:**
- Cards com hover lift effect
- Tables com zebra striping e hover highlight
- Forms com labels flutuantes
- Buttons: primary (blue), secondary (gray), success (green), danger (red)
- Badges/Tags para status
- Modals com backdrop blur
- Tooltips em elementos de ação
- Progress bars para pipeline
- Charts para dashboard

** Estados dos Componentes:**
- Default, Hover (+shadow, +translate-y-1), Active (scale-98), Disabled (opacity-50)
- Input focus: ring-2 ring-blue-500/20

---

## 3. Especificação Funcional

### 3.1 Módulo CRM

**Leads:**
- CRUD de leads com campos: nome, email, telefone, empresa, fonte
- Status: novo, contactado, qualificado, conversão, perdido
- Kanban view para visualização do funil
- Lista view com filtros e ordenação

**Pipeline:**
- Visualização em stages: Lead → Qualificação → Proposta → Negociação → Fechado/Perdido
- Drag and drop entre stages
- Valor total por stage
- Probabilidade de conversão por stage

**Clientes:**
- Cadastro com dados完整的 (nome, CPF/CNPJ, endereço, contato)
- Histórico de interações vinculadas
- Histórico de compras (vindas do ERP)
- Status: ativo, inativo, bloqueado
- Score de clientes (1-100 baseado em interações e compras)

**Interações:**
- Tipos: ligação, email, reunião, nota
- Cronologia por cliente
- Agendamento de follow-ups
- Lembretes automáticos

### 3.2 Módulo ERP

**Estoque:**
- CRUD de produtos: nome, SKU, descrição, categoria, preço custo, preço venda
- Controle de quantidade por local
- Alertas de estoque mínimo
- Histórico de movimentações (entrada, saída)
- Precificação automática com margem configurável

**Vendas:**
- Criação de pedido vinculado a cliente do CRM
- Itens do pedido com quantidade e preço
- Cálculo automático de total com impostos simulados
- Status: orçamento, confirmado, enviado, entregue, cancelado
- Geração de nota fiscal simulada (PDF)
- Atualização automática do estoque

**Financeiro:**
- Entradas: vendas, outras receitas
- Saídas: custos, despesas operacionais
- Fluxo de caixa por período
- Demonstrativo de resultados (DRE simplificado)
- Lucro bruto por venda
- Dashboard financeiro com gráficos

### 3.3 Integração CRM-ERP

**Regras de Sincronização:**
1. Venda no ERP requer cliente do CRM obrigatório
2. Fechamento de venda no CRM (status "fechado ganho") → cria venda no ERP
3. Venda no ERP → debita quantidade do estoque
4. Venda no ERP → gera entrada financeira
5. Cliente no CRM → visualiza histórico de compras do ERP
6. Lead convertido → cliente automático no ERP

**Eventos de Sincronização:**
- `lead.converted` - Cria cliente
- `sale.closed` - Cria venda + estoque + financeiro
- `product.updated` - Atualiza cache em tempo real

### 3.4 Dashboard Unificado

**Métricas CRM:**
- Total de leads (por status)
- Taxa de conversão (leads → clientes)
- Valor do pipeline por stage
- Clientes ativos
- Interações realizadas (por período)

**Métricas ERP:**
- Vendas do período (quantidade e valor)
- Estoque total (itens e valor)
- Receitas, despesas e lucro
- Produto mais vendido
- Ticket médio

**Métricas Integradas:**
- Receita por cliente (média)
- Ciclo médio de venda (lead → fechamento)
- Cliente mais valioso

---

## 4. Arquitetura Técnica

### 4.1 Backend (Node.js + Express)

**Estrutura de Diretórios:**
```
backend/
├── src/
│   ├── config/         # Configurações (DB, env)
│   ├── controllers/   # Lógica de rotas
│   ├── models/        # Modelos MongoDB
│   ├── routes/        # Definição de rotas
│   ├── services/      # Regras de negócio
│   ├── middleware/    # Auth, validation, error
│   └── utils/         # Helpers
├── package.json
└── server.js
```

**Endpoints API:**

CRM:
- `GET/POST /api/crm/leads`
- `GET/PUT/DELETE /api/crm/leads/:id`
- `GET/POST /api/crm/clients`
- `GET/PUT/DELETE /api/crm/clients/:id`
- `GET/POST /api/crm/interactions`
- `GET /api/crm/pipeline`

ERP:
- `GET/POST /api/erp/products`
- `GET/PUT/DELETE /api/erp/products/:id`
- `GET/POST /api/erp/sales`
- `GET/PUT /api/erp/sales/:id`
- `GET/POST /api/erp/transactions`
- `GET /api/erp/finance/summary`

Integração:
- `POST /api/integration/convert-lead`
- `POST /api/integration/create-sale`
- `GET /api/integration/sync-logs`

### 4.2 Frontend (React + TypeScript)

**Estrutura de Diretórios:**
```
frontend/
├── src/
│   ├── components/    # Componentes reutilizáveis
│   │   ├── ui/        # Base components (Button, Input, etc)
│   │   ├── layout/    # Layout components (Sidebar, Header)
│   │   └── features/  # Componentes de domínio
│   ├── pages/         # Páginas principais
│   ├── hooks/         # Custom hooks
│   ├── services/      # API calls
│   ├── stores/        # Zustand stores
│   ├── types/         # TypeScript types
│   └── utils/         # Helpers
├── package.json
└── vite.config.ts
```

### 4.3 Banco de Dados (MongoDB)

**Collections:**

Leads: `{ _id, name, email, phone, company, source, status, value, notes, createdAt, updatedAt }`

Clients: `{ _id, name, email, phone, document, address, status, score, crmId, createdAt, updatedAt }`

Interactions: `{ _id, clientId, type, description, date, nextAction, createdAt }`

Products: `{ _id, name, sku, description, category, costPrice, salePrice, quantity, minStock, createdAt, updatedAt }`

Sales: `{ _id, clientId, items: [{productId, quantity, price}], total, status, invoiceNumber, createdAt, updatedAt }`

Transactions: `{ _id, type, category, amount, description, date, createdAt }`

SyncLogs: `{ _id, event, source, target, status, details, createdAt }`

---

## 5. Critérios de Aceitação

### Funcionalidades Obrigatórias:
- [ ] Dashboard com métricas integradas CRM + ERP
- [ ] CRUD completo de Leads com Kanban
- [ ] CRUD completo de Clientes com histórico
- [ ] Registro de interações (ligação, email, reunião)
- [ ] CRUD completo de Produtos (estoque)
- [ ] Criação de Vendas vinculada a Cliente
- [ ] Atualização automática de estoque após venda
- [ ] Registro automático de entrada financeira
- [ ] Visualização de histórico unificado por cliente
- [ ] Pipeline可视化 de vendas

### Critérios Visuais:
- [ ] Sidebar com cores conforme módulo (CRM=violet, ERP=emerald)
- [ ] Cards com hover effect
- [ ] Forms com validação visual
- [ ] Tables com alternância de cores
- [ ] Status com cores específicas (sucesso/alerta/erro)
- [ ] Gráficos no dashboard

### Critérios de Integração:
- [ ] Conversão de Lead cria Cliente automaticamente
- [ ] Fechamento de venda atualiza estoque automaticamente
- [ ] Venda gera entrada financeira automaticamente
- [ ] Cliente mostra compras do ERP

---

## 6. Fluxo de Demonstração

Para testar a integração completa:
1. Criar Lead → "João Silva"
2. Mover Lead pelo Pipeline
3. Converter Lead em Cliente
4. Criar Produto "Notebook" com estoque 10
5. Criar Venda para João Silva (2 Notebooks)
6. Verificar: estoque 8, entrada R$ 10.000, cliente com compra

---

## 7. Stack Final

- **Frontend:** React 18 + TypeScript + Tailwind CSS + Vite
- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **HTTP Client:** Axios
- **State Management:** Zustand
- **Icons:** Lucide React
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod