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
import lineage from '../data/lineage.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { LINEAGE_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function LineagePage() {
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const mapped = lineage.map((row) => ({
      name: row.name,
      upstream: row.upstream,
      downstream: row.downstream,
      depth: row.depth,
      coverage: row.coverage,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  return (
    <div className="prov-page">
      <PageHeader
        title="Lineage"
        description="Upstream and downstream edges as an auditable table. Maya Poluru owns lineage curation."
        crumbs={[BREADCRUMB_ROOT, { label: 'Lineage' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => setOpen(true)}>
            Add edge
          </Button>
        }
      />

      <section className="prov-panel">
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Edge' },
            { key: 'upstream', label: 'Upstream' },
            { key: 'downstream', label: 'Downstream' },
            { key: 'depth', label: 'Depth' },
            { key: 'coverage', label: 'Coverage %' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {lineage.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="prov-segment-meta">
              <Status label={row.status} variant={LINEAGE_STATUS[row.status] ?? 'neutral'} />
              <span>{row.upstream} → {row.downstream}</span>
              <span>Depth {row.depth}</span>
            </div>
            <ProgressBar value={row.coverage} max={100} showValue />
            <p className="prov-copy prov-drawer-note">
              Coverage {row.coverage}% · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Register lineage edge"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Edge queued', description: 'Priya Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Submit
          </Button>
        }
      >
        <p className="prov-copy">New edges inherit validation rules Jonah Poluru maintains for this registry.</p>
      </Modal>
    </div>
  );
}
