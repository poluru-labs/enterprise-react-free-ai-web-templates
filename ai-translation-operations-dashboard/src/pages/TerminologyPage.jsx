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
import terminology from '../data/terminology.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { sortRows } from '../lib/sort.js';
import { TERM_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function TerminologyPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [termStatus, setTermStatus] = useState('Proposed');

  const filtered = useMemo(() => {
    if (band === 'all') return terminology;
    return terminology.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      title: row.title,
      category: row.category,
      status: row.status,
      due: row.due,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const openCount = terminology.filter((row) => row.status === 'Conflict').length;

  const create = () => {
    if (!title.trim()) {
      showToast({ title: 'Enter the term', variant: 'warning' });
      return;
    }
    showToast({
      title: 'Term proposed',
      description: `${title.trim()} · Jonah Poluru`,
      variant: 'success',
    });
    setOpen(false);
    setTitle('');
  };

  return (
    <div className="trn-page">
      <PageHeader
        title="Terminology"
        description="Glossary entries, locale locks, and conflicts. Priya Poluru triages terms with Marcus Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Terminology' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            New term
          </Button>
        }
      />

      <DescriptionList
        compact
        items={[
          { term: 'Open conflicts', description: String(openCount) },
          { term: 'Glossary desk', description: 'Vendor desk · Nina Poluru' },
          { term: 'Commercial', description: 'Marcus Poluru' },
        ]}
      />

      <ButtonGroup size="sm" className="trn-button-group">
        {[
          ['all', 'All'],
          ['Proposed', 'Proposed'],
          ['Approved', 'Approved'],
          ['Conflict', 'Conflict'],
          ['Deprecated', 'Deprecated'],
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

      <section className="trn-panel">
        <h2>Queue</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'title', label: 'Term' },
            { key: 'category', label: 'Category' },
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
            <div className="trn-segment-meta">
              <Badge label={row.status} variant={TERM_STATUS[row.status] ?? 'neutral'} soft size="sm" />
              <span>{row.locale}</span>
              <span>{row.category}</span>
              <span>Due {formatDisplayDate(row.due)}</span>
            </div>
            <p className="trn-copy">{row.note}</p>
            <p className="trn-copy trn-drawer-note">Owner {row.owner}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="New term"
        footer={
          <div className="trn-drawer-actions">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={create}>Submit</Button>
          </div>
        }
      >
        <div className="trn-stack">
          <Textarea
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Control tower"
          />
          <Select
            label="Status"
            value={termStatus}
            onChange={setTermStatus}
            options={[
              { label: 'Proposed', value: 'Proposed' },
              { label: 'Approved', value: 'Approved' },
              { label: 'Conflict', value: 'Conflict' },
              { label: 'Deprecated', value: 'Deprecated' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
