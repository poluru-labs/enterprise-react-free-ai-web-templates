import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  ButtonGroup,
  DataTable,
  DescriptionList,
  Modal,
  Select,
  Textarea,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import access from '../data/access.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { ACCESS_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function AccessPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [reviewStatus, setReviewStatus] = useState('Audited');

  const filtered = useMemo(() => {
    if (band === 'all') return access;
    return access.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      actor: row.actor,
      resource: row.resource,
      action: row.action,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const deniedCount = access.filter((row) => row.status === 'Denied').length;

  return (
    <div className="priv-page">
      <PageHeader
        title="Access log"
        description="Who queried what and policy outcomes. Priya Poluru owns audit review."
        crumbs={[BREADCRUMB_ROOT, { label: 'Access log' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Log review
          </Button>
        }
      />

      <DescriptionList
        compact
        items={[
          { term: 'Denials (sample)', description: String(deniedCount) },
          { term: 'Audit desk', description: 'Priya Poluru' },
          { term: 'Escalations', description: 'Nina Poluru' },
        ]}
      />

      <ButtonGroup size="sm" className="priv-button-group">
        {[
          ['all', 'All'],
          ['Allowed', 'Allowed'],
          ['Denied', 'Denied'],
          ['Audited', 'Audited'],
          ['Flagged', 'Flagged'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="priv-panel">
        <h2>Recent access events</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Event' },
            { key: 'actor', label: 'Actor' },
            { key: 'resource', label: 'Resource' },
            { key: 'action', label: 'Action' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Reviewer' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {filtered.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="priv-segment-meta">
              <Badge label={row.status} variant={ACCESS_STATUS[row.status] ?? 'neutral'} soft size="sm" />
              <span>{row.action}</span>
              <span>{row.resource}</span>
            </div>
            <p className="priv-copy">
              {row.actor} · Updated {formatDateTime(row.updated)} · Reviewer {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Log access review"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Review saved', variant: 'success' });
              setOpen(false);
            }}
          >
            Submit
          </Button>
        }
      >
        <div className="priv-stack">
          <Textarea
            label="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Denied raw export — policy POL-12"
          />
          <Select
            label="Outcome"
            value={reviewStatus}
            onChange={setReviewStatus}
            options={[
              { label: 'Audited', value: 'Audited' },
              { label: 'Allowed', value: 'Allowed' },
              { label: 'Flagged', value: 'Flagged' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
