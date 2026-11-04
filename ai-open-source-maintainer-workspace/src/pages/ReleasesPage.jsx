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
import releases from '../data/releases.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { RELEASE_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function ReleasesPage() {
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const mapped = releases.map((row) => ({
      name: row.name,
      tag: row.tag,
      downloads: row.downloads,
      deltaPct: row.deltaPct,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  return (
    <div className="maint-page">
      <PageHeader
        title="Releases"
        description="Tags, notes, and download trends. Maya Poluru owns the release calendar."
        crumbs={[BREADCRUMB_ROOT, { label: 'Releases' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => setOpen(true)}>
            Draft release
          </Button>
        }
      />

      <section className="maint-panel">
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Release' },
            { key: 'tag', label: 'Tag' },
            { key: 'downloads', label: 'Downloads' },
            { key: 'deltaPct', label: 'Δ %' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {releases.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="maint-segment-meta">
              <Status label={row.status} variant={RELEASE_STATUS[row.status] ?? 'neutral'} />
              <span>{row.tag}</span>
              <span>{row.downloads.toLocaleString()} dl</span>
            </div>
            <ProgressBar value={Math.min(100, row.downloads / 1000)} max={100} showValue />
            <p className="maint-copy maint-drawer-note">
              Δ {row.deltaPct}% · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Draft release"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Draft saved', description: 'Maya Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Save draft
          </Button>
        }
      >
        <p className="maint-copy">Drafts require changelog review from Leela Poluru before publish.</p>
      </Modal>
    </div>
  );
}
