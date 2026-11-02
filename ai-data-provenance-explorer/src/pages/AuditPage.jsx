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
  Status,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import audit from '../data/audit.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { AUDIT_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function AuditPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const filtered = useMemo(() => {
    if (band === 'all') return audit;
    return audit.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      actor: row.actor,
      resource: row.resource,
      severity: row.severity,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  return (
    <div className="prov-page">
      <PageHeader
        title="Audit trail"
        description="Immutable log entries, actors, and severity. Leela Poluru owns audit review."
        crumbs={[BREADCRUMB_ROOT, { label: 'Audit trail' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Log entry
          </Button>
        }
      />

      <Alert
        variant="info"
        title="Retention window"
        message="Entries older than 7 years move to cold storage. Maya Poluru validates exports weekly."
        dismissible
      />

      <ButtonGroup size="sm" className="prov-button-group">
        {[
          ['all', 'All'],
          ['Recorded', 'Recorded'],
          ['Pending', 'Pending'],
          ['Redacted', 'Redacted'],
          ['Escalated', 'Escalated'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="prov-panel">
        <h2>Audit log</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Event' },
            { key: 'actor', label: 'Actor' },
            { key: 'resource', label: 'Resource' },
            { key: 'severity', label: 'Severity' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Reviewer' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {filtered.map((row) => (
          <AccordionItem key={row.id} heading={row.name}>
            <div className="prov-segment-meta">
              <Status label={row.status} variant={AUDIT_STATUS[row.status] ?? 'neutral'} />
              <span>{row.actor}</span>
              <span>{row.resource}</span>
            </div>
            <p className="prov-copy prov-drawer-note">
              {row.severity} · Recorded {formatDateTime(row.recordedAt)} · Reviewer {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Log audit entry"
        footer={
          <Button
            onClick={() => {
              if (!name.trim()) {
                showToast({ title: 'Enter event summary', variant: 'warning' });
                return;
              }
              showToast({ title: 'Entry recorded', description: 'Leela Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Record
          </Button>
        }
      >
        <Input label="Summary" value={name} onChange={(e) => setName(e.target.value)} placeholder="Manual attestation — DS-2201" />
      </Modal>
    </div>
  );
}
