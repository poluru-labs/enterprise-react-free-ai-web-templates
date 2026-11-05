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
import reproductions from '../data/reproductions.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { REPRO_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function ReproductionsPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [reproStatus, setReproStatus] = useState('Pending');

  const filtered = useMemo(() => {
    if (band === 'all') return reproductions;
    return reproductions.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      reviewer: row.reviewer,
      runId: row.runId,
      deltaPct: row.deltaPct,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const pendingCount = reproductions.filter((row) => row.status === 'Pending' || row.status === 'InProgress').length;

  return (
    <div className="repro-page">
      <PageHeader
        title="Reproductions"
        description="Verification status and metric deltas. Priya Poluru owns the inbox."
        crumbs={[BREADCRUMB_ROOT, { label: 'Reproductions' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Log verification
          </Button>
        }
      />

      <DescriptionList
        compact
        items={[
          { term: 'Active repros', description: String(pendingCount) },
          { term: 'Verification desk', description: 'Priya Poluru' },
          { term: 'Escalations', description: 'Nina Poluru' },
        ]}
      />

      <ButtonGroup size="sm" className="repro-button-group">
        {[
          ['all', 'All'],
          ['Verified', 'Verified'],
          ['InProgress', 'In progress'],
          ['Blocked', 'Blocked'],
          ['Pending', 'Pending'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="repro-panel">
        <h2>Reproduction tracker</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Reproduction' },
            { key: 'reviewer', label: 'Reviewer' },
            { key: 'runId', label: 'Run' },
            { key: 'deltaPct', label: 'Δ %' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Lead' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {filtered.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="repro-segment-meta">
              <Badge label={row.status} variant={REPRO_STATUS[row.status] ?? 'neutral'} soft size="sm" />
              <span>{row.runId}</span>
              <span>Δ {row.deltaPct}%</span>
            </div>
            <p className="repro-copy">
              {row.reviewer} · Updated {formatDateTime(row.updated)} · Lead {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Log verification"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Verification saved', variant: 'success' });
              setOpen(false);
            }}
          >
            Submit
          </Button>
        }
      >
        <div className="repro-stack">
          <Textarea
            label="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Metric within 0.5% of published baseline"
          />
          <Select
            label="Status"
            value={reproStatus}
            onChange={setReproStatus}
            options={[
              { label: 'Pending', value: 'Pending' },
              { label: 'Verified', value: 'Verified' },
              { label: 'Blocked', value: 'Blocked' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
