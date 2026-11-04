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
import releases from '../data/releases.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { RELEASE_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function ReleasesPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const filtered = useMemo(() => {
    if (band === 'all') return releases;
    return releases.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      dataset: row.dataset,
      score: row.score,
      blockers: row.blockers,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  return (
    <div className="qual-page">
      <PageHeader
        title="Releases"
        description="Readiness scores, blockers, and sign-off. Jonah Poluru owns the release gate."
        crumbs={[BREADCRUMB_ROOT, { label: 'Releases' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            New release
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="Blocked releases"
        message="Legacy sunset cut still has five open blockers. Ravi Poluru is pairing with Nina Poluru."
        dismissible
      />

      <ButtonGroup size="sm" className="qual-button-group">
        {[
          ['all', 'All'],
          ['Ready', 'Ready'],
          ['At risk', 'At risk'],
          ['Blocked', 'Blocked'],
          ['Shipped', 'Shipped'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="qual-panel">
        <h2>Readiness board</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Release' },
            { key: 'dataset', label: 'Dataset' },
            { key: 'score', label: 'Score' },
            { key: 'blockers', label: 'Blockers' },
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
            <div className="qual-segment-meta">
              <Status label={row.status} variant={RELEASE_STATUS[row.status] ?? 'neutral'} />
              <span>{row.dataset}</span>
              <span>{row.blockers} blocker(s)</span>
            </div>
            <ProgressBar value={row.score} max={100} showValue />
            <p className="qual-copy qual-drawer-note">
              Score {row.score} · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Create release candidate"
        footer={
          <Button
            onClick={() => {
              if (!name.trim()) {
                showToast({ title: 'Enter release name', variant: 'warning' });
                return;
              }
              showToast({ title: 'Release opened', description: 'Jonah Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Create
          </Button>
        }
      >
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="November mart refresh" />
      </Modal>
    </div>
  );
}
