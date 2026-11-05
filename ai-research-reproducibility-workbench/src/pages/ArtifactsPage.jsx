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
import artifacts from '../data/artifacts.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { ARTIFACT_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function ArtifactsPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const filtered = useMemo(() => {
    if (band === 'all') return artifacts;
    return artifacts.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      format: row.format,
      sizeGb: row.sizeGb,
      hashOk: row.hashOk ? 'Yes' : 'No',
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  return (
    <div className="repro-page">
      <PageHeader
        title="Artifacts"
        description="Sealed models, tables, and configs. Jonah Poluru tracks vault integrity."
        crumbs={[BREADCRUMB_ROOT, { label: 'Artifacts' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Register artifact
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="Hash mismatch"
        message="tabular-metrics.csv drifted from seal. Leela Poluru scheduled re-upload."
        dismissible
      />

      <ButtonGroup size="sm" className="repro-button-group">
        {[
          ['all', 'All'],
          ['Sealed', 'Sealed'],
          ['Drift', 'Drift'],
          ['Missing', 'Missing'],
          ['Draft', 'Draft'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="repro-panel">
        <h2>Vault inventory</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Artifact' },
            { key: 'format', label: 'Format' },
            { key: 'sizeGb', label: 'Size (GB)' },
            { key: 'hashOk', label: 'Hash OK' },
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
            <div className="repro-segment-meta">
              <Status label={row.status} variant={ARTIFACT_STATUS[row.status] ?? 'neutral'} />
              <span>{row.format}</span>
              <span>{row.sizeGb} GB</span>
            </div>
            <ProgressBar value={row.hashOk ? 100 : 40} max={100} showValue />
            <p className="repro-copy repro-drawer-note">
              Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Register artifact"
        footer={
          <Button
            onClick={() => {
              if (!name.trim()) {
                showToast({ title: 'Enter artifact name', variant: 'warning' });
                return;
              }
              showToast({ title: 'Artifact queued', description: 'Jonah Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Seal draft
          </Button>
        }
      >
        <Input label="Artifact name" value={name} onChange={(e) => setName(e.target.value)} placeholder="baseline-v3-weights" />
      </Modal>
    </div>
  );
}
