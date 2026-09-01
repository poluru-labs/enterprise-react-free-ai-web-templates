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
import { tickets, type Ticket } from '../data/mock';
import './pages.scss';

export function TicketsPage() {
  const { show } = useToast();
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Ticket | null>(null);
  const pageSize = 4;

  const filtered = useMemo(() => {
    if (filter === 'all') return tickets;
    if (filter === 'open') return tickets.filter((t) => t.status !== 'Resolved');
    return tickets.filter((t) => t.priority === filter.toUpperCase());
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

  const rows = pageRows.map((t) => ({
    id: t.id,
    subject: t.subject,
    priority: t.priority,
    facility: t.facility,
    assignee: t.assignee,
    status: t.status,
  }));

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Incident and change tickets linked to facilities, alerts, and maintenance windows.
        </p>
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
      </div>

      <Card elevated padded>
        <div className="table-wrap" style={{ marginTop: 0 }}>
          <DataTable columns={columns} rows={rows} striped />
        </div>
        <div className="ticket-list">
          {pageRows.map((ticket) => (
            <button
              key={ticket.id}
              type="button"
              className="ticket-row"
              onClick={() => setSelected(ticket)}
            >
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
        <Pagination
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onChange={setPage}
        />
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
