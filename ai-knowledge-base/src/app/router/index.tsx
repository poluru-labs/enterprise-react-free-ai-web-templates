import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/app/layouts/AppLayout'
import { AgentsPage } from '@/features/agents'
import { ArticlesPage } from '@/features/articles'
import { CategoriesPage } from '@/features/categories'
import { ChatPage } from '@/features/chat'
import { DashboardPage } from '@/features/dashboard'
import { MaintenancePage } from '@/features/maintenance'
import { SettingsPage } from '@/features/settings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'articles', element: <ArticlesPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'maintenance', element: <MaintenancePage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'agents', element: <AgentsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])
