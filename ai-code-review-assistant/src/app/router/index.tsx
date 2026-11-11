import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/app/layouts/AppLayout'
import { AgentsPage } from '@/features/agents'
import { ChatPage } from '@/features/chat'
import { DashboardPage } from '@/features/dashboard'
import { DiffsPage } from '@/features/diffs'
import { HeuristicsPage } from '@/features/heuristics'
import { PatchesPage } from '@/features/patches'
import { SettingsPage } from '@/features/settings'
import { TriagePage } from '@/features/triage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'diffs', element: <DiffsPage /> },
      { path: 'heuristics', element: <HeuristicsPage /> },
      { path: 'patches', element: <PatchesPage /> },
      { path: 'triage', element: <TriagePage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'agents', element: <AgentsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])
