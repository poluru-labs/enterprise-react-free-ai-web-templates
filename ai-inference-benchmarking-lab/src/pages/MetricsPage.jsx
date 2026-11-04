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
import metrics from '../data/metrics.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { METRIC_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function MetricsPage() {
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const mapped = metrics.map((row) => ({
      name: row.name,
      suite: row.suite,
      latencyMs: row.latencyMs,
      throughputRps: row.throughputRps,
      deltaPct: row.deltaPct,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  return (
    <div className="bench-page">
      <PageHeader
        title="Metrics"
        description="Latency and throughput aggregates by suite. Priya Poluru owns regression thresholds."
        crumbs={[BREADCRUMB_ROOT, { label: 'Metrics' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => setOpen(true)}>
            Snapshot metrics
          </Button>
        }
      />

      <section className="bench-panel">
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Metric' },
            { key: 'suite', label: 'Suite' },
            { key: 'latencyMs', label: 'Latency (ms)' },
            { key: 'throughputRps', label: 'Throughput (rps)' },
            { key: 'deltaPct', label: 'Δ %' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {metrics.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="bench-segment-meta">
              <Status label={row.status} variant={METRIC_STATUS[row.status] ?? 'neutral'} />
              <span>{row.latencyMs} ms p99</span>
              <span>{row.throughputRps.toLocaleString()} rps</span>
            </div>
            <ProgressBar value={Math.min(100, row.throughputRps / 100)} max={100} showValue />
            <p className="bench-copy bench-drawer-note">
              Δ {row.deltaPct}% · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Capture metric snapshot"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Snapshot saved', description: 'Priya Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Save
          </Button>
        }
      >
        <p className="bench-copy">Snapshots attach to the latest completed run on each host profile.</p>
      </Modal>
    </div>
  );
}
