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
import deployments from '../data/deployments.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { DEPLOYMENT_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function DeploymentsPage() {
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const mapped = deployments.map((row) => ({
      name: row.name,
      origin: row.origin,
      destination: row.destination,
      units: row.units,
      etaHours: row.etaHours,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  return (
    <div className="relief-page">
      <PageHeader
        title="Deployments"
        description="Convoys, staging yards, and delivery ETAs. Jonah Poluru leads field deployments."
        crumbs={[BREADCRUMB_ROOT, { label: 'Deployments' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => setOpen(true)}>
            Dispatch convoy
          </Button>
        }
      />

      <section className="relief-panel">
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Mission' },
            { key: 'origin', label: 'Origin' },
            { key: 'destination', label: 'Destination' },
            { key: 'units', label: 'Units' },
            { key: 'etaHours', label: 'ETA (h)' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {deployments.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="relief-segment-meta">
              <Status label={row.status} variant={DEPLOYMENT_STATUS[row.status] ?? 'neutral'} />
              <span>{row.origin} → {row.destination}</span>
              <span>{row.units} units</span>
            </div>
            <ProgressBar value={Math.min(100, Math.max(0, 100 - row.etaHours * 4))} max={100} showValue />
            <p className="relief-copy relief-drawer-note">
              ETA {row.etaHours}h · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Dispatch convoy"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Convoy dispatched', description: 'Jonah Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Dispatch
          </Button>
        }
      >
        <p className="relief-copy">New convoys follow routing rules Priya Poluru maintains for active regions.</p>
      </Modal>
    </div>
  );
}
