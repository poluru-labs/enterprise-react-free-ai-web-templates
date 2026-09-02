import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  DataTable,
  Drawer,
  DescriptionList,
  Pagination,
  SegmentedControl,
  Tag,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import { BREADCRUMB_ROOT } from '../constants/navigation';
import { tickets, type Ticket } from '../data';
import { PageHeader } from '../components/widgets/PageHeader';
import './pages.scss';

export function TicketsPage() {
  const { show } = useToast();
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Ticket | null>(null);
  const pageSize = 4;

  const filtered = useMemo(() => {
    if (filter === 'all') return tickets;
    if (filter === 'open') return tickets.filter((ticket) => ticket.status !== 'Resolved');
    return tickets.filter((ticket) => ticket.priority === filter.toUpperCase());
  }, [filter]);

  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'subject', label: 'Subject' },
    { key: 'priority', label: 'Priority' },
    { key: 'facility', label: 'Facility' },
    { key: 'assignee', label: 'Assignee' },
    { key: 'status', label: 'Status' },
  ];

  const rows = pageRows.map((ticket) => ({
    id: ticket.id,
    subject: ticket.subject,
    priority: ticket.priority,
    facility: ticket.facility,
    assignee: ticket.assignee,
    status: ticket.status,
  }));

  return (
    <div className="page">
      <PageHeader
        title="Tickets"
        description="Incident and change tickets linked to facilities, alerts, and maintenance windows."
        crumbs={[BREADCRUMB_ROOT, { label: 'Tickets' }]}
        actions={
          <SegmentedControl
            size="sm"
            value={filter}
            onChange={(value) => {
              setFilter(value);
              setPage(1);
            }}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Open', value: 'open' },
              { label: 'P1', value: 'p1' },
              { label: 'P2', value: 'p2' },
            ]}
          />
        }
      />

      <Card elevated padded>
        <div className="table-wrap" style={{ marginTop: 0 }}>
          <DataTable columns={columns} rows={rows} striped />
        </div>
        <div className="ticket-list">
          {pageRows.map((ticket) => (
            <button key={ticket.id} type="button" className="ticket-row" onClick={() => setSelected(ticket)}>
              <div>
                <strong>
                  {ticket.id} · {ticket.subject}
                </strong>
                <span className="muted">
                  {ticket.facility} · {ticket.assignee}
                </span>
              </div>
              <div className="ticket-row__meta">
                <Tag
                  label={ticket.priority}
                  variant={ticket.priority === 'P1' ? 'danger' : ticket.priority === 'P2' ? 'warning' : 'info'}
                />
                <Badge label={ticket.status} soft />
              </div>
            </button>
          ))}
        </div>
        <Pagination page={page} pageSize={pageSize} total={filtered.length} onChange={setPage} />
      </Card>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.id ?? 'Ticket'}
        footer={
          <>
            <Button variant="tertiary" onClick={() => setSelected(null)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                show({ title: 'Ticket updated', description: selected?.id, variant: 'success' });
                setSelected(null);
              }}
            >
              Take ownership
            </Button>
          </>
        }
      >
        {selected ? (
          <div className="drawer-body">
            <h3>{selected.subject}</h3>
            <DescriptionList
              columns={1}
              items={[
                { term: 'Priority', description: selected.priority },
                { term: 'Facility', description: selected.facility },
                { term: 'Assignee', description: selected.assignee },
                { term: 'Status', description: selected.status },
              ]}
            />
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
