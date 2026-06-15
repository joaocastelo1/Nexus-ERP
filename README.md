<div align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-22C55E?style=flat-square" alt="Status"/>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-8B5CF6?style=flat-square" alt="PRs"/>
  <img src="https://img.shields.io/badge/Deploy-Vercel-000?style=flat-square&logo=vercel" alt="Vercel"/>
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb" alt="MongoDB"/>
  <br/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=nodedotjs" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/Mongoose-8-880000?style=flat-square&logo=mongoose" alt="Mongoose"/>
  <br/>
  <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fjoaocastelo%2Fnexus-erp-crm&countColor=%236366F1&style=flat-square" alt="Visitors"/>
</div>

<br/>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=28&pause=1000&color=6366F1&center=true&vCenter=true&width=600&lines=Nexus+ERP+%2B+CRM;Full-Stack+Enterprise+Platform;React+%7C+TypeScript+%7C+Node.js;Sistema+Integrado+de+Gest%C3%A3o" alt="Typing SVG" />
</p>

<p align="center">
  <strong>Uma plataforma full-stack empresarial que unifica CRM e ERP em uma única experiência,<br/>com persistência em MongoDB Atlas, deploy serverless na Vercel e dashboard analítico.</strong>
</p>

<p align="center">
  <a href="https://nexus-erp.vercel.app">🌐 Demo</a> •
  <a href="#-stack-tecnológica">🛠 Stack</a> •
  <a href="#-funcionalidades">✨ Funcionalidades</a> •
  <a href="#-como-executar">🚀 Executar</a>
</p>

<br/>

---

## 📋 Visão Geral

**Nexus ERP + CRM** é um sistema completo de gestão empresarial full-stack. O projeto demonstra proficiência em desenvolvimento moderno com React 18, TypeScript, Node.js, MongoDB e arquitetura serverless.

### 🎯 Para Recrutadores

| Habilidade | Evidência |
|-----------|-----------|
| **React 18 + TypeScript** | Componentes funcionais com hooks, tipagem estática, Zustand para estado global |
| **Node.js + Express** | API RESTful completa com 20+ endpoints, middleware de erro, CORS |
| **MongoDB + Mongoose** | Persistência real com fallback para banco em memória — 7 modelos com schemas |
| **Arquitetura Serverless** | Deploy duplo: Express local + Vercel Functions no mesmo código |
| **UI/UX Profissional** | Tailwind CSS, recharts, responsivo, componentes reutilizáveis |
| **Integração de Sistemas** | CRM ↔ ERP com logs de auditoria, conversão de leads, criação de vendas |
| **Async/Await** | Toda a camada de dados é assíncrona com tratamento de erros |
| **Git + GitHub** | Commits semânticos, push-to-deploy na Vercel |

<br/>

## 🛠 Stack Tecnológica

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-593D88?style=for-the-badge&logo=react&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6B6B?style=for-the-badge&logo=chartdotjs&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js_20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose_8-880000?style=for-the-badge&logo=mongoose&logoColor=white)

### Infra
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

</div>

<br/>

## ✨ Funcionalidades

### 🟣 Módulo CRM
- **Gestão de Leads** — CRUD completo com listagem e Kanban
- **Pipeline de Vendas** — Funil visual com 6 estágios (Lead → Fechado)
- **Clientes** — Cadastro completo com score, histórico e métricas
- **Interações** — Registro de chamadas, e-mails, reuniões por cliente

### 🟢 Módulo ERP
- **Controle de Estoque** — Produtos com SKU, alerta de mínimo, margem
- **Gestão de Vendas** — Pedidos vinculados a clientes, impostos automáticos
- **Financeiro** — Receitas/despesas, DRE simplificado, fluxo de caixa
- **Dashboard Analítico** — Métricas integradas com gráficos Recharts

### 🔄 Integração CRM ↔ ERP
```
Lead Convertido → Cliente no CRM
       ↓
Venda Fechada → Pedido no ERP
       ↓
Estoque Debitado → Transação Financeira
       ↓
Histórico Unificado por Cliente
```

<br/>

## 🏗 Arquitetura

```
nexus-erp-crm/
├── api/                       # 🚀 Vercel Serverless Functions
│   ├── _dataStore.js          #    Data layer (Mongoose + in-memory fallback)
│   ├── _db.js                 #    Conexão MongoDB com caching serverless
│   ├── _models.js             #    Mongoose schemas para Vercel
│   ├── _seed.js               #    Dados de demonstração
│   ├── crm/                   #    Endpoints do CRM
│   ├── erp/                   #    Endpoints do ERP
│   └── integration/           #    Endpoints de integração
├── backend/                   # 🖥 Servidor Express (desenvolvimento local)
│   └── src/
│       ├── controllers/       #    Lógica de negócio
│       ├── models/            #    Mongoose models (Lead, Client, Product...)
│       ├── routes/            #    Definição de rotas REST
│       ├── middleware/        #    Error handler
│       └── config/            #    Database e dataStore
├── frontend/                  # 🎨 React + Vite + TypeScript
│   └── src/
│       ├── components/        #    Componentes reutilizáveis
│       ├── pages/             #    Páginas (CRM, ERP, Dashboard)
│       ├── services/          #    Cliente Axios
│       ├── stores/            #    Zustand
│       ├── types/             #    Interfaces TypeScript
│       └── hooks/             #    Custom hooks
├── vercel.json                # Configuração de deploy Vercel
└── docker-compose.yml         # PostgreSQL para desenvolvimento local
```

<br/>

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm 9+

### 1. Clone e instale
```bash
git clone https://github.com/joaocastelo/nexus-erp-crm.git
cd nexus-erp-crm
npm install
```

### 2. Configure (opcional — dados persistem em memória por padrão)
```bash
cp .env.example .env
# Edite .env e adicione sua MONGODB_URI do MongoDB Atlas
```

### 3. Inicie o sistema
```bash
npm run dev
# ✅ Backend: http://localhost:5000
# ✅ Frontend: http://localhost:3000
```

### 4. Acesse
Abra [http://localhost:3000](http://localhost:3000) — dados de demonstração já carregados.

### Comandos úteis
```bash
npm run dev            # Frontend + Backend simultaneamente
npm run dev:backend    # Apenas backend (porta 5000)
npm run dev:frontend   # Apenas frontend (porta 3000)
npm run build          # Build de produção do frontend
```

<br/>

## 🗄️ MongoDB Atlas (Persistência Real)

Para dados persistentes entre deploys:

1. Crie uma conta gratuita em [mongodb.com/atlas](https://mongodb.com/atlas)
2. Crie um cluster **M0** (free tier)
3. Crie um usuário de banco de dados
4. Libere acesso de qualquer IP (`0.0.0.0/0`)
5. Copie a string de conexão
6. Adicione ao `.env`:
```env
MONGODB_URI=mongodb+srv://<usuario>:<senha>@cluster0.xxxxx.mongodb.net/nexus-erp?retryWrites=true&w=majority
```

> **Sem MongoDB?** O sistema funciona perfeitamente com banco em memória — dados de demonstração são carregados automaticamente.

<br/>

## 🌐 Deploy na Vercel

O deploy é automático via GitHub — cada push para `main` dispara um novo deploy.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
# Deploy manual
npm i -g vercel
vercel --prod
```

**Variáveis de ambiente na Vercel** (adicione no dashboard):
- `MONGODB_URI` — opcional, para persistência

A configuração está em `vercel.json`:
- Serverless Functions em `/api/*`
- Frontend estático em `frontend/dist/`
- SPA routing para React Router

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
| `GET` | `/api/integration/dashboard` | Dashboard analítico |
| `POST` | `/api/reset` | Redefinir dados para seed |

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
  <sub>Built with React, TypeScript, Node.js, Express, MongoDB & Mongoose</sub>
  <br/>
  <sub>© 2024 João Castelo</sub>
  <br/>
  <sub>
    <a href="#-visão-geral">↑ Voltar ao topo</a>
  </sub>
</div>
