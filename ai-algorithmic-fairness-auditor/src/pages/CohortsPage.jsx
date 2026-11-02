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
import cohorts from '../data/cohorts.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { COHORT_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function CohortsPage() {
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const mapped = cohorts.map((row) => ({
      name: row.name,
      model: row.model,
      size: row.size,
      disparity: row.disparity,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  return (
    <div className="fair-page">
      <PageHeader
        title="Cohorts"
        description="Cohort segments, sample sizes, and disparity. Priya Poluru owns segment reviews."
        crumbs={[BREADCRUMB_ROOT, { label: 'Cohorts' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => setOpen(true)}>
            Add cohort
          </Button>
        }
      />

      <section className="fair-panel">
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Cohort' },
            { key: 'model', label: 'Model' },
            { key: 'size', label: 'Size' },
            { key: 'disparity', label: 'Disparity' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {cohorts.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="fair-segment-meta">
              <Status label={row.status} variant={COHORT_STATUS[row.status] ?? 'neutral'} />
              <span>{row.model}</span>
              <span>{row.size.toLocaleString()} records</span>
            </div>
            <ProgressBar value={Math.round(row.disparity * 100)} max={100} showValue />
            <p className="fair-copy fair-drawer-note">
              Disparity {row.disparity} · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Add cohort"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Cohort added', description: 'Priya Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Schedule
          </Button>
        }
      >
        <p className="fair-copy">New cohort will inherit the program parity floor from Jonah Poluru.</p>
      </Modal>
    </div>
  );
}
