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
import clusters from '../data/clusters.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { CLUSTER_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function ClustersPage() {
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const mapped = clusters.map((row) => ({
      name: row.name,
      papers: row.papers,
      cohesion: row.cohesion,
      driftPct: row.driftPct,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  return (
    <div className="lit-page">
      <PageHeader
        title="Topic clusters"
        description="Thematic groups and cohesion scores. Leela Poluru owns cluster policy."
        crumbs={[BREADCRUMB_ROOT, { label: 'Clusters' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => setOpen(true)}>
            New cluster
          </Button>
        }
      />

      <section className="lit-panel">
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Cluster' },
            { key: 'papers', label: 'Papers' },
            { key: 'cohesion', label: 'Cohesion' },
            { key: 'driftPct', label: 'Drift %' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {clusters.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="lit-segment-meta">
              <Status label={row.status} variant={CLUSTER_STATUS[row.status] ?? 'neutral'} />
              <span>{row.papers} papers</span>
              <span>cohesion {row.cohesion}</span>
            </div>
            <ProgressBar value={Math.min(100, Math.round(row.cohesion * 100))} max={100} showValue />
            <p className="lit-copy lit-drawer-note">
              Drift {row.driftPct}% · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Create cluster"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Cluster draft saved', description: 'Maya Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Save draft
          </Button>
        }
      >
        <p className="lit-copy">New clusters need curation review from Priya Poluru before publish.</p>
      </Modal>
    </div>
  );
}
