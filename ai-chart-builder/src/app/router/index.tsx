import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/app/layouts/AppLayout'
import { AgentsPage } from '@/features/agents'
import { AnnotationsPage } from '@/features/annotations'
import { ChatPage } from '@/features/chat'
import { DashboardPage } from '@/features/dashboard'
import { ExportsPage } from '@/features/exports'
import { PalettesPage } from '@/features/palettes'
import { RecommenderPage } from '@/features/recommender'
import { SettingsPage } from '@/features/settings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'recommend', element: <RecommenderPage /> },
      { path: 'annotations', element: <AnnotationsPage /> },
      { path: 'palettes', element: <PalettesPage /> },
      { path: 'exports', element: <ExportsPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'agents', element: <AgentsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])
