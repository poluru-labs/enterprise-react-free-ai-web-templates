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
import missions from '../data/missions.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatPercent } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { MISSION_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const ROBOTS = [
  { label: 'Picker Alpha', value: 'picker-alpha' },
  { label: 'Picker Beta', value: 'picker-beta' },
  { label: 'Pack Runner', value: 'pack-runner' },
  { label: 'Stage Lift', value: 'stage-lift' },
  { label: 'Pick Gamma', value: 'pick-gamma' },
];

export default function MissionsPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [robot, setRobot] = useState('picker-alpha');
  const [ends, setEnds] = useState('2026-10-24');
  const [priority, setPriority] = useState(50);

  const filtered = useMemo(() => {
    if (band === 'all') return missions;
    return missions.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      robot: row.robot,
      zone: row.zone,
      progress: row.progress,
      etaMin: row.etaMin,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const create = (draft) => {
    if (!name.trim()) {
      showToast({ title: 'Name the mission', variant: 'warning' });
      return;
    }
    showToast({
      title: draft ? 'Draft saved' : 'Mission queued',
      description: `${name.trim()} · Rahul Poluru`,
      variant: 'success',
    });
    setOpen(false);
    setName('');
  };

  return (
    <div className="flt-page">
      <PageHeader
        title="Missions"
        description="Routes, tasks, and ETAs. Rahul Poluru reviews dispatch requests on weekdays."
        crumbs={[BREADCRUMB_ROOT, { label: 'Missions' }]}
        actions={
          <SplitButton
            label="New mission"
            size="sm"
            onClick={() => setOpen(true)}
            onSelect={({ value }) => {
              if (value === 'draft') showToast({ title: 'Draft parked', variant: 'info' });
              if (value === 'start') setOpen(true);
            }}
          >
            <MenuItem label="Dispatch now" value="start" />
            <MenuItem label="Save as draft" value="draft" />
          </SplitButton>
        }
      />

      <Alert
        variant="warning"
        title="Mission paused"
        message="Return to dock is on hold. Maya Poluru is clearing Pick A before Pick Gamma resumes."
        dismissible
      />

      <ButtonGroup size="sm" className="flt-button-group">
        {[
          ['all', 'All'],
          ['Running', 'Running'],
          ['Queued', 'Queued'],
          ['Paused', 'Paused'],
          ['Completed', 'Completed'],
          ['Failed', 'Failed'],
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
        <h2>Active board</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Mission' },
            { key: 'robot', label: 'Robot' },
            { key: 'zone', label: 'Zone' },
            { key: 'progress', label: 'Progress %' },
            { key: 'etaMin', label: 'ETA (min)' },
            { key: 'status', label: 'Status' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {filtered.map((row) => (
          <AccordionItem key={row.id} heading={row.name}>
            <div className="flt-segment-meta">
              <Status label={row.status} variant={MISSION_STATUS[row.status] ?? 'neutral'} />
              <span>{row.owner}</span>
              <span>Updated {formatDisplayDate(row.updated.slice(0, 10))}</span>
            </div>
            <p className="flt-copy">
              {row.robot} · {row.zone}
              {row.etaMin > 0 ? ` · ETA ${row.etaMin} min` : ''}
            </p>
            <div className="flt-meter-row">
              <div className="flt-meter-label">
                <span>Progress</span>
                <strong>{formatPercent(row.progress, 0)}</strong>
              </div>
              <ProgressBar value={row.progress} max={100} showValue />
            </div>
            <p className="flt-copy flt-drawer-note">Last sync {formatDateTime(row.updated)}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="New mission"
        footer={
          <div className="flt-drawer-actions">
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
        <div className="flt-stack">
          <Input
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Pick wave 13"
          />
          <Combobox label="Robot" value={robot} options={ROBOTS} onChange={setRobot} />
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
