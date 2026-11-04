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
import packages from '../data/packages.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { PACKAGE_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function PackagesPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const filtered = useMemo(() => {
    if (band === 'all') return packages;
    return packages.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      version: row.version,
      weeklyDl: row.weeklyDl,
      score: row.score,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  return (
    <div className="maint-page">
      <PageHeader
        title="Packages"
        description="Download trends, health scores, and advisories. Jonah Poluru owns package health."
        crumbs={[BREADCRUMB_ROOT, { label: 'Packages' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Register package
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="Advisory open"
        message="@poluru/cli has a moderate advisory. Leela Poluru scheduled patch release."
        dismissible
      />

      <ButtonGroup size="sm" className="maint-button-group">
        {[
          ['all', 'All'],
          ['Healthy', 'Healthy'],
          ['Advisory', 'Advisory'],
          ['Deprecated', 'Deprecated'],
          ['Critical', 'Critical'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="maint-panel">
        <h2>Package health</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Package' },
            { key: 'version', label: 'Version' },
            { key: 'weeklyDl', label: 'Weekly dl' },
            { key: 'score', label: 'Score' },
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
            <div className="maint-segment-meta">
              <Status label={row.status} variant={PACKAGE_STATUS[row.status] ?? 'neutral'} />
              <span>{row.version}</span>
              <span>{row.weeklyDl.toLocaleString()} / week</span>
            </div>
            <ProgressBar value={row.score} max={100} showValue />
            <p className="maint-copy maint-drawer-note">
              Health {row.score} · Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Register package"
        footer={
          <Button
            onClick={() => {
              if (!name.trim()) {
                showToast({ title: 'Enter package name', variant: 'warning' });
                return;
              }
              showToast({ title: 'Package registered', description: 'Jonah Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Create
          </Button>
        }
      >
        <Input label="Package name" value={name} onChange={(e) => setName(e.target.value)} placeholder="@poluru/my-lib" />
      </Modal>
    </div>
  );
}
