import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Alert,
  Button,
  ButtonGroup,
  DataTable,
  Input,
  Modal,
  Status,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import publishers from '../data/publishers.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { PUBLISHER_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function PublishersPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const filtered = useMemo(() => {
    if (band === 'all') return publishers;
    return publishers.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      issn: row.issn,
      region: row.region,
      slaDays: row.slaDays,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  return (
    <div className="cite-page">
      <PageHeader
        title="Publishers"
        description="ISSN metadata, regional contacts, and verification SLAs. Leela Poluru owns publisher sync."
        crumbs={[BREADCRUMB_ROOT, { label: 'Publishers' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Add publisher
          </Button>
        }
      />

      <Alert
        variant="info"
        title="Metadata refresh"
        message="Elsevier contacts updated this morning. Maya Poluru is validating ISSN crosswalks."
        dismissible
      />

      <ButtonGroup size="sm" className="cite-button-group">
        {[
          ['all', 'All'],
          ['Active', 'Active'],
          ['On hold', 'On hold'],
          ['Deprecated', 'Deprecated'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="cite-panel">
        <h2>Publisher roster</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Publisher' },
            { key: 'issn', label: 'ISSN' },
            { key: 'region', label: 'Region' },
            { key: 'slaDays', label: 'SLA (d)' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {filtered.map((row) => (
          <AccordionItem key={row.id} heading={row.name}>
            <div className="cite-segment-meta">
              <Status label={row.status} variant={PUBLISHER_STATUS[row.status] ?? 'neutral'} />
              <span>ISSN {row.issn}</span>
              <span>{row.region}</span>
            </div>
            <p className="cite-copy cite-drawer-note">
              SLA {row.slaDays} days · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Add publisher"
        footer={
          <Button
            onClick={() => {
              if (!name.trim()) {
                showToast({ title: 'Enter publisher name', variant: 'warning' });
                return;
              }
              showToast({ title: 'Publisher added', description: 'Leela Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Create
          </Button>
        }
      >
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Regional Press Co-op" />
      </Modal>
    </div>
  );
}
