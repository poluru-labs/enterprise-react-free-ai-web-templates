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
import requests from '../data/requests.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { sortRows } from '../lib/sort.js';
import { REQUEST_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function RequestsPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [requestStatus, setRequestStatus] = useState('Open');

  const filtered = useMemo(() => {
    if (band === 'all') return requests;
    if (band === 'Urgent') return requests.filter((row) => row.priority === 'Urgent');
    return requests.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      site: row.site,
      priority: row.priority,
      unitsNeeded: row.unitsNeeded,
      dueInDays: row.dueInDays,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const openCount = requests.filter((row) => row.status === 'Open').length;

  return (
    <div className="relief-page">
      <PageHeader
        title="Requests"
        description="Site needs, priority, and fulfillment. Priya Poluru runs the request desk."
        crumbs={[BREADCRUMB_ROOT, { label: 'Requests' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Log request
          </Button>
        }
      />

      <DescriptionList
        compact
        items={[
          { term: 'Open requests', description: String(openCount) },
          { term: 'Request desk', description: 'Priya Poluru' },
          { term: 'Escalations', description: 'Nina Poluru' },
        ]}
      />

      <ButtonGroup size="sm" className="relief-button-group">
        {[
          ['all', 'All'],
          ['Open', 'Open'],
          ['Urgent', 'Urgent'],
          ['Fulfilled', 'Fulfilled'],
          ['Cancelled', 'Cancelled'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="relief-panel">
        <h2>Request queue</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Request' },
            { key: 'site', label: 'Site' },
            { key: 'priority', label: 'Priority' },
            { key: 'unitsNeeded', label: 'Units' },
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
            <div className="relief-segment-meta">
              <Badge label={row.status} variant={REQUEST_STATUS[row.status] ?? 'neutral'} soft size="sm" />
              <span>{row.site}</span>
              <span>{row.priority} priority</span>
            </div>
            <p className="relief-copy">Due in {row.dueInDays} days · Owner {row.owner}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Log site request"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Request logged', variant: 'success' });
              setOpen(false);
            }}
          >
            Submit
          </Button>
        }
      >
        <div className="relief-stack">
          <Textarea
            label="Need summary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Medical kits — Clinic R-4"
          />
          <Select
            label="Status"
            value={requestStatus}
            onChange={setRequestStatus}
            options={[
              { label: 'Open', value: 'Open' },
              { label: 'Urgent', value: 'Urgent' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
