import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/app/layouts/AppLayout'
import { AgentsPage } from '@/features/agents'
import { ChatPage } from '@/features/chat'
import { DashboardPage } from '@/features/dashboard'
import { DeploymentsPage } from '@/features/deployments'
import { PoliciesPage } from '@/features/policies'
import { SandboxPage } from '@/features/sandbox'
import { SettingsPage } from '@/features/settings'
import { ToolGraphPage } from '@/features/tool-graph'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'graph', element: <ToolGraphPage /> },
      { path: 'policies', element: <PoliciesPage /> },
      { path: 'sandbox', element: <SandboxPage /> },
      { path: 'deployments', element: <DeploymentsPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'agents', element: <AgentsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])
