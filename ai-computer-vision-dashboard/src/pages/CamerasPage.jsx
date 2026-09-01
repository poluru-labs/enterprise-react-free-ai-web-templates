import { useMemo, useState } from 'react';
import { DescriptionList, Drawer, ProgressBar, Search, Select } from '@poluru-labs/enterprise-design-system-react';
import camerasData from '../data/cameras.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatNumber, formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Live', value: 'live' },
  { label: 'Degraded', value: 'degraded' },
  { label: 'Offline', value: 'offline' },
];

const SITE_OPTIONS = [
  { label: 'All sites', value: 'all' },
  { label: 'Austin DC', value: 'Austin DC' },
  { label: 'Chicago dock', value: 'Chicago dock' },
  { label: 'Hyderabad fab', value: 'Hyderabad fab' },
  { label: 'Dallas gate', value: 'Dallas gate' },
];

export default function CamerasPage() {
  const [status, setStatus] = useState('all');
  const [site, setSite] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const { cameras, fleet } = camerasData;

  const rows = useMemo(() => {
    return searchRecords(cameras, query, ['code', 'name', 'site', 'zone', 'model', 'owner']).filter((camera) => {
      const matchesStatus = status === 'all' || camera.status === status;
      const matchesSite = site === 'all' || camera.site === site;
      return matchesStatus && matchesSite;
    });
  }, [cameras, status, site, query]);

  return (
    <div className="cvd-page">
      <PageHeader
        title="Camera fleet"
        description="Streams across Austin DC, Chicago dock, Hyderabad fab, and Dallas gate."
        crumbs={[BREADCRUMB_ROOT, { label: 'Cameras' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Fleet" value={fleet.total} hint="Named cameras" icon="bi-camera-video" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Live" value={fleet.live} hint="Publishing keyframes" icon="bi-broadcast" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Degraded" value={fleet.degraded} hint="Frame drops or low light" icon="bi-exclamation-triangle" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Offline" value={fleet.offline} hint="Dallas-03 + spare" icon="bi-camera-video-off" tone="danger" />
        </div>
      </div>

      <FilterBar
        search={
          <Search
            placeholder="Search code, site, model, or owner"
            value={query}
            onChange={(_, value) => setQuery(value)}
            onClear={() => setQuery('')}
            clearable
          />
        }
        onReset={() => {
          setStatus('all');
          setSite('all');
          setQuery('');
        }}
      >
        <Select label="Status" options={STATUS_OPTIONS} value={status} onChange={(event) => setStatus(event.target.value)} />
        <Select label="Site" options={SITE_OPTIONS} value={site} onChange={(event) => setSite(event.target.value)} />
      </FilterBar>

      <div className="row g-3 mb-3">
        {rows.map((camera) => (
          <div className="col-12 col-md-6 col-xl-4" key={camera.id}>
            <button type="button" className={`cvd-camera-card is-button status-${camera.status}`} onClick={() => setSelected(camera)}>
              <header>
                <div>
                  <h3>{camera.code}</h3>
                  <p>
                    {camera.name} · {camera.site}
                  </p>
                </div>
                <StatusBadge status={camera.status} />
              </header>
              <dl>
                <div>
                  <dt>FPS</dt>
                  <dd>{camera.fps}</dd>
                </div>
                <div>
                  <dt>Model</dt>
                  <dd className="cvd-mono">{camera.model}</dd>
                </div>
              </dl>
              <ProgressBar label="Uptime" value={camera.uptime} showValue />
            </button>
          </div>
        ))}
      </div>

      <ChartSection title={`${rows.length} cameras`} subtitle="Click a row or card for stream detail">
        <DataTable
          rows={rows}
          onRowClick={setSelected}
          rowClassName={(row) => (row.status === 'offline' ? 'is-severe' : row.status === 'degraded' ? 'is-attention' : '')}
          columns={[
            { key: 'code', label: 'Camera', className: 'cvd-mono' },
            { key: 'name', label: 'View' },
            { key: 'site', label: 'Site' },
            { key: 'zone', label: 'Zone' },
            { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
            { key: 'fps', label: 'FPS' },
            { key: 'model', label: 'Model', className: 'cvd-mono' },
            { key: 'owner', label: 'Owner' },
          ]}
        />
      </ChartSection>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.code || 'Camera'}
        size="lg"
      >
        {selected ? (
          <div>
            <p className="cvd-drawer-lead">{selected.note}</p>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <StatusBadge status={selected.status} />
              <span className="cvd-subtle">{selected.site}</span>
            </div>
            <DescriptionList
              items={[
                { term: 'View', description: selected.name },
                { term: 'Zone', description: selected.zone },
                { term: 'Owner', description: selected.owner },
                { term: 'Model', description: selected.model },
                { term: 'FPS', description: String(selected.fps) },
                { term: 'Bitrate', description: `${selected.bitrateMbps} Mbps` },
                { term: 'Uptime', description: formatPercent(selected.uptime) },
                { term: 'Last heartbeat', description: formatDateTime(selected.lastHeartbeat) },
                { term: 'Fleet size', description: formatNumber(fleet.total) },
              ]}
            />
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
