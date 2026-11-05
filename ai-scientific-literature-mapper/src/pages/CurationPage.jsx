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
import curation from '../data/curation.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { CURATION_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function CurationPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [taskStatus, setTaskStatus] = useState('Open');

  const filtered = useMemo(() => {
    if (band === 'all') return curation;
    return curation.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      assignee: row.assignee,
      paperId: row.paperId,
      priority: row.priority,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const openCount = curation.filter((row) => row.status === 'Open' || row.status === 'Assigned').length;

  return (
    <div className="lit-page">
      <PageHeader
        title="Curation queue"
        description="Metadata fixes, merges, and verification tasks. Priya Poluru owns assignments."
        crumbs={[BREADCRUMB_ROOT, { label: 'Curation' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            New task
          </Button>
        }
      />

      <DescriptionList
        compact
        items={[
          { term: 'Open tasks', description: String(openCount) },
          { term: 'Curation desk', description: 'Priya Poluru' },
          { term: 'Escalations', description: 'Nina Poluru' },
        ]}
      />

      <ButtonGroup size="sm" className="lit-button-group">
        {[
          ['all', 'All'],
          ['Open', 'Open'],
          ['Assigned', 'Assigned'],
          ['Done', 'Done'],
          ['Blocked', 'Blocked'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="lit-panel">
        <h2>Task board</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Task' },
            { key: 'assignee', label: 'Assignee' },
            { key: 'paperId', label: 'Ref' },
            { key: 'priority', label: 'Priority' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Lead' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {filtered.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="lit-segment-meta">
              <Badge label={row.status} variant={CURATION_STATUS[row.status] ?? 'neutral'} soft size="sm" />
              <span>{row.paperId}</span>
              <span>{row.priority}</span>
            </div>
            <p className="lit-copy">
              {row.assignee} · Updated {formatDateTime(row.updated)} · Lead {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="New curation task"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Task created', variant: 'success' });
              setOpen(false);
            }}
          >
            Create
          </Button>
        }
      >
        <div className="lit-stack">
          <Textarea
            label="Description"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Fix journal abbreviation on import batch"
          />
          <Select
            label="Status"
            value={taskStatus}
            onChange={setTaskStatus}
            options={[
              { label: 'Open', value: 'Open' },
              { label: 'Assigned', value: 'Assigned' },
              { label: 'Blocked', value: 'Blocked' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
