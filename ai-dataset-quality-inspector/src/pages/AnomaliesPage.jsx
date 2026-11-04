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
import anomalies from '../data/anomalies.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { ANOMALY_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const SEVERITY_SCORE = { Low: 25, Medium: 50, High: 75, Critical: 100 };

export default function AnomaliesPage() {
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const mapped = anomalies.map((row) => ({
      name: row.name,
      table: row.table,
      count: row.count,
      severity: row.severity,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  return (
    <div className="qual-page">
      <PageHeader
        title="Anomalies"
        description="Row-level spikes, drift, and open investigations. Priya Poluru triages severity with Kavya Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Anomalies' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => setOpen(true)}>
            Log anomaly
          </Button>
        }
      />

      <section className="qual-panel">
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Anomaly' },
            { key: 'table', label: 'Table' },
            { key: 'count', label: 'Count' },
            { key: 'severity', label: 'Severity' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {anomalies.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="qual-segment-meta">
              <Status label={row.status} variant={ANOMALY_STATUS[row.status] ?? 'neutral'} />
              <span>{row.table}</span>
              <span>{row.count.toLocaleString()} rows</span>
            </div>
            <ProgressBar value={SEVERITY_SCORE[row.severity] ?? 50} max={100} showValue />
            <p className="qual-copy qual-drawer-note">
              {row.severity} · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Log anomaly"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Anomaly logged', description: 'Priya Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Submit
          </Button>
        }
      >
        <p className="qual-copy">New anomalies inherit escalation rules Jonah Poluru maintains for this catalog.</p>
      </Modal>
    </div>
  );
}
