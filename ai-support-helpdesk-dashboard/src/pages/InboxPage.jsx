import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer, Search, Select, showToast } from '@poluru-labs/enterprise-design-system-react';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { allTickets, firstUnassigned } from '../lib/tickets.js';
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

const PRIORITY_OPTIONS = [
  { label: 'All priorities', value: 'all' },
  { label: 'P1', value: 'P1' },
  { label: 'P2', value: 'P2' },
  { label: 'P3', value: 'P3' },
];

const STATUS_OPTIONS = [
  { label: 'Working queue', value: 'active' },
  { label: 'Open', value: 'Open' },
  { label: 'Waiting', value: 'Waiting' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Resolved', value: 'Resolved' },
  { label: 'All statuses', value: 'all' },
];

const ASSIGNEE_OPTIONS = [
  { label: 'Anyone', value: 'all' },
  { label: 'Unassigned', value: 'Unassigned' },
  { label: 'Meera Poluru', value: 'Meera Poluru' },
  { label: 'Kavya Poluru', value: 'Kavya Poluru' },
  { label: 'Harini Poluru', value: 'Harini Poluru' },
  { label: 'Madhav Poluru', value: 'Madhav Poluru' },
  { label: 'Priya Poluru', value: 'Priya Poluru' },
];

export default function InboxPage() {
  const navigate = useNavigate();
  const tickets = allTickets();
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('all');
  const [status, setStatus] = useState('active');
  const [assignee, setAssignee] = useState('all');
  const [active, setActive] = useState(null);

  const rows = useMemo(() => {
    const filtered = tickets.filter((ticket) => {
      const priorityOk = priority === 'all' || ticket.priority === priority;
      const statusOk =
        status === 'all' ||
        (status === 'active' ? ticket.status !== 'Resolved' : ticket.status === status);
      const assigneeOk = assignee === 'all' || ticket.assignee === assignee;
      return priorityOk && statusOk && assigneeOk;
    });
    return searchRecords(filtered, query, ['id', 'subject', 'customer', 'assignee', 'requester']);
  }, [tickets, query, priority, status, assignee]);

  const unassigned = tickets.filter((ticket) => ticket.assignee === 'Unassigned').length;
  const waiting = tickets.filter((ticket) => ticket.status === 'Waiting').length;

  return (
    <div className="desk-page">
      <PageHeader
        title="Inbox"
        description="Live working queue. Click a row for the drawer, or open the full thread."
        crumbs={[BREADCRUMB_ROOT, { label: 'Inbox' }]}
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => navigate(`${BASE_PATH}/tickets`)}>
              All tickets
            </Button>
            <Button
              size="sm"
              icon="arrow-right"
              onClick={() => {
                const ticket = firstUnassigned();
                if (!ticket) {
                  showToast({ title: 'Queue is clear', variant: 'info' });
                  return;
                }
                showToast({ title: 'Assigned to Meera Poluru', description: ticket.id, variant: 'success' });
                navigate(`${BASE_PATH}/tickets/${ticket.id}`);
              }}
            >
              Assign next
            </Button>
          </>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="In view" value={rows.length} icon="bi-inbox" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Unassigned" value={unassigned} icon="bi-person-plus" tone="danger" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Waiting" value={waiting} icon="bi-hourglass-split" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="P1 live" value={tickets.filter((item) => item.priority === 'P1' && item.status !== 'Resolved').length} icon="bi-lightning" tone="danger" />
        </div>
      </div>

      <FilterBar
        search={<Search value={query} placeholder="Search the queue" onChange={(_, value) => setQuery(value)} />}
        onReset={() => {
          setQuery('');
          setPriority('all');
          setStatus('active');
          setAssignee('all');
        }}
      >
        <Select label="Priority" options={PRIORITY_OPTIONS} value={priority} onChange={(event) => setPriority(event.target.value)} />
        <Select label="Status" options={STATUS_OPTIONS} value={status} onChange={(event) => setStatus(event.target.value)} />
        <Select label="Assignee" options={ASSIGNEE_OPTIONS} value={assignee} onChange={(event) => setAssignee(event.target.value)} />
      </FilterBar>

      <ChartSection title="Working set" subtitle="Oldest unassigned first · drawer preview on click">
        <DataTable
          rows={rows}
          emptyTitle="Queue is quiet"
          emptyDescription="No tickets match these filters."
          onRowClick={setActive}
          rowClassName={(row) => (row.priority === 'P1' ? 'is-severe' : row.sla === 'breached' || row.sla === 'at_risk' || row.sla === 'risk' ? 'is-attention' : '')}
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
            {
              key: 'sla',
              label: 'SLA',
              render: (value, row) => (
                <div>
                  <SlaBadge sla={value} />
                  <div className="desk-subtle">{row.slaLeft}</div>
                </div>
              ),
            },
            {
              key: 'updatedAt',
              label: 'Updated',
              render: (value) => formatDateTime(value),
            },
          ]}
        />
      </ChartSection>

      <Drawer
        open={Boolean(active)}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
        heading={active ? active.id : 'Ticket'}
        size="md"
      >
        {active ? (
          <div className="desk-form-stack">
            <p className="desk-note">{active.subject}</p>
            <div className="desk-thread-meta">
              <span>{active.customer}</span>
              <PriorityBadge priority={active.priority} />
              <StatusBadge status={active.status} />
              <SlaBadge sla={active.sla} />
            </div>
            <p className="desk-subtle">{active.requester} · {active.assignee} · {active.slaLeft} left</p>
            <ul className="desk-thread">
              {active.messages.slice(-3).map((message) => (
                <li key={message.id} className={`desk-bubble role-${message.role}`}>
                  <strong>{message.author}</strong>
                  <p>{message.body}</p>
                </li>
              ))}
            </ul>
            <Button size="sm" onClick={() => navigate(`${BASE_PATH}/tickets/${active.id}`)}>
              Open thread
            </Button>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
