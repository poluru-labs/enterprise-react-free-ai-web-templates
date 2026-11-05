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
import exportsData from '../data/exports.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { EXPORT_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function ExportsPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const filtered = useMemo(() => {
    if (band === 'all') return exportsData;
    return exportsData.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      format: row.format,
      recipients: row.recipients,
      sizeMb: row.sizeMb,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  return (
    <div className="priv-page">
      <PageHeader
        title="Report exports"
        description="Signed, redacted bundles for stakeholders. Jonah Poluru owns delivery."
        crumbs={[BREADCRUMB_ROOT, { label: 'Exports' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            New export
          </Button>
        }
      />

      <Alert
        variant="info"
        title="Retention"
        message="Exports expire after 30 days unless Leela Poluru pins them for compliance."
        dismissible
      />

      <ButtonGroup size="sm" className="priv-button-group">
        {[
          ['all', 'All'],
          ['Ready', 'Ready'],
          ['Processing', 'Processing'],
          ['Failed', 'Failed'],
          ['Redacted', 'Redacted'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="priv-panel">
        <h2>Export queue</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Report' },
            { key: 'format', label: 'Format' },
            { key: 'recipients', label: 'Recipients' },
            { key: 'sizeMb', label: 'Size (MB)' },
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
            <div className="priv-segment-meta">
              <Status label={row.status} variant={EXPORT_STATUS[row.status] ?? 'neutral'} />
              <span>{row.format}</span>
              <span>{row.recipients} recipients</span>
            </div>
            <ProgressBar value={Math.min(100, row.sizeMb * 4)} max={100} showValue />
            <p className="priv-copy priv-drawer-note">
              {row.sizeMb} MB · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="New export"
        footer={
          <Button
            onClick={() => {
              if (!name.trim()) {
                showToast({ title: 'Enter report name', variant: 'warning' });
                return;
              }
              showToast({ title: 'Export queued', description: 'Jonah Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Queue
          </Button>
        }
      >
        <Input label="Report name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Q4 aggregate summary" />
      </Modal>
    </div>
  );
}
