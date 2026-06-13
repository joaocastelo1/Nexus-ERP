import { NavLink } from 'react-router-dom'
import { useAppStore } from '../../stores/appStore'
import { 
  LayoutDashboard, 
  Users, 
  Kanban, 
  UserCheck, 
  Package, 
  ShoppingCart, 
  Wallet, 
  Link2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import clsx from 'clsx'

const crmItems = [
  { path: '/crm/leads', icon: Users, label: 'Leads' },
  { path: '/crm/pipeline', icon: Kanban, label: 'Pipeline' },
  { path: '/crm/clients', icon: UserCheck, label: 'Clientes' },
]

const erpItems = [
  { path: '/erp/products', icon: Package, label: 'Estoque' },
  { path: '/erp/sales', icon: ShoppingCart, label: 'Vendas' },
  { path: '/erp/finance', icon: Wallet, label: 'Financeiro' },
]

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar, currentModule, setModule } = useAppStore()
  
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard', module: 'dashboard' as const },
    ...crmItems.map(i => ({ ...i, module: 'crm' as const })),
    ...erpItems.map(i => ({ ...i, module: 'erp' as const })),
    { path: '/integrations', icon: Link2, label: 'Integrações', module: 'integrations' as const },
  ]
  
  return (
    <aside className={clsx(
      "fixed left-0 top-0 h-full bg-primary text-white transition-all duration-300 z-50",
      sidebarOpen ? "w-64" : "w-20"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-emerald-500 rounded-lg" />
            <span className="font-bold text-xl">BizFlow</span>
          </div>
        )}
        <button onClick={toggleSidebar} className="p-2 hover:bg-slate-700 rounded-lg">
          {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <nav className="p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setModule(item.module)}
            className={({ isActive }) => clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
              isActive 
                ? item.module === 'crm' ? "bg-violet-600" : item.module === 'erp' ? "bg-emerald-600" : "bg-blue-600"
                : "hover:bg-slate-700",
              !sidebarOpen && "justify-center"
            )}
          >
            <item.icon size={20} />
            {sidebarOpen && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
      
      {sidebarOpen && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-500" />
              <span>CRM: {currentModule === 'crm' ? 'Ativo' : 'Módulo'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>ERP: {currentModule === 'erp' ? 'Ativo' : 'Módulo'}</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}