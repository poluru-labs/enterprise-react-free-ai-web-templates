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
import contributors from '../data/contributors.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { sortRows } from '../lib/sort.js';
import { CONTRIBUTOR_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function ContributorsPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [contribStatus, setContribStatus] = useState('New');

  const filtered = useMemo(() => {
    if (band === 'all') return contributors;
    return contributors.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      repos: row.repos,
      prsMerged: row.prsMerged,
      lastActiveDays: row.lastActiveDays,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const activeCount = contributors.filter((row) => row.status === 'Active').length;

  return (
    <div className="maint-page">
      <PageHeader
        title="Contributors"
        description="Review queue, activity, and thanks. Priya Poluru owns community triage."
        crumbs={[BREADCRUMB_ROOT, { label: 'Contributors' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Log contributor
          </Button>
        }
      />

      <DescriptionList
        compact
        items={[
          { term: 'Active contributors', description: String(activeCount) },
          { term: 'Community desk', description: 'Priya Poluru' },
          { term: 'Onboarding', description: 'Nina Poluru' },
        ]}
      />

      <ButtonGroup size="sm" className="maint-button-group">
        {[
          ['all', 'All'],
          ['Active', 'Active'],
          ['New', 'New'],
          ['Inactive', 'Inactive'],
          ['Flagged', 'Flagged'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="maint-panel">
        <h2>Contributor roster</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Contributor' },
            { key: 'repos', label: 'Repos' },
            { key: 'prsMerged', label: 'PRs merged' },
            { key: 'lastActiveDays', label: 'Last active (d)' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Reviewer' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {filtered.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="maint-segment-meta">
              <Badge label={row.status} variant={CONTRIBUTOR_STATUS[row.status] ?? 'neutral'} soft size="sm" />
              <span>{row.repos} repos</span>
              <span>{row.prsMerged} PRs</span>
            </div>
            <p className="maint-copy">Last active {row.lastActiveDays} days ago · Reviewer {row.owner}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Log contributor note"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Note saved', variant: 'success' });
              setOpen(false);
            }}
          >
            Submit
          </Button>
        }
      >
        <div className="maint-stack">
          <Textarea label="Note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="First-time contributor — send welcome guide" />
          <Select
            label="Status"
            value={contribStatus}
            onChange={setContribStatus}
            options={[
              { label: 'New', value: 'New' },
              { label: 'Active', value: 'Active' },
              { label: 'Flagged', value: 'Flagged' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
