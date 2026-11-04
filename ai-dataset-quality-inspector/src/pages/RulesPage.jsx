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
import rules from '../data/rules.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { sortRows } from '../lib/sort.js';
import { RULE_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function RulesPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [ruleStatus, setRuleStatus] = useState('Draft');

  const filtered = useMemo(() => {
    if (band === 'all') return rules;
    return rules.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      scope: row.scope,
      threshold: row.threshold,
      dueInDays: row.dueInDays,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const activeCount = rules.filter((row) => row.status === 'Active').length;

  return (
    <div className="qual-page">
      <PageHeader
        title="Rules"
        description="Validation thresholds, scopes, and owners. Priya Poluru curates the rule catalog."
        crumbs={[BREADCRUMB_ROOT, { label: 'Rules' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Propose rule
          </Button>
        }
      />

      <DescriptionList
        compact
        items={[
          { term: 'Active rules', description: String(activeCount) },
          { term: 'Rule desk', description: 'Jonah Poluru' },
          { term: 'Blocked', description: 'Nina Poluru' },
        ]}
      />

      <ButtonGroup size="sm" className="qual-button-group">
        {[
          ['all', 'All'],
          ['Active', 'Active'],
          ['Draft', 'Draft'],
          ['Blocked', 'Blocked'],
          ['Deprecated', 'Deprecated'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="qual-panel">
        <h2>Rule catalog</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Rule' },
            { key: 'scope', label: 'Scope' },
            { key: 'threshold', label: 'Threshold' },
            { key: 'dueInDays', label: 'Review (d)' },
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
            <div className="qual-segment-meta">
              <Badge label={row.status} variant={RULE_STATUS[row.status] ?? 'neutral'} soft size="sm" />
              <span>{row.scope}</span>
              <span>{row.threshold}</span>
            </div>
            <p className="qual-copy">Review in {row.dueInDays} days · Owner {row.owner}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Propose validation rule"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Rule proposed', variant: 'success' });
              setOpen(false);
            }}
          >
            Submit
          </Button>
        }
      >
        <div className="qual-stack">
          <Textarea
            label="Rule name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Not-null on order_id"
          />
          <Select
            label="Status"
            value={ruleStatus}
            onChange={setRuleStatus}
            options={[
              { label: 'Draft', value: 'Draft' },
              { label: 'Active', value: 'Active' },
              { label: 'Blocked', value: 'Blocked' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
