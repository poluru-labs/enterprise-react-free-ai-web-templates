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
import suppliers from '../data/suppliers.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { sortRows } from '../lib/sort.js';
import { SUPPLIER_RISK } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_VARIANT = {
  Open: 'warning',
  Scheduled: 'info',
  'In progress': 'brand',
  Completed: 'success',
};

export default function SuppliersPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [riskLevel, setRiskLevel] = useState('Medium');

  const filtered = useMemo(() => {
    if (band === 'all') return suppliers;
    return suppliers.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      title: row.title,
      category: row.category,
      risk: row.risk,
      status: row.status,
      due: row.due,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const openCount = suppliers.filter((row) => row.status === 'Open').length;

  const create = () => {
    if (!title.trim()) {
      showToast({ title: 'Name the supplier review', variant: 'warning' });
      return;
    }
    showToast({
      title: 'Review filed',
      description: `${title.trim()} · Jonah Poluru`,
      variant: 'success',
    });
    setOpen(false);
    setTitle('');
  };

  return (
    <div className="sct-page">
      <PageHeader
        title="Suppliers"
        description="Vendor scores, audits, and mitigations. Jonah Poluru triages risk with Marcus Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Suppliers' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            New review
          </Button>
        }
      />

      <DescriptionList
        compact
        items={[
          { term: 'Open reviews', description: String(openCount) },
          { term: 'Audit queue', description: 'Vendor desk · Nina Poluru' },
          { term: 'Commercial', description: 'Marcus Poluru' },
        ]}
      />

      <ButtonGroup size="sm" className="sct-button-group">
        {[
          ['all', 'All'],
          ['Open', 'Open'],
          ['Scheduled', 'Scheduled'],
          ['In progress', 'In progress'],
          ['Completed', 'Completed'],
        ].map(([value, label]) => (
          <Button
            key={value}
            variant={band === value ? 'primary' : 'secondary'}
            onClick={() => setBand(value)}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="sct-panel">
        <h2>Queue</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'title', label: 'Supplier' },
            { key: 'category', label: 'Category' },
            { key: 'risk', label: 'Risk' },
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
            <div className="sct-segment-meta">
              <Badge label={row.risk} variant={SUPPLIER_RISK[row.risk] ?? 'neutral'} soft size="sm" />
              <Badge label={row.status} variant={STATUS_VARIANT[row.status] ?? 'neutral'} soft size="sm" />
              <span>{row.category}</span>
              <span>Score {row.score}</span>
              <span>Due {formatDisplayDate(row.due)}</span>
            </div>
            <p className="sct-copy">{row.note}</p>
            <p className="sct-copy sct-drawer-note">Owner {row.owner}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="New review"
        footer={
          <div className="sct-drawer-actions">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={create}>Submit</Button>
          </div>
        }
      >
        <div className="sct-stack">
          <Textarea
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Review Acme Components lead time"
          />
          <Select
            label="Risk"
            value={riskLevel}
            onChange={setRiskLevel}
            options={[
              { label: 'Critical', value: 'Critical' },
              { label: 'High', value: 'High' },
              { label: 'Medium', value: 'Medium' },
              { label: 'Low', value: 'Low' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
