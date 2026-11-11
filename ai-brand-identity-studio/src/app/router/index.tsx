import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/app/layouts/AppLayout'
import { AgentsPage } from '@/features/agents'
import { ChatPage } from '@/features/chat'
import { CompliancePage } from '@/features/compliance'
import { DashboardPage } from '@/features/dashboard'
import { NamingPage } from '@/features/naming'
import { PalettesPage } from '@/features/palettes'
import { SettingsPage } from '@/features/settings'
import { VoicePage } from '@/features/voice'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'voice', element: <VoicePage /> },
      { path: 'naming', element: <NamingPage /> },
      { path: 'palettes', element: <PalettesPage /> },
      { path: 'compliance', element: <CompliancePage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'agents', element: <AgentsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])
