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
import hardware from '../data/hardware.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { sortRows } from '../lib/sort.js';
import { HARDWARE_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function HardwarePage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [hwStatus, setHwStatus] = useState('Online');

  const filtered = useMemo(() => {
    if (band === 'all') return hardware;
    return hardware.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      profile: row.profile,
      vcpus: row.vcpus,
      utilization: row.utilization,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const onlineCount = hardware.filter((row) => row.status === 'Online').length;

  return (
    <div className="bench-page">
      <PageHeader
        title="Hardware"
        description="Host profiles, utilization, and maintenance windows. Maya Poluru owns the lab floor."
        crumbs={[BREADCRUMB_ROOT, { label: 'Hardware' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Register host
          </Button>
        }
      />

      <DescriptionList
        compact
        items={[
          { term: 'Hosts online', description: String(onlineCount) },
          { term: 'Floor lead', description: 'Maya Poluru' },
          { term: 'Provisioning', description: 'Nina Poluru' },
        ]}
      />

      <ButtonGroup size="sm" className="bench-button-group">
        {[
          ['all', 'All'],
          ['Online', 'Online'],
          ['Maintenance', 'Maintenance'],
          ['Provisioning', 'Provisioning'],
          ['Retired', 'Retired'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="bench-panel">
        <h2>Hardware profiles</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Host' },
            { key: 'profile', label: 'Profile' },
            { key: 'vcpus', label: 'vCPUs' },
            { key: 'utilization', label: 'Util %' },
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
            <div className="bench-segment-meta">
              <Badge label={row.status} variant={HARDWARE_STATUS[row.status] ?? 'neutral'} soft size="sm" />
              <span>{row.profile}</span>
              <span>{row.utilization}% util</span>
            </div>
            <p className="bench-copy">Owner {row.owner}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Register hardware profile"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Host registered', variant: 'success' });
              setOpen(false);
            }}
          >
            Submit
          </Button>
        }
      >
        <div className="bench-stack">
          <Textarea
            label="Host label"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="rack-16-h100x4"
          />
          <Select
            label="Status"
            value={hwStatus}
            onChange={setHwStatus}
            options={[
              { label: 'Online', value: 'Online' },
              { label: 'Provisioning', value: 'Provisioning' },
              { label: 'Maintenance', value: 'Maintenance' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
