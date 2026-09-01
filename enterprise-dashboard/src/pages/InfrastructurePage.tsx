import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  DataTable,
  DescriptionList,
  Drawer,
  ProgressBar,
  Search,
  Tab,
  Tabs,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import { servers, type ServerRow } from '../data/mock';
import './pages.scss';

const tabFilters = ['compute', 'storage', 'network', 'all'] as const;

export function InfrastructurePage() {
  const { show } = useToast();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<ServerRow | null>(null);
  const activeFilter = tabFilters[selectedIndex] ?? 'all';

  const columns = [
    { key: 'hostname', label: 'Hostname' },
    { key: 'facility', label: 'Facility' },
    { key: 'role', label: 'Role' },
    { key: 'cpu', label: 'CPU %' },
    { key: 'memory', label: 'Memory %' },
    { key: 'status', label: 'Status' },
  ];

  const filterServers = (filter: (typeof tabFilters)[number]) => {
    let list = servers;
    if (filter === 'compute') {
      list = servers.filter((s) => s.role === 'Compute' || s.role === 'GPU');
    } else if (filter === 'storage') {
      list = servers.filter((s) => s.role === 'Storage');
    } else if (filter === 'network') {
      list = servers.filter((s) => s.role === 'Network' || s.role === 'Edge');
    }

    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (s) =>
        s.hostname.toLowerCase().includes(q) ||
        s.facility.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q),
    );
  };

  const filtered = filterServers(activeFilter);

  const toRows = (list: ServerRow[]) =>
    list.map((s) => ({
      hostname: s.hostname,
      facility: s.facility,
      role: s.role,
      cpu: s.cpu,
      memory: s.memory,
      status: s.status,
    }));

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Hosts, racks, and network nodes across the data center fleet.
        </p>
        <div className="page-toolbar__actions">
          <Search
            placeholder="Filter hosts…"
            size="sm"
            value={query}
            onChange={(_e, value) => setQuery(value)}
          />
          <Badge label={`${filtered.length} hosts`} variant="brand" soft />
          <Button
            variant="secondary"
            size="sm"
            icon="refresh"
            onClick={() => show({ title: 'Telemetry refreshed', variant: 'info' })}
          >
            Refresh
          </Button>
        </div>
      </div>

      <Card elevated padded>
        <Tabs selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab label="Compute & GPU">
            <div className="table-wrap">
              <DataTable
                columns={columns}
                rows={toRows(filterServers('compute'))}
                striped
                compact
                sortable
              />
            </div>
          </Tab>
          <Tab label="Storage">
            <div className="table-wrap">
              <DataTable
                columns={columns}
                rows={toRows(filterServers('storage'))}
                striped
                compact
                sortable
              />
            </div>
          </Tab>
          <Tab label="Network & Edge">
            <div className="table-wrap">
              <DataTable
                columns={columns}
                rows={toRows(filterServers('network'))}
                striped
                compact
                sortable
              />
            </div>
          </Tab>
          <Tab label="All hosts">
            <div className="table-wrap">
              <DataTable
                columns={columns}
                rows={toRows(filterServers('all'))}
                striped
                compact
                sortable
              />
            </div>
          </Tab>
        </Tabs>
      </Card>

      <section className="host-picker stagger" aria-label="Inspect host">
        {filtered.slice(0, 6).map((host) => (
          <button
            key={host.id}
            type="button"
            className="host-chip"
            onClick={() => setSelected(host)}
          >
            <strong>{host.hostname}</strong>
            <span className="muted">
              {host.role} · CPU {host.cpu}%
            </span>
          </button>
        ))}
      </section>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.hostname ?? 'Host'}
        footer={
          <Button variant="tertiary" onClick={() => setSelected(null)}>
            Close
          </Button>
        }
      >
        {selected ? (
          <div className="drawer-body">
            <DescriptionList
              items={[
                { term: 'Facility', description: selected.facility },
                { term: 'Role', description: selected.role },
                { term: 'Status', description: selected.status },
              ]}
            />
            <ProgressBar label="CPU" value={selected.cpu} showValue />
            <ProgressBar label="Memory" value={selected.memory} showValue />
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
