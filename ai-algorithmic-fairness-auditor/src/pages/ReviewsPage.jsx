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
import reviews from '../data/reviews.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { REVIEW_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function ReviewsPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const filtered = useMemo(() => {
    if (band === 'all') return reviews;
    return reviews.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      model: row.model,
      parity: row.parity,
      dueInDays: row.dueInDays,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  return (
    <div className="fair-page">
      <PageHeader
        title="Reviews"
        description="Certification queue, escalations, and sign-off. Rahul Poluru owns weekly parity reviews."
        crumbs={[BREADCRUMB_ROOT, { label: 'Reviews' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            New review
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="Review backlog"
        message="Pricing uplift escalated. Jonah Poluru is pairing with Maya Poluru on remediation."
        dismissible
      />

      <ButtonGroup size="sm" className="fair-button-group">
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

      <section className="fair-panel">
        <h2>Review board</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Review' },
            { key: 'model', label: 'Model' },
            { key: 'parity', label: 'Parity' },
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
            <div className="fair-segment-meta">
              <Status label={row.status} variant={REVIEW_STATUS[row.status] ?? 'neutral'} />
              <span>{row.model}</span>
              <span>Parity {row.parity}</span>
            </div>
            <ProgressBar value={row.parity * 100} max={100} showValue />
            <p className="fair-copy fair-drawer-note">Updated {formatDateTime(row.updated)} · {row.owner}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal open={open} onOpenChange={setOpen} heading="New review" footer={
        <Button onClick={() => {
          if (!name.trim()) { showToast({ title: 'Name the review', variant: 'warning' }); return; }
          showToast({ title: 'Review opened', description: 'Rahul Poluru', variant: 'success' });
          setOpen(false);
        }}>Create</Button>
      }>
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Lending Q1 certification" />
      </Modal>
    </div>
  );
}
