import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Leads from './pages/crm/Leads'
import Pipeline from './pages/crm/Pipeline'
import Clients from './pages/crm/Clients'
import Products from './pages/erp/Products'
import Sales from './pages/erp/Sales'
import Finance from './pages/erp/Finance'
import Integrations from './pages/Integrations'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="crm/leads" element={<Leads />} />
          <Route path="crm/pipeline" element={<Pipeline />} />
          <Route path="crm/clients" element={<Clients />} />
          <Route path="erp/products" element={<Products />} />
          <Route path="erp/sales" element={<Sales />} />
          <Route path="erp/finance" element={<Finance />} />
          <Route path="integrations" element={<Integrations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App