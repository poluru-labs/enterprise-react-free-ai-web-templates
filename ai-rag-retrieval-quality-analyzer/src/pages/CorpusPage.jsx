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
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import corpus from '../data/corpus.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { CORPUS_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function CorpusPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const filtered = useMemo(() => {
    if (band === 'all') return corpus;
    return corpus.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      format: row.format,
      chunks: row.chunks,
      coveragePct: row.coveragePct,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  return (
    <div className="rq-page">
      <PageHeader
        title="Corpus coverage"
        description="Indexed sources and chunk counts. Maya Poluru owns refresh cadence."
        crumbs={[BREADCRUMB_ROOT, { label: 'Corpus' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Register source
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="Coverage gap"
        message="Legal addendum 2024 is not indexed. Leela Poluru scheduled ingestion."
        dismissible
      />

      <ButtonGroup size="sm" className="rq-button-group">
        {[
          ['all', 'All'],
          ['Indexed', 'Indexed'],
          ['Stale', 'Stale'],
          ['Gap', 'Gap'],
          ['Queued', 'Queued'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="rq-panel">
        <h2>Source inventory</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Source' },
            { key: 'format', label: 'Format' },
            { key: 'chunks', label: 'Chunks' },
            { key: 'coveragePct', label: 'Coverage %' },
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
            <div className="rq-segment-meta">
              <Status label={row.status} variant={CORPUS_STATUS[row.status] ?? 'neutral'} />
              <span>{row.format}</span>
              <span>{row.chunks.toLocaleString()} chunks</span>
            </div>
            <ProgressBar value={row.coveragePct} max={100} showValue />
            <p className="rq-copy rq-drawer-note">
              Coverage {row.coveragePct}% · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Register source"
        footer={
          <Button
            onClick={() => {
              if (!name.trim()) {
                showToast({ title: 'Enter source name', variant: 'warning' });
                return;
              }
              showToast({ title: 'Source queued', description: 'Maya Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Queue ingest
          </Button>
        }
      >
        <Input label="Source name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Policy handbook" />
      </Modal>
    </div>
  );
}
