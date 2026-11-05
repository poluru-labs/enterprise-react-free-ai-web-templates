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
import kpis from '../data/kpis.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { KPI_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function KpisPage() {
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const mapped = kpis.map((row) => ({
      name: row.name,
      cohort: row.cohort,
      value: row.value,
      target: row.target,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  return (
    <div className="rq-page">
      <PageHeader
        title="KPI board"
        description="Precision, recall, and ranking metrics by cohort. Leela Poluru sets targets."
        crumbs={[BREADCRUMB_ROOT, { label: 'KPIs' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => setOpen(true)}>
            Add KPI
          </Button>
        }
      />

      <section className="rq-panel">
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'KPI' },
            { key: 'cohort', label: 'Cohort' },
            { key: 'value', label: 'Value' },
            { key: 'target', label: 'Target' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {kpis.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="rq-segment-meta">
              <Status label={row.status} variant={KPI_STATUS[row.status] ?? 'neutral'} />
              <span>{row.cohort}</span>
              <span>
                {row.value} / {row.target}
              </span>
            </div>
            <ProgressBar value={Math.min(100, Math.round((row.value / row.target) * 100))} max={100} showValue />
            <p className="rq-copy rq-drawer-note">
              Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Add KPI"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'KPI draft saved', description: 'Jonah Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Save draft
          </Button>
        }
      >
        <p className="rq-copy">New KPIs need gold-set approval from Priya Poluru before publishing.</p>
      </Modal>
    </div>
  );
}
