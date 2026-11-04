import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Alert,
  Button,
  ButtonGroup,
  DataTable,
  Input,
  Modal,
  ProgressBar,
  Status,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import suites from '../data/suites.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { SUITE_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function SuitesPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const filtered = useMemo(() => {
    if (band === 'all') return suites;
    return suites.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      workloads: row.workloads,
      schedule: row.schedule,
      slaMin: row.slaMin,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  return (
    <div className="bench-page">
      <PageHeader
        title="Suites"
        description="Benchmark packages, schedules, and SLAs. Priya Poluru curates active suites."
        crumbs={[BREADCRUMB_ROOT, { label: 'Suites' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            New suite
          </Button>
        }
      />

      <Alert
        variant="info"
        title="Nightly regression"
        message="STABLE-3 runs at 02:00 lab time. Jonah Poluru reviews failures before standup."
        dismissible
      />

      <ButtonGroup size="sm" className="bench-button-group">
        {[
          ['all', 'All'],
          ['Active', 'Active'],
          ['Draft', 'Draft'],
          ['Paused', 'Paused'],
          ['Deprecated', 'Deprecated'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="bench-panel">
        <h2>Suite catalog</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Suite' },
            { key: 'workloads', label: 'Workloads' },
            { key: 'schedule', label: 'Schedule' },
            { key: 'slaMin', label: 'SLA (min)' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {filtered.map((row) => (
          <AccordionItem key={row.id} heading={row.name}>
            <div className="bench-segment-meta">
              <Status label={row.status} variant={SUITE_STATUS[row.status] ?? 'neutral'} />
              <span>{row.workloads} workloads</span>
              <span>{row.schedule}</span>
            </div>
            <ProgressBar value={Math.min(100, row.slaMin)} max={100} showValue />
            <p className="bench-copy bench-drawer-note">
              SLA {row.slaMin} min · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Create benchmark suite"
        footer={
          <Button
            onClick={() => {
              if (!name.trim()) {
                showToast({ title: 'Enter suite name', variant: 'warning' });
                return;
              }
              showToast({ title: 'Suite created', description: 'Priya Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Create
          </Button>
        }
      >
        <Input label="Suite name" value={name} onChange={(e) => setName(e.target.value)} placeholder="LAT-CUSTOM-2" />
      </Modal>
    </div>
  );
}
