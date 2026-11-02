import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  ButtonGroup,
  DataTable,
  DescriptionList,
  Modal,
  Select,
  Textarea,
  formatDisplayDate,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import accommodations from '../data/accommodations.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { sortRows } from '../lib/sort.js';
import { ACCOMMODATION_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function AccommodationsPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [accommodationStatus, setAccommodationStatus] = useState('Pending');

  const filtered = useMemo(() => {
    if (band === 'all') return accommodations;
    return accommodations.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      title: row.title,
      type: row.type,
      learner: row.learner,
      status: row.status,
      due: row.due,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const pendingCount = accommodations.filter((row) => row.status === 'Pending').length;

  return (
    <div className="learn-page">
      <PageHeader
        title="Accommodations"
        description="Requests, types, and approvals. Priya Poluru owns accommodation sign-off."
        crumbs={[BREADCRUMB_ROOT, { label: 'Accommodations' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Propose accommodation
          </Button>
        }
      />

      <DescriptionList
        compact
        items={[
          { term: 'Pending', description: String(pendingCount) },
          { term: 'Accommodation desk', description: 'Jonah Poluru' },
          { term: 'Evidence', description: 'Nina Poluru' },
        ]}
      />

      <ButtonGroup size="sm" className="learn-button-group">
        {[
          ['all', 'All'],
          ['Approved', 'Approved'],
          ['Pending', 'Pending'],
          ['Denied', 'Denied'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="learn-panel">
        <h2>Accommodation register</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'title', label: 'Accommodation' },
            { key: 'type', label: 'Scope' },
            { key: 'learner', label: 'Threshold' },
            { key: 'status', label: 'Status' },
            { key: 'due', label: 'Due' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {filtered.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.title}`}>
            <div className="learn-segment-meta">
              <Badge label={row.status} variant={ACCOMMODATION_STATUS[row.status] ?? 'neutral'} soft size="sm" />
              <span>{row.type}</span>
              <span>Due {formatDisplayDate(row.due)}</span>
            </div>
            <p className="learn-copy">{row.note}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal open={open} onOpenChange={setOpen} heading="Propose accommodation" footer={
        <Button onClick={() => { showToast({ title: 'Accommodation proposed', variant: 'success' }); setOpen(false); }}>Submit</Button>
      }>
        <div className="learn-stack">
          <Textarea label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Extended time on assessments" />
          <Select label="Status" value={accommodationStatus} onChange={setAccommodationStatus} options={[
              { label: 'Pending', value: 'Pending' },
              { label: 'Approved', value: 'Approved' },
              { label: 'Denied', value: 'Denied' },
          ]} />
        </div>
      </Modal>
    </div>
  );
}
