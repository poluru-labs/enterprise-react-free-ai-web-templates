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
import custody from '../data/custody.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { sortRows } from '../lib/sort.js';
import { CUSTODY_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function CustodyPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [custodyStatus, setCustodyStatus] = useState('Open');

  const filtered = useMemo(() => {
    if (band === 'all') return custody;
    return custody.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      fromZone: row.fromZone,
      toZone: row.toZone,
      items: row.items,
      dueInDays: row.dueInDays,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const activeCount = custody.filter((row) => row.status === 'Open' || row.status === 'In transit').length;

  return (
    <div className="prov-page">
      <PageHeader
        title="Custody"
        description="Zone handoffs, seals, and disputed transfers. Priya Poluru owns the custody desk."
        crumbs={[BREADCRUMB_ROOT, { label: 'Custody' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Open handoff
          </Button>
        }
      />

      <DescriptionList
        compact
        items={[
          { term: 'Active handoffs', description: String(activeCount) },
          { term: 'Custody desk', description: 'Jonah Poluru' },
          { term: 'Disputes', description: 'Nina Poluru' },
        ]}
      />

      <ButtonGroup size="sm" className="prov-button-group">
        {[
          ['all', 'All'],
          ['Open', 'Open'],
          ['In transit', 'In transit'],
          ['Disputed', 'Disputed'],
          ['Sealed', 'Sealed'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="prov-panel">
        <h2>Custody register</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Handoff' },
            { key: 'fromZone', label: 'From' },
            { key: 'toZone', label: 'To' },
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
            <div className="prov-segment-meta">
              <Badge label={row.status} variant={CUSTODY_STATUS[row.status] ?? 'neutral'} soft size="sm" />
              <span>{row.fromZone} → {row.toZone}</span>
              <span>{row.items} dataset(s)</span>
            </div>
            <p className="prov-copy">Due in {row.dueInDays} days · Owner {row.owner}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Open custody handoff"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Handoff opened', variant: 'success' });
              setOpen(false);
            }}
          >
            Submit
          </Button>
        }
      >
        <div className="prov-stack">
          <Textarea
            label="Handoff title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Partner feed — raw landing intake"
          />
          <Select
            label="Status"
            value={custodyStatus}
            onChange={setCustodyStatus}
            options={[
              { label: 'Open', value: 'Open' },
              { label: 'In transit', value: 'In transit' },
              { label: 'Disputed', value: 'Disputed' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
