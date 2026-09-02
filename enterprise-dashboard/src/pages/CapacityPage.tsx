import { Alert, Badge, Button, Card, DataTable, ProgressBar, Tag } from '@poluru-labs/enterprise-design-system-react';
import { useNavigate } from 'react-router-dom';
import { BREADCRUMB_ROOT } from '../constants/navigation';
import { capacityForecasts } from '../data';
import { formatPercent } from '../lib/format';
import { PageHeader } from '../components/widgets/PageHeader';
import { StatCard } from '../components/widgets/StatCard';
import './pages.scss';

const riskVariant = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
} as const;

export function CapacityPage() {
  const navigate = useNavigate();
  const highRisk = capacityForecasts.filter((row) => row.risk === 'high');

  const columns = [
    { key: 'facility', label: 'Facility' },
    { key: 'current', label: 'Now' },
    { key: 'days30', label: '30 days' },
    { key: 'days90', label: '90 days' },
    { key: 'risk', label: 'Risk' },
  ];

  const rows = capacityForecasts.map((row) => ({
    facility: row.facility,
    current: formatPercent(row.current, 0),
    days30: formatPercent(row.days30, 0),
    days90: formatPercent(row.days90, 0),
    risk: row.risk,
  }));

  return (
    <div className="page">
      <PageHeader
        title="Capacity"
        description="Rack fill forecasts and space planning signals so expansions land before constraints bite."
        crumbs={[BREADCRUMB_ROOT, { label: 'Capacity' }]}
        actions={
          <Button variant="secondary" size="sm" icon="download">
            Export plan
          </Button>
        }
      />

      {highRisk.length > 0 ? (
        <Alert
          variant="warning"
          title="Capacity risk rising"
          message={`${highRisk.map((row) => row.facility).join(' and ')} projected above 90% within 90 days.`}
          dismissible
        />
      ) : null}

      <section className="stat-grid stagger" aria-label="Capacity KPIs">
        <StatCard label="Fleet fill" value="76%" trend="up" trendValue="+1.8%" hint="Weighted by racks" />
        <StatCard
          label="Sites > 85%"
          value={String(capacityForecasts.filter((row) => row.current >= 85).length)}
          hint="Need expansion review"
        />
        <StatCard label="90-day high risk" value={String(highRisk.length)} trend="up" trendValue="+1" hint="Action recommended" />
        <StatCard label="Available racks" value="418" hint="Across all campuses" />
      </section>

      <div className="capacity-grid card-grid stagger">
        {capacityForecasts.map((row) => (
          <Card key={row.facilityId} elevated padded>
            <div className="capacity-card">
              <div className="capacity-card__head">
                <h2>{row.facility}</h2>
                <Tag label={row.risk} variant={riskVariant[row.risk]} />
              </div>
              <ProgressBar label="Current fill" value={row.current} showValue />
              <ProgressBar label="30-day forecast" value={row.days30} showValue />
              <ProgressBar label="90-day forecast" value={row.days90} showValue />
              <Badge
                label={
                  row.risk === 'high'
                    ? 'Recommend cage expansion'
                    : row.risk === 'medium'
                      ? 'Monitor quarterly'
                      : 'Healthy runway'
                }
                variant={row.risk === 'high' ? 'warning' : 'brand'}
                soft
              />
              <Button variant="tertiary" size="sm" onClick={() => navigate(`/facilities/${row.facilityId}`)}>
                Open campus
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card
        elevated
        padded
        header={
          <div className="card-heading">
            <h2>Forecast table</h2>
          </div>
        }
      >
        <DataTable columns={columns} rows={rows} striped sortable />
      </Card>
    </div>
  );
}
