import { Link, useNavigate, useParams } from 'react-router-dom';
import { Badge, Button, EmptyState } from '@poluru-labs/enterprise-design-system-react';
import { BREADCRUMB_ROOT } from '../constants/navigation';
import { getFacility, pueSeries, racksForFacility, servers, useAlerts } from '../data';
import { formatKw, formatPercent } from '../lib/format';
import { AreaChart } from '../components/charts/AreaChart';
import { ChartSection } from '../components/widgets/ChartSection';
import { DataTable } from '../components/widgets/DataTable';
import { PageHeader } from '../components/widgets/PageHeader';
import { StatCard } from '../components/widgets/StatCard';
import { StatusBadge } from '../components/widgets/StatusBadge';
import './pages.scss';

export function FacilityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const facility = id ? getFacility(id) : undefined;
  const alerts = useAlerts();

  if (!facility) {
    return (
      <div className="page">
        <EmptyState
          heading="Facility not found"
          description="That campus is not in the live inventory."
          actions={
            <Button variant="primary" onClick={() => navigate('/facilities')}>
              Back to facilities
            </Button>
          }
        />
      </div>
    );
  }

  const racks = racksForFacility(facility);
  const hosts = servers.filter((server) => server.facilityId === facility.id);
  const siteAlerts = alerts.filter((alert) => alert.facilityId === facility.id);
  const pueValues = pueSeries(facility);

  return (
    <div className="page">
      <PageHeader
        title={facility.name}
        description={`${facility.region} · ${facility.racks} racks · ${formatKw(facility.powerKw)}`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Facilities', to: '/facilities' }, { label: facility.code }]}
        actions={
          <>
            <Badge label={facility.code} variant="brand" soft />
            <StatusBadge status={facility.status} pulse={facility.status === 'degraded'} />
            <Button variant="secondary" size="sm" onClick={() => navigate('/alerts')}>
              Site alerts
            </Button>
          </>
        }
      />

      <section className="stat-grid stagger" aria-label="Facility KPIs">
        <StatCard label="PUE" value={facility.pue.toFixed(2)} hint="7-day live" sparkline={pueValues} />
        <StatCard
          label="Utilization"
          value={formatPercent(facility.utilization, 0)}
          hint={`${facility.racks} racks`}
          sparkline={[facility.utilization - 4, facility.utilization - 2, facility.utilization]}
        />
        <StatCard label="Power" value={formatKw(facility.powerKw)} hint={`${facility.coolingTons} tons cooling`} />
        <StatCard label="Environment" value={`${facility.tempC}°C`} hint={`${facility.humidity}% RH`} />
      </section>

      <div className="split-grid">
        <ChartSection title="PUE · last 7 days" subtitle="Facility power usage effectiveness">
          <AreaChart
            labels={['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue']}
            series={[{ name: 'PUE', color: '#30AFFF', values: pueValues }]}
            height={200}
          />
        </ChartSection>
        <ChartSection title="Open alerts" subtitle={`${siteAlerts.filter((item) => !item.acknowledged).length} unacked`}>
          {siteAlerts.length === 0 ? (
            <p className="muted">No alerts for this campus.</p>
          ) : (
            <ul className="alert-feed">
              {siteAlerts.map((item) => (
                <li key={item.id}>
                  <StatusBadge status={item.severity} />
                  <div>
                    <strong>{item.title}</strong>
                    <span className="muted">{item.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ChartSection>
      </div>

      <ChartSection title="Sample racks" subtitle="Representative rows from the live BMS feed">
        <DataTable
          columns={[
            { key: 'row', label: 'Row' },
            { key: 'kw', label: 'kW' },
            {
              key: 'utilization',
              label: 'Fill',
              render: (value) => formatPercent(Number(value), 0),
            },
            {
              key: 'status',
              label: 'Status',
              render: (_value, row) => <StatusBadge status={String(row.status)} />,
            },
          ]}
          rows={racks}
        />
      </ChartSection>

      <ChartSection
        title="Hosts"
        subtitle={`${hosts.length} nodes on this campus`}
        action={
          <Button variant="tertiary" size="sm" onClick={() => navigate('/infrastructure')}>
            All hosts
          </Button>
        }
      >
        <DataTable
          columns={[
            { key: 'hostname', label: 'Hostname' },
            { key: 'role', label: 'Role' },
            { key: 'cpu', label: 'CPU %' },
            { key: 'memory', label: 'Memory %' },
            {
              key: 'status',
              label: 'Status',
              render: (_value, row) => <StatusBadge status={String(row.status)} />,
            },
          ]}
          rows={hosts}
        />
        <div className="inline-actions">
          <Link to="/facilities">Back to all facilities</Link>
        </div>
      </ChartSection>
    </div>
  );
}
