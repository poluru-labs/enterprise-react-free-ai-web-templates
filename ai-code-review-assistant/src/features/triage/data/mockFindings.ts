import type { TriageFinding } from '@/core'

export const MOCK_FINDINGS: TriageFinding[] = [
  { id: 'f-01', pr: 482, file: 'src/api/invoices.ts', line: 9, title: 'SQL built from customer input', category: 'security', severity: 'critical', status: 'open', owner: 'Ravi Poluru', openedAt: '2026-11-10T15:10:00Z' },
  { id: 'f-02', pr: 482, file: 'src/api/invoices.ts', line: 11, title: 'Customer rows written to logs', category: 'security', severity: 'high', status: 'open', owner: 'Ravi Poluru', openedAt: '2026-11-10T15:10:00Z' },
  { id: 'f-03', pr: 482, file: 'src/lib/format.ts', line: 6, title: 'toCsv throws on empty input', category: 'bug', severity: 'high', status: 'accepted', owner: 'Ravi Poluru', openedAt: '2026-11-10T15:11:00Z' },
  { id: 'f-04', pr: 479, file: 'src/auth/session.ts', line: 42, title: 'Session cookie missing SameSite', category: 'security', severity: 'high', status: 'open', owner: 'Meera Poluru', openedAt: '2026-11-09T18:30:00Z' },
  { id: 'f-05', pr: 479, file: 'src/auth/session.ts', line: 77, title: 'Error swallowed in token refresh', category: 'bug', severity: 'medium', status: 'open', owner: 'Meera Poluru', openedAt: '2026-11-09T18:31:00Z' },
  { id: 'f-06', pr: 476, file: 'src/hooks/useInvoices.ts', line: 18, title: 'Unmemoized filter on large list', category: 'performance', severity: 'low', status: 'open', owner: 'Kiran Poluru', openedAt: '2026-11-08T11:05:00Z' },
  { id: 'f-07', pr: 476, file: 'src/components/InvoiceTable.tsx', line: 120, title: 'Function exceeds 80 lines', category: 'maintainability', severity: 'low', status: 'dismissed', owner: 'Kiran Poluru', openedAt: '2026-11-08T11:06:00Z' },
  { id: 'f-08', pr: 474, file: 'src/api/payments.ts', line: 31, title: 'Retry without idempotency key', category: 'bug', severity: 'critical', status: 'fixed', owner: 'Anika Poluru', openedAt: '2026-11-06T09:40:00Z' },
  { id: 'f-09', pr: 474, file: 'src/api/payments.ts', line: 58, title: 'Explicit any in webhook handler', category: 'maintainability', severity: 'medium', status: 'accepted', owner: 'Anika Poluru', openedAt: '2026-11-06T09:41:00Z' },
  { id: 'f-10', pr: 471, file: 'src/ui/Button.tsx', line: 12, title: 'Inconsistent prop naming', category: 'style', severity: 'info', status: 'open', owner: 'Anika Poluru', openedAt: '2026-11-05T14:00:00Z' },
]
