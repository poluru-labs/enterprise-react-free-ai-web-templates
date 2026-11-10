import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/app/layouts/AppLayout'
import { AgentsPage } from '@/features/agents'
import { ChatPage } from '@/features/chat'
import { DashboardPage } from '@/features/dashboard'
import { DocumentsPage } from '@/features/documents'
import { ReviewsPage } from '@/features/reviews'
import { SettingsPage } from '@/features/settings'
import { TemplatesPage } from '@/features/templates'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'documents', element: <DocumentsPage /> },
      { path: 'templates', element: <TemplatesPage /> },
      { path: 'reviews', element: <ReviewsPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'agents', element: <AgentsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])
