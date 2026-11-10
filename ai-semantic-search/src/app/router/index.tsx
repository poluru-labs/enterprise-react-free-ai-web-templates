import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/app/layouts/AppLayout'
import { AgentsPage } from '@/features/agents'
import { ChatPage } from '@/features/chat'
import { DashboardPage } from '@/features/dashboard'
import { EvaluationsPage } from '@/features/evaluations'
import { IndexesPage } from '@/features/indexes'
import { QueriesPage } from '@/features/queries'
import { RankingsPage } from '@/features/rankings'
import { SettingsPage } from '@/features/settings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'queries', element: <QueriesPage /> },
      { path: 'indexes', element: <IndexesPage /> },
      { path: 'rankings', element: <RankingsPage /> },
      { path: 'evaluations', element: <EvaluationsPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'agents', element: <AgentsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])
