import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Button,
  DataTable,
  Modal,
  ProgressBar,
  Status,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import environments from '../data/environments.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { ENV_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function EnvironmentsPage() {
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const mapped = environments.map((row) => ({
      name: row.name,
      stack: row.stack,
      packages: row.packages,
      pinAgeDays: row.pinAgeDays,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  return (
    <div className="repro-page">
      <PageHeader
        title="Environment pins"
        description="Locked dependency stacks by lab. Maya Poluru owns pin cadence."
        crumbs={[BREADCRUMB_ROOT, { label: 'Environments' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => setOpen(true)}>
            Pin environment
          </Button>
        }
      />

      <section className="repro-panel">
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Environment' },
            { key: 'stack', label: 'Stack' },
            { key: 'packages', label: 'Packages' },
            { key: 'pinAgeDays', label: 'Pin age (d)' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {environments.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="repro-segment-meta">
              <Status label={row.status} variant={ENV_STATUS[row.status] ?? 'neutral'} />
              <span>{row.stack}</span>
              <span>{row.packages} packages</span>
            </div>
            <ProgressBar value={Math.min(100, row.pinAgeDays)} max={100} showValue />
            <p className="repro-copy repro-drawer-note">
              Pin age {row.pinAgeDays}d · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Pin environment"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Pin saved', description: 'Maya Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Save pin
          </Button>
        }
      >
        <p className="repro-copy">New pins require review from Leela Poluru before production use.</p>
      </Modal>
    </div>
  );
}
