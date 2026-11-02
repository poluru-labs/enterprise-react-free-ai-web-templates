import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Alert,
  Button,
  ButtonGroup,
  DataTable,
  Input,
  Modal,
  ProgressBar,
  Status,
  formatDisplayDate,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import support from '../data/support.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { TICKET_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function SupportPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const filtered = useMemo(() => {
    if (band === 'all') return support;
    return support.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      learner: row.learner,
      priority: row.priority,
      dueInDays: row.dueInDays,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  return (
    <div className="learn-page">
      <PageHeader
        title="Support"
        description="Support tickets and SLAs, escalations, and sign-off. Leela Poluru owns weekly priority support."
        crumbs={[BREADCRUMB_ROOT, { label: 'Support' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            New ticket
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="Ticket backlog"
        message="Login issues spiked for campus B. Jonah Poluru is pairing with Maya Poluru on remediation."
        dismissible
      />

      <ButtonGroup size="sm" className="learn-button-group">
        {[
          ['all', 'All'],
          ['Open', 'Open'],
          ['In progress', 'In progress'],
          ['Escalated', 'Escalated'],
          ['Approved', 'Approved'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="learn-panel">
        <h2>Ticket board</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Ticket' },
            { key: 'learner', label: 'Learner' },
            { key: 'priority', label: 'Priority' },
            { key: 'dueInDays', label: 'Due (d)' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {filtered.map((row) => (
          <AccordionItem key={row.id} heading={row.name}>
            <div className="learn-segment-meta">
              <Status label={row.status} variant={TICKET_STATUS[row.status] ?? 'neutral'} />
              <span>{row.learner}</span>
              <span>Priority {row.priority}</span>
            </div>
            <ProgressBar value={row.priority * 100} max={100} showValue />
            <p className="learn-copy learn-drawer-note">Updated {formatDateTime(row.updated)} · {row.owner}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal open={open} onOpenChange={setOpen} heading="New ticket" footer={
        <Button onClick={() => {
          if (!name.trim()) { showToast({ title: 'Name the review', variant: 'warning' }); return; }
          showToast({ title: 'Review opened', description: 'Leela Poluru', variant: 'success' });
          setOpen(false);
        }}>Create</Button>
      }>
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Lending Q1 certification" />
      </Modal>
    </div>
  );
}
