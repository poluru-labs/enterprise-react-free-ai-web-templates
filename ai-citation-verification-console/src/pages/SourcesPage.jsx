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
import sources from '../data/sources.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { SOURCE_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function SourcesPage() {
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const mapped = sources.map((row) => ({
      name: row.name,
      type: row.type,
      checks: row.checks,
      uptime: row.uptime,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  return (
    <div className="cite-page">
      <PageHeader
        title="Sources"
        description="Link health, API endpoints, and archive mirrors. Kavya Poluru owns crawl schedules."
        crumbs={[BREADCRUMB_ROOT, { label: 'Sources' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => setOpen(true)}>
            Add source
          </Button>
        }
      />

      <section className="cite-panel">
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Source' },
            { key: 'type', label: 'Type' },
            { key: 'checks', label: 'Checks' },
            { key: 'uptime', label: 'Uptime %' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {sources.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="cite-segment-meta">
              <Status label={row.status} variant={SOURCE_STATUS[row.status] ?? 'neutral'} />
              <span>{row.type}</span>
              <span>{row.checks.toLocaleString()} checks</span>
            </div>
            <ProgressBar value={row.uptime} max={100} showValue />
            <p className="cite-copy cite-drawer-note">
              Uptime {row.uptime}% · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Register source"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Source queued', description: 'Priya Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Schedule crawl
          </Button>
        }
      >
        <p className="cite-copy">New sources inherit default retry rules Jonah Poluru maintains for this desk.</p>
      </Modal>
    </div>
  );
}
