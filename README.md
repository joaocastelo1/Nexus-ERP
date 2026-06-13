<div align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-22C55E?style=flat-square" alt="Status"/>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-8B5CF6?style=flat-square" alt="PRs"/>
  <img src="https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat-square&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/Made%20with-TypeScript-3178C6?style=flat-square&logo=typescript" alt="TypeScript"/>
  <br/>
  <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fjoaocastelo%2Fnexus-erp-crm&countColor=%236366F1&style=flat-square" alt="Visitors"/>
</div>

<br/>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=28&pause=1000&color=6366F1&center=true&vCenter=true&width=600&lines=Nexus+ERP+%2B+CRM;Full-Stack+Enterprise+Platform;React+%7C+TypeScript+%7C+Node.js;Sistema+Integrado+de+Gest%C3%A3o" alt="Typing SVG" />
</p>

<p align="center">
  <strong>Uma plataforma full-stack empresarial que unifica CRM e ERP em uma única experiência,<br/>com sincronização automática entre módulos, dashboard analítico e arquitetura moderna.</strong>
</p>

<br/>

<div align="center">
  <a href="#-visão-geral">Visão Geral</a> •
  <a href="#-stack-tecnológica">Stack</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-arquitetura">Arquitetura</a> •
  <a href="#-como-executar">Executar</a> •
  <a href="#-deploy">Deploy</a>
</div>

<br/>

---

## 📋 Visão Geral

**Nexus ERP + CRM** é um sistema completo de gestão empresarial desenvolvido para demonstrar proficiência em desenvolvimento full-stack moderno. O projeto simula um ambiente corporativo real onde módulos de CRM (Gestão de Relacionamento com Clientes) e ERP (Planejamento de Recursos Empresariais) operam de forma integrada.

### 🎯 Objetivos Técnicos Demonstrados

| Habilidade | Implementação |
|-----------|--------------|
| **React 18 + TypeScript** | Componentes funcionais, hooks, tipagem estática |
| **Arquitetura Serverless** | API pronta para Vercel Functions |
| **REST API Design** | Endpoints padronizados com Express |
| **Gerenciamento de Estado** | Zustand para estado global |
| **Visualização de Dados** | Recharts com gráficos interativos |
| **UI/UX Profissional** | Tailwind CSS, responsivo, componentes reutilizáveis |
| **Integração de Sistemas** | Sincronização CRM ↔ ERP com logs de auditoria |

<br/>

## 🛠 Stack Tecnológica

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-593D88?style=for-the-badge&logo=react&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6B6B?style=for-the-badge&logo=chartdotjs&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### Deploy
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

<br/>

## ✨ Funcionalidades

### 🟣 Módulo CRM

| Funcionalidade | Descrição |
|---------------|-----------|
| **Gestão de Leads** | CRUD completo com visualização em lista e Kanban |
| **Pipeline de Vendas** | Funil visual com 6 estágios (Lead → Fechado) |
| **Clientes** | Cadastro completo com score, histórico e métricas |
| **Interações** | Registro de chamadas, e-mails, reuniões por cliente |

### 🟢 Módulo ERP

| Funcionalidade | Descrição |
|---------------|-----------|
| **Controle de Estoque** | Produtos com SKU, alerta de estoque mínimo, margem |
| **Gestão de Vendas** | Pedidos vinculados a clientes, cálculo automático de impostos |
| **Financeiro** | Receitas/despesas, DRE simplificado, fluxo de caixa |
| **Dashboard** | Métricas integradas com gráficos em tempo real |

### 🔄 Integração CRM ↔ ERP

```
Lead Convertido → Cliente Criado no CRM
       ↓
Venda Fechada → Pedido Criado no ERP
       ↓
Estoque Debitado → Transação Financeira Registrada
       ↓
Histórico Unificado → Cliente Visualiza Compras
```

<br/>

## 🏗 Arquitetura

```
nexus-erp-crm/
├── api/                    # 🚀 Vercel Serverless Functions
│   ├── crm/                #    Endpoints do CRM
│   ├── erp/                #    Endpoints do ERP
│   └── integration/        #    Endpoints de integração
├── backend/                # 🖥 Servidor Express (dev local)
│   └── src/
│       ├── controllers/    # Lógica das rotas
│       ├── models/         # Schemas Mongoose
│       ├── routes/         # Definição de rotas
│       ├── middleware/     # Error handler, validação
│       └── config/         # Database, dataStore
├── frontend/               # 🎨 React + Vite + TypeScript
│   └── src/
│       ├── components/     # Componentes reutilizáveis
│       │   ├── ui/         # Button, Card, Loading, ErrorBoundary...
│       │   ├── layout/     # Sidebar, Header, Layout
│       │   └── features/   # Componentes de domínio
│       ├── pages/          # Páginas (CRM, ERP, Dashboard)
│       ├── services/       # API client (Axios)
│       ├── stores/         # Zustand stores
│       ├── types/          # TypeScript interfaces
│       └── hooks/          # Custom hooks
└── [config files]          # Vercel, Tailwind, TypeScript
```

<br/>

## 🚀 Como Executar

```bash
# 1. Clone o repositório
git clone https://github.com/joaocastelo/nexus-erp-crm.git
cd nexus-erp-crm

# 2. Instale as dependências
npm install
npm --prefix frontend install

# 3. Configure as variáveis de ambiente
cp .env.example .env

# 4. Inicie o backend (Express na porta 5000)
npm run dev

# 5. Em outro terminal, inicie o frontend (Vite na porta 3000)
npm run dev:frontend

# 6. Acesse http://localhost:3000
```

> **Nota:** O projeto usa um data store em memória com dados de demonstração. Para persistência real, configure `MONGODB_URI` no `.env`.

<br/>

## 🌐 Deploy

O projeto está configurado para deploy contínuo na **Vercel**:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
# Deploy manual via CLI
npm i -g vercel
vercel --prod
```

A configuração de deploy está em `vercel.json`:
- **Serverless Functions**: API em `/api/*`
- **Static Assets**: Frontend build em `frontend/dist/`
- **Rewrites**: SPA routing para React Router

<br/>

## 📊 Endpoints da API

### CRM
| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/crm/leads` | Listar leads |
| `POST` | `/api/crm/leads` | Criar lead |
| `PUT` | `/api/crm/leads/:id` | Atualizar lead |
| `DELETE` | `/api/crm/leads/:id` | Excluir lead |
| `GET` | `/api/crm/clients` | Listar clientes |
| `POST` | `/api/crm/clients` | Criar cliente |
| `GET` | `/api/crm/pipeline` | Pipeline de vendas |

### ERP
| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/erp/products` | Listar produtos |
| `POST` | `/api/erp/products` | Criar produto |
| `GET` | `/api/erp/sales` | Listar vendas |
| `POST` | `/api/erp/sales` | Criar venda |
| `GET` | `/api/erp/transactions` | Listar transações |
| `GET` | `/api/erp/finance/summary` | Resumo financeiro |

### Integração
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/integration/convert-lead` | Converter lead em cliente |
| `POST` | `/api/integration/create-sale` | Criar venda a partir de lead |
| `GET` | `/api/integration/sync-logs` | Logs de sincronização |
| `GET` | `/api/integration/dashboard` | Dados do dashboard |

<br/>

## 🧪 Fluxo de Demonstração

```
1. Crie um Lead → "João Silva, joao@email.com, R$ 15.000"
2. Mude o estágio do lead pelo pipeline (Lead → Qualificação → Proposta)
3. Converta o lead em cliente
4. Crie um produto → "Notebook" com estoque 10
5. Crie uma venda para o cliente com 2 notebooks
6. Verifique: estoque = 8, receita gerada, cliente com histórico
```

<br/>

## 👨‍💻 Desenvolvedor

<div align="center">
  <p><strong>João Castelo de Sousa Ferreira</strong></p>
  <p>Desenvolvedor Full Stack</p>
  
  <a href="https://github.com/joaocastelo">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github" alt="GitHub"/>
  </a>
  <a href="https://linkedin.com/in/joaocastelo">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin" alt="LinkedIn"/>
  </a>
  <a href="mailto:joao.castelo@email.com">
    <img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail" alt="Email"/>
  </a>
</div>

<br/>

---

<div align="center">
  <sub>Built with ❤️ using React, TypeScript, Node.js & Express</sub>
  <br/>
  <sub>© 2024 João Castelo — Todos os direitos reservados</sub>
  <br/>
  <sub>
    <a href="#-visão-geral">Voltar ao topo ↑</a>
  </sub>
</div>
