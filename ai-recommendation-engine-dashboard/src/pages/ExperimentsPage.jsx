import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Alert,
  Button,
  ButtonGroup,
  Combobox,
  DataTable,
  DatePicker,
  Input,
  MenuItem,
  Modal,
  ProgressBar,
  Slider,
  SplitButton,
  Status,
  formatDisplayDate,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import experiments from '../data/experiments.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatPercent } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { EXP_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const MODELS = [
  { label: 'Ranker v4', value: 'ranker-v4' },
  { label: 'Two-tower', value: 'two-tower' },
  { label: 'Session bandit', value: 'bandit' },
  { label: 'Next-basket', value: 'next-basket' },
];

export default function ExperimentsPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [model, setModel] = useState('ranker-v4');
  const [ends, setEnds] = useState('2026-11-06');
  const [traffic, setTraffic] = useState(20);

  const filtered = useMemo(() => {
    if (band === 'all') return experiments;
    return experiments.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      owner: row.owner,
      lift: row.lift,
      traffic: row.traffic,
      status: row.status,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const create = (draft) => {
    if (!name.trim()) {
      showToast({ title: 'Name the experiment', variant: 'warning' });
      return;
    }
    showToast({
      title: draft ? 'Draft saved' : 'Experiment queued',
      description: `${name.trim()} · Rahul Poluru`,
      variant: 'success',
    });
    setOpen(false);
    setName('');
  };

  return (
    <div className="rec-page">
      <PageHeader
        title="Experiments"
        description="Traffic, lift, and guardrails. Rahul Poluru reviews publish requests on weekdays."
        crumbs={[BREADCRUMB_ROOT, { label: 'Experiments' }]}
        actions={
          <SplitButton
            label="Start experiment"
            size="sm"
            onClick={() => setOpen(true)}
            onSelect={({ value }) => {
              if (value === 'draft') showToast({ title: 'Draft parked', variant: 'info' });
              if (value === 'start') setOpen(true);
            }}
          >
            <MenuItem label="Start now" value="start" />
            <MenuItem label="Save as draft" value="draft" />
          </SplitButton>
        }
      />

      <Alert
        variant="warning"
        title="Guardrail tripped"
        message="Email subject lines stopped. Nina Poluru is reviewing the copy before it can restart."
        dismissible
      />

      <ButtonGroup size="sm" className="rec-button-group">
        {[
          ['all', 'All'],
          ['Running', 'Running'],
          ['Guardrail', 'Guardrail'],
          ['Draft', 'Draft'],
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

      <section className="rec-panel">
        <h2>Results</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Experiment' },
            { key: 'owner', label: 'Owner' },
            { key: 'lift', label: 'Lift' },
            { key: 'traffic', label: 'Traffic %' },
            { key: 'status', label: 'Status' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {filtered.map((row) => (
          <AccordionItem key={row.id} heading={row.name}>
            <div className="rec-segment-meta">
              <Status label={row.status} variant={EXP_STATUS[row.status] ?? 'neutral'} />
              <span>{row.owner}</span>
              <span>Started {formatDisplayDate(row.started)}</span>
            </div>
            <p className="rec-copy">{row.hypothesis}</p>
            <p className="rec-copy">{row.note}</p>
            <div className="rec-meter-row">
              <div className="rec-meter-label">
                <span>Traffic</span>
                <strong>{row.traffic}%</strong>
              </div>
              <ProgressBar value={row.traffic} max={100} showValue />
            </div>
            <p className="rec-copy rec-drawer-note">Lift {formatPercent(row.lift)}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="New experiment"
        footer={
          <div className="rec-drawer-actions">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={() => create(true)}>
              Save draft
            </Button>
            <Button onClick={() => create(false)}>Create</Button>
          </div>
        }
      >
        <div className="rec-stack">
          <Input label="Name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Home rail holdout" />
          <Combobox label="Model" value={model} options={MODELS} onChange={setModel} />
          <DatePicker label="End date" value={ends} min="2026-10-22" max="2026-12-31" onChange={setEnds} />
          <Slider
            label="Traffic (%)"
            min={5}
            max={50}
            step={5}
            value={traffic}
            showValue
            onChange={(_, value) => setTraffic(value)}
          />
        </div>
      </Modal>
    </div>
  );
}
