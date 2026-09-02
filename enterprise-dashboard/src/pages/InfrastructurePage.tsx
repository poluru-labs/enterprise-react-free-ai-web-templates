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
import { BREADCRUMB_ROOT } from '../constants/navigation';
import { servers, type ServerRow } from '../data';
import { searchRecords } from '../lib/search';
import { FilterBar } from '../components/widgets/FilterBar';
import { PageHeader } from '../components/widgets/PageHeader';
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
      list = servers.filter((server) => server.role === 'Compute' || server.role === 'GPU');
    } else if (filter === 'storage') {
      list = servers.filter((server) => server.role === 'Storage');
    } else if (filter === 'network') {
      list = servers.filter((server) => server.role === 'Network' || server.role === 'Edge');
    }
    return searchRecords(list, query, ['hostname', 'facility', 'role']);
  };

  const filtered = filterServers(activeFilter);

  const toRows = (list: ServerRow[]) =>
    list.map((server) => ({
      hostname: server.hostname,
      facility: server.facility,
      role: server.role,
      cpu: server.cpu,
      memory: server.memory,
      status: server.status,
    }));

  return (
    <div className="page">
      <PageHeader
        title="Infrastructure"
        description="Hosts, racks, and network nodes across the data center fleet."
        crumbs={[BREADCRUMB_ROOT, { label: 'Infrastructure' }]}
      />

      <FilterBar
        search={
          <Search
            placeholder="Filter hosts…"
            size="sm"
            value={query}
            onChange={(_event, value) => setQuery(value)}
          />
        }
        onReset={() => setQuery('')}
      >
        <Badge label={`${filtered.length} hosts`} variant="brand" soft />
        <Button
          variant="secondary"
          size="sm"
          icon="refresh"
          onClick={() => show({ title: 'Telemetry refreshed', variant: 'info' })}
        >
          Refresh
        </Button>
      </FilterBar>

      <Card elevated padded>
        <Tabs selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab label="Compute & GPU">
            <div className="table-wrap">
              <DataTable columns={columns} rows={toRows(filterServers('compute'))} striped compact sortable />
            </div>
          </Tab>
          <Tab label="Storage">
            <div className="table-wrap">
              <DataTable columns={columns} rows={toRows(filterServers('storage'))} striped compact sortable />
            </div>
          </Tab>
          <Tab label="Network & Edge">
            <div className="table-wrap">
              <DataTable columns={columns} rows={toRows(filterServers('network'))} striped compact sortable />
            </div>
          </Tab>
          <Tab label="All hosts">
            <div className="table-wrap">
              <DataTable columns={columns} rows={toRows(filterServers('all'))} striped compact sortable />
            </div>
          </Tab>
        </Tabs>
      </Card>

      <section className="host-picker stagger" aria-label="Inspect host">
        {filtered.slice(0, 6).map((host) => (
          <button key={host.id} type="button" className="host-chip" onClick={() => setSelected(host)}>
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
