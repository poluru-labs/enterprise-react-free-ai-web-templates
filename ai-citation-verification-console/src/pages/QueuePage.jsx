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
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import queue from '../data/queue.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { sortRows } from '../lib/sort.js';
import { QUEUE_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function QueuePage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [queueStatus, setQueueStatus] = useState('Open');

  const filtered = useMemo(() => {
    if (band === 'all') return queue;
    return queue.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      journal: row.journal,
      items: row.items,
      dueInDays: row.dueInDays,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const openCount = queue.filter((row) => row.status === 'Open' || row.status === 'In review').length;

  return (
    <div className="cite-page">
      <PageHeader
        title="Verification queue"
        description="Analyst batches, due dates, and escalations. Priya Poluru owns queue triage."
        crumbs={[BREADCRUMB_ROOT, { label: 'Queue' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Open batch
          </Button>
        }
      />

      <DescriptionList
        compact
        items={[
          { term: 'Active batches', description: String(openCount) },
          { term: 'Queue desk', description: 'Jonah Poluru' },
          { term: 'Escalations', description: 'Nina Poluru' },
        ]}
      />

      <ButtonGroup size="sm" className="cite-button-group">
        {[
          ['all', 'All'],
          ['Open', 'Open'],
          ['In review', 'In review'],
          ['Escalated', 'Escalated'],
          ['Cleared', 'Cleared'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="cite-panel">
        <h2>Queue register</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Batch' },
            { key: 'journal', label: 'Journal' },
            { key: 'items', label: 'Items' },
            { key: 'dueInDays', label: 'Due (d)' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {filtered.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="cite-segment-meta">
              <Badge label={row.status} variant={QUEUE_STATUS[row.status] ?? 'neutral'} soft size="sm" />
              <span>{row.journal}</span>
              <span>{row.items} citations</span>
            </div>
            <p className="cite-copy">Due in {row.dueInDays} days · Owner {row.owner}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Open verification batch"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Batch opened', variant: 'success' });
              setOpen(false);
            }}
          >
            Submit
          </Button>
        }
      >
        <div className="cite-stack">
          <Textarea
            label="Batch title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Springer link re-check — October"
          />
          <Select
            label="Status"
            value={queueStatus}
            onChange={setQueueStatus}
            options={[
              { label: 'Open', value: 'Open' },
              { label: 'In review', value: 'In review' },
              { label: 'Escalated', value: 'Escalated' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
