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
import modules from '../data/modules.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { MODULE_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function ModulesPage() {
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const mapped = modules.map((row) => ({
      name: row.name,
      track: row.track,
      lessons: row.lessons,
      completion: row.completion,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  return (
    <div className="learn-page">
      <PageHeader
        title="Modules"
        description="Content modules, lessons, and completion rates. Kavya Poluru owns curriculum publish."
        crumbs={[BREADCRUMB_ROOT, { label: 'Modules' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => setOpen(true)}>
            Publish module
          </Button>
        }
      />

      <section className="learn-panel">
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Module' },
            { key: 'track', label: 'Track' },
            { key: 'lessons', label: 'Lessons' },
            { key: 'completion', label: 'Completion %' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {modules.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="learn-segment-meta">
              <Status label={row.status} variant={MODULE_STATUS[row.status] ?? 'neutral'} />
              <span>{row.track}</span>
              <span>{row.lessons.toLocaleString()} lessons</span>
            </div>
            <ProgressBar value={row.completion} max={100} showValue />
            <p className="learn-copy learn-drawer-note">
              Completion {row.completion}% · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Publish module"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Module queued', description: 'Priya Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Schedule
          </Button>
        }
      >
        <p className="learn-copy">New modules inherit the default pathway rules Jonah Poluru maintains for this term.</p>
      </Modal>
    </div>
  );
}
