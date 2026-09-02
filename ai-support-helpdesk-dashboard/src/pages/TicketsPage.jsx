import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Select } from '@poluru-labs/enterprise-design-system-react';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { allTickets } from '../lib/tickets.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  PriorityBadge,
  SlaBadge,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

export default function TicketsPage() {
  const navigate = useNavigate();
  const tickets = allTickets();
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('all');
  const [status, setStatus] = useState('all');

  const rows = useMemo(() => {
    const filtered = tickets.filter((ticket) => {
      const priorityOk = priority === 'all' || ticket.priority === priority;
      const statusOk = status === 'all' || ticket.status === status;
      return priorityOk && statusOk;
    });
    return searchRecords(filtered, query, ['id', 'subject', 'customer', 'assignee', 'tags']);
  }, [tickets, query, priority, status]);

  return (
    <div className="desk-page">
      <PageHeader
        title="Tickets"
        description="Full catalog for 24–30 Aug 2026, including resolved threads."
        crumbs={[BREADCRUMB_ROOT, { label: 'Tickets' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Catalog" value={tickets.length} icon="bi-ticket-perforated" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Open" value={tickets.filter((item) => item.status === 'Open').length} icon="bi-inbox" tone="info" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Waiting / pending" value={tickets.filter((item) => item.status === 'Waiting' || item.status === 'Pending').length} icon="bi-hourglass" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Resolved" value={tickets.filter((item) => item.status === 'Resolved').length} icon="bi-check-circle" tone="success" />
        </div>
      </div>

      <FilterBar
        search={<Search value={query} placeholder="Search tickets or tags" onChange={(_, value) => setQuery(value)} />}
        onReset={() => {
          setQuery('');
          setPriority('all');
          setStatus('all');
        }}
      >
        <Select
          label="Priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          options={[
            { value: 'all', label: 'All priorities' },
            { value: 'P1', label: 'P1' },
            { value: 'P2', label: 'P2' },
            { value: 'P3', label: 'P3' },
          ]}
        />
        <Select
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          options={[
            { value: 'all', label: 'All statuses' },
            { value: 'Open', label: 'Open' },
            { value: 'Waiting', label: 'Waiting' },
            { value: 'Pending', label: 'Pending' },
            { value: 'Resolved', label: 'Resolved' },
          ]}
        />
      </FilterBar>

      <ChartSection title="Catalog" subtitle="Inbox is the live queue · this list keeps history">
        <DataTable
          rows={rows}
          onRowClick={(row) => navigate(`${BASE_PATH}/tickets/${row.id}`)}
          rowClassName={(row) => (row.priority === 'P1' && row.status !== 'Resolved' ? 'is-severe' : '')}
          columns={[
            {
              key: 'id',
              label: 'Ticket',
              render: (_, row) => (
                <div>
                  <strong className="desk-mono">{row.id}</strong>
                  <div className="desk-subtle">{row.subject}</div>
                </div>
              ),
            },
            { key: 'customer', label: 'Customer' },
            {
              key: 'priority',
              label: 'Priority',
              render: (value) => <PriorityBadge priority={value} />,
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
            { key: 'assignee', label: 'Assignee' },
            { key: 'channel', label: 'Channel' },
            {
              key: 'sla',
              label: 'SLA',
              render: (value) => <SlaBadge sla={value} />,
            },
            {
              key: 'updatedAt',
              label: 'Updated',
              render: (value) => formatDateTime(value),
            },
          ]}
        />
      </ChartSection>
    </div>
  );
}
