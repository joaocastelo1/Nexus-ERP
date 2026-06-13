import { create } from 'zustand'

interface AppState {
  sidebarOpen: boolean
  currentModule: 'dashboard' | 'crm' | 'erp' | 'integrations'
  toggleSidebar: () => void
  setModule: (module: 'dashboard' | 'crm' | 'erp' | 'integrations') => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  currentModule: 'dashboard',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setModule: (module) => set({ currentModule: module })
}))