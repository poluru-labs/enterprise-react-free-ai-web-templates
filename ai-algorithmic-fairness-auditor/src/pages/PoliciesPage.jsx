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
import policies from '../data/policies.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { sortRows } from '../lib/sort.js';
import { POLICY_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function PoliciesPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [policyStatus, setPolicyStatus] = useState('Draft');

  const filtered = useMemo(() => {
    if (band === 'all') return policies;
    return policies.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      title: row.title,
      scope: row.scope,
      threshold: row.threshold,
      status: row.status,
      due: row.due,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const exceptionCount = policies.filter((row) => row.status === 'Exception').length;

  return (
    <div className="fair-page">
      <PageHeader
        title="Policies"
        description="Thresholds, enforcement, and exceptions. Jonah Poluru owns policy sign-off."
        crumbs={[BREADCRUMB_ROOT, { label: 'Policies' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Propose policy
          </Button>
        }
      />

      <DescriptionList
        compact
        items={[
          { term: 'Exceptions', description: String(exceptionCount) },
          { term: 'Policy desk', description: 'Jonah Poluru' },
          { term: 'Evidence', description: 'Nina Poluru' },
        ]}
      />

      <ButtonGroup size="sm" className="fair-button-group">
        {[
          ['all', 'All'],
          ['Enforced', 'Enforced'],
          ['Draft', 'Draft'],
          ['Exception', 'Exception'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="fair-panel">
        <h2>Policy register</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'title', label: 'Policy' },
            { key: 'scope', label: 'Scope' },
            { key: 'threshold', label: 'Threshold' },
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
            <div className="fair-segment-meta">
              <Badge label={row.status} variant={POLICY_STATUS[row.status] ?? 'neutral'} soft size="sm" />
              <span>{row.scope}</span>
              <span>Due {formatDisplayDate(row.due)}</span>
            </div>
            <p className="fair-copy">{row.note}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal open={open} onOpenChange={setOpen} heading="Propose policy" footer={
        <Button onClick={() => { showToast({ title: 'Policy proposed', variant: 'success' }); setOpen(false); }}>Submit</Button>
      }>
        <div className="fair-stack">
          <Textarea label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Minimum parity floor" />
          <Select label="Status" value={policyStatus} onChange={setPolicyStatus} options={[
            { label: 'Draft', value: 'Draft' },
            { label: 'Enforced', value: 'Enforced' },
            { label: 'Exception', value: 'Exception' },
          ]} />
        </div>
      </Modal>
    </div>
  );
}
