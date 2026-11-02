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
import audits from '../data/audits.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { AUDIT_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function AuditsPage() {
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const mapped = audits.map((row) => ({
      name: row.name,
      profile: row.profile,
      pages: row.pages,
      findings: row.findings,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  return (
    <div className="acc-page">
      <PageHeader
        title="Audits"
        description="Page scans, WCAG profiles, and run history. Priya Poluru owns crawl schedules."
        crumbs={[BREADCRUMB_ROOT, { label: 'Audits' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => setOpen(true)}>
            Schedule scan
          </Button>
        }
      />

      <section className="acc-panel">
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Run' },
            { key: 'profile', label: 'Profile' },
            { key: 'pages', label: 'Pages' },
            { key: 'findings', label: 'Findings' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {audits.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="acc-segment-meta">
              <Status label={row.status} variant={AUDIT_STATUS[row.status] ?? 'neutral'} />
              <span>{row.profile}</span>
              <span>{row.pages} pages</span>
            </div>
            <ProgressBar
              value={row.status === 'Complete' ? 100 : row.status === 'Running' ? 55 : 10}
              max={100}
              showValue
            />
            <p className="acc-copy acc-drawer-note">
              {row.findings} findings · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Schedule scan"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Scan scheduled', description: 'Priya Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Schedule
          </Button>
        }
      >
        <p className="acc-copy">Weekly storefront crawl will run against WCAG 2.2 AA.</p>
      </Modal>
    </div>
  );
}
