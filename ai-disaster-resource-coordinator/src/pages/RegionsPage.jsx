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
import regions from '../data/regions.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { REGION_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function RegionsPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const filtered = useMemo(() => {
    if (band === 'all') return regions;
    return regions.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      population: row.population,
      openRequests: row.openRequests,
      readiness: row.readiness,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  return (
    <div className="relief-page">
      <PageHeader
        title="Regions"
        description="County status, population exposure, and readiness scores. Leela Poluru owns regional sitreps."
        crumbs={[BREADCRUMB_ROOT, { label: 'Regions' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Add region watch
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="Severe weather corridor"
        message="Coastal Zone B remains Severe. Ravi Poluru is coordinating with Jonah Poluru on convoy priority."
        dismissible
      />

      <ButtonGroup size="sm" className="relief-button-group">
        {[
          ['all', 'All'],
          ['Stable', 'Stable'],
          ['Watch', 'Watch'],
          ['Severe', 'Severe'],
          ['Recovering', 'Recovering'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="relief-panel">
        <h2>Regional status</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Region' },
            { key: 'population', label: 'Population' },
            { key: 'openRequests', label: 'Open req.' },
            { key: 'readiness', label: 'Readiness' },
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
            <div className="relief-segment-meta">
              <Status label={row.status} variant={REGION_STATUS[row.status] ?? 'neutral'} />
              <span>{row.population.toLocaleString()} people</span>
              <span>{row.openRequests} open requests</span>
            </div>
            <ProgressBar value={row.readiness} max={100} showValue />
            <p className="relief-copy relief-drawer-note">
              Readiness {row.readiness} · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Add region watch"
        footer={
          <Button
            onClick={() => {
              if (!name.trim()) {
                showToast({ title: 'Enter region name', variant: 'warning' });
                return;
              }
              showToast({ title: 'Watch added', description: 'Leela Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Create
          </Button>
        }
      >
        <Input label="Region name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Valley District" />
      </Modal>
    </div>
  );
}
