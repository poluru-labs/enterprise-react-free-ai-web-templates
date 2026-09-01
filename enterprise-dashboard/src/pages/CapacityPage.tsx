import {
  Alert,
  Badge,
  Button,
  Card,
  DataTable,
  ProgressBar,
  Stat,
  Tag,
} from '@poluru-labs/enterprise-design-system-react';
import { capacityForecasts } from '../data/mock';
import './pages.scss';

const riskVariant = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
} as const;

export function CapacityPage() {
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
    current: `${row.current}%`,
    days30: `${row.days30}%`,
    days90: `${row.days90}%`,
    risk: row.risk,
  }));

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Rack fill forecasts and space planning signals so expansions land before constraints bite.
        </p>
        <Button variant="secondary" size="sm" icon="download">
          Export plan
        </Button>
      </div>

      {highRisk.length > 0 ? (
        <Alert
          variant="warning"
          title="Capacity risk rising"
          message={`${highRisk.map((r) => r.facility).join(' and ')} projected above 90% within 90 days.`}
          dismissible
        />
      ) : null}

      <section className="stat-grid stagger" aria-label="Capacity KPIs">
        <Card elevated padded>
          <Stat label="Fleet fill" value="79%" trend="up" trendValue="+2.4%" hint="Weighted by racks" />
        </Card>
        <Card elevated padded>
          <Stat label="Sites > 85%" value={String(capacityForecasts.filter((r) => r.current >= 85).length)} hint="Need expansion review" />
        </Card>
        <Card elevated padded>
          <Stat label="90-day high risk" value={String(highRisk.length)} trend="up" trendValue="+1" hint="Action recommended" />
        </Card>
        <Card elevated padded>
          <Stat label="Available racks" value="312" hint="Across all campuses" />
        </Card>
      </section>

      <div className="capacity-grid stagger">
        {capacityForecasts.map((row) => (
          <Card key={row.facility} elevated padded>
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
