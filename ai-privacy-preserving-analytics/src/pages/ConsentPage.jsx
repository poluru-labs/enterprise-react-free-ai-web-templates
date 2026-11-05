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
import consent from '../data/consent.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { CONSENT_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function ConsentPage() {
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const mapped = consent.map((row) => ({
      name: row.name,
      purpose: row.purpose,
      region: row.region,
      subjects: row.subjects,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  const maxSubjects = Math.max(...consent.map((row) => row.subjects), 1);

  return (
    <div className="priv-page">
      <PageHeader
        title="Consent scopes"
        description="Purposes and regions under active consent. Priya Poluru owns renewals."
        crumbs={[BREADCRUMB_ROOT, { label: 'Consent' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => setOpen(true)}>
            Add scope
          </Button>
        }
      />

      <section className="priv-panel">
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Scope' },
            { key: 'purpose', label: 'Purpose' },
            { key: 'region', label: 'Region' },
            { key: 'subjects', label: 'Subjects' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {consent.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="priv-segment-meta">
              <Status label={row.status} variant={CONSENT_STATUS[row.status] ?? 'neutral'} />
              <span>{row.region}</span>
              <span>{row.subjects.toLocaleString()} subjects</span>
            </div>
            <ProgressBar value={Math.round((row.subjects / maxSubjects) * 100)} max={100} showValue />
            <p className="priv-copy priv-drawer-note">
              {row.purpose} · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Add consent scope"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Scope saved', description: 'Priya Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Save scope
          </Button>
        }
      >
        <p className="priv-copy">New scopes require legal review from Leela Poluru before activation.</p>
      </Modal>
    </div>
  );
}
