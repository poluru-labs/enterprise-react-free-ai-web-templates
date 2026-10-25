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
import demand from '../data/demand.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatPercent } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { DEMAND_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const REGIONS = [
  { label: 'Americas', value: 'americas' },
  { label: 'EMEA', value: 'emea' },
  { label: 'APAC', value: 'apac' },
  { label: 'LATAM', value: 'latam' },
];

export default function DemandPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [region, setRegion] = useState('americas');
  const [ends, setEnds] = useState('2026-10-24');
  const [priority, setPriority] = useState(50);

  const filtered = useMemo(() => {
    if (band === 'all') return demand;
    return demand.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      region: row.region,
      units: row.units,
      variance: row.variance,
      horizonDays: row.horizonDays,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const create = (draft) => {
    if (!name.trim()) {
      showToast({ title: 'Name the forecast', variant: 'warning' });
      return;
    }
    showToast({
      title: draft ? 'Draft saved' : 'Forecast saved',
      description: `${name.trim()} · Avery Poluru`,
      variant: 'success',
    });
    setOpen(false);
    setName('');
  };

  return (
    <div className="sct-page">
      <PageHeader
        title="Demand"
        description="Forecasts, spikes, and variance. Avery Poluru reviews plan changes on weekdays."
        crumbs={[BREADCRUMB_ROOT, { label: 'Demand' }]}
        actions={
          <SplitButton
            label="New forecast"
            size="sm"
            onClick={() => setOpen(true)}
            onSelect={({ value }) => {
              if (value === 'draft') showToast({ title: 'Draft parked', variant: 'info' });
              if (value === 'start') setOpen(true);
            }}
          >
            <MenuItem label="Publish now" value="start" />
            <MenuItem label="Save as draft" value="draft" />
          </SplitButton>
        }
      />

      <Alert
        variant="warning"
        title="Demand spike"
        message="APAC flash sale exceeded the band. Leela Poluru is aligning supply with Rahul Poluru."
        dismissible
      />

      <ButtonGroup size="sm" className="sct-button-group">
        {[
          ['all', 'All'],
          ['Active', 'Active'],
          ['Forecast', 'Forecast'],
          ['Spike', 'Spike'],
          ['Closed', 'Closed'],
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

      <section className="sct-panel">
        <h2>Planning board</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Forecast' },
            { key: 'region', label: 'Region' },
            { key: 'units', label: 'Units' },
            { key: 'variance', label: 'Variance %' },
            { key: 'horizonDays', label: 'Horizon (d)' },
            { key: 'status', label: 'Status' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {filtered.map((row) => (
          <AccordionItem key={row.id} heading={row.name}>
            <div className="sct-segment-meta">
              <Status label={row.status} variant={DEMAND_STATUS[row.status] ?? 'neutral'} />
              <span>{row.owner}</span>
              <span>Updated {formatDisplayDate(row.updated.slice(0, 10))}</span>
            </div>
            <p className="sct-copy">
              {row.region} · {row.units}
              {row.horizonDays > 0 ? ` · ${row.horizonDays} day horizon` : ''}
            </p>
            <div className="sct-meter-row">
              <div className="sct-meter-label">
                <span>Variance</span>
                <strong>{formatPercent(row.variance, 1)}</strong>
              </div>
              <ProgressBar value={Math.min(Math.abs(row.variance) * 5, 100)} max={100} showValue />
            </div>
            <p className="sct-copy sct-drawer-note">Last sync {formatDateTime(row.updated)}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="New forecast"
        footer={
          <div className="sct-drawer-actions">
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
        <div className="sct-stack">
          <Input
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Holiday uplift"
          />
          <Combobox label="Region" value={region} options={REGIONS} onChange={setRegion} />
          <DatePicker
            label="Target date"
            value={ends}
            min="2026-10-22"
            max="2026-12-31"
            onChange={setEnds}
          />
          <Slider
            label="Priority"
            min={10}
            max={100}
            step={10}
            value={priority}
            showValue
            onChange={(_, value) => setPriority(value)}
          />
        </div>
      </Modal>
    </div>
  );
}
