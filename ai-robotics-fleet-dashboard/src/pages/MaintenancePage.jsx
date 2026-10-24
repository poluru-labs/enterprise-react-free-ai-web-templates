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
import maintenance from '../data/maintenance.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { sortRows } from '../lib/sort.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PRIORITY_VARIANT = {
  High: 'danger',
  Medium: 'warning',
  Low: 'neutral',
};

const STATUS_VARIANT = {
  Open: 'warning',
  Scheduled: 'info',
  'In progress': 'brand',
  Completed: 'success',
};

export default function MaintenancePage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');

  const filtered = useMemo(() => {
    if (band === 'all') return maintenance;
    return maintenance.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      title: row.title,
      robot: row.robot,
      priority: row.priority,
      status: row.status,
      due: row.due,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const openCount = maintenance.filter((row) => row.status === 'Open').length;

  const create = () => {
    if (!title.trim()) {
      showToast({ title: 'Describe the work order', variant: 'warning' });
      return;
    }
    showToast({
      title: 'Work order filed',
      description: `${title.trim()} · Jonah Poluru`,
      variant: 'success',
    });
    setOpen(false);
    setTitle('');
  };

  return (
    <div className="flt-page">
      <PageHeader
        title="Maintenance"
        description="Work orders, parts, and shop bay time. Jonah Poluru triages faults with Marcus Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Maintenance' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            New work order
          </Button>
        }
      />

      <DescriptionList
        compact
        items={[
          { term: 'Open tickets', description: String(openCount) },
          { term: 'Shop bay', description: 'Bay 2 · Nina Poluru' },
          { term: 'Parts desk', description: 'Marcus Poluru' },
        ]}
      />

      <ButtonGroup size="sm" className="flt-button-group">
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

      <section className="flt-panel">
        <h2>Queue</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'title', label: 'Work order' },
            { key: 'robot', label: 'Robot' },
            { key: 'priority', label: 'Priority' },
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
            <div className="flt-segment-meta">
              <Badge label={row.priority} variant={PRIORITY_VARIANT[row.priority] ?? 'neutral'} soft size="sm" />
              <Badge label={row.status} variant={STATUS_VARIANT[row.status] ?? 'neutral'} soft size="sm" />
              <span>{row.robot}</span>
              <span>Due {formatDisplayDate(row.due)}</span>
            </div>
            <p className="flt-copy">{row.note}</p>
            <p className="flt-copy flt-drawer-note">Owner {row.owner}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="New work order"
        footer={
          <div className="flt-drawer-actions">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={create}>Submit</Button>
          </div>
        }
      >
        <div className="flt-stack">
          <Textarea
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Replace drive wheel on Pick Gamma"
          />
          <Select
            label="Priority"
            value={priority}
            onChange={setPriority}
            options={[
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
