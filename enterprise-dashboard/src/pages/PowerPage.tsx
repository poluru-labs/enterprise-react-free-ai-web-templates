import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CircularProgress,
  DataTable,
  Meter,
  ProgressBar,
  SegmentedControl,
} from '@poluru-labs/enterprise-design-system-react';
import { BREADCRUMB_ROOT } from '../constants/navigation';
import { facilities, powerByFacility, pueTrend7d } from '../data';
import { formatKw } from '../lib/format';
import { AreaChart } from '../components/charts/AreaChart';
import { ChartSection } from '../components/widgets/ChartSection';
import { PageHeader } from '../components/widgets/PageHeader';
import { StatCard } from '../components/widgets/StatCard';
import './pages.scss';

export function PowerPage() {
  const [view, setView] = useState('overview');

  const fleetPue = powerByFacility.reduce((sum, row) => sum + row.pue, 0) / powerByFacility.length;
  const totalKw = powerByFacility.reduce((sum, row) => sum + row.facilityKw, 0);
  const itKw = powerByFacility.reduce((sum, row) => sum + row.itLoadKw, 0);

  const columns = useMemo(
    () => [
      { key: 'facility', label: 'Facility' },
      { key: 'itLoadKw', label: 'IT load (kW)' },
      { key: 'facilityKw', label: 'Facility (kW)' },
      { key: 'pue', label: 'PUE' },
      { key: 'coolingUtil', label: 'Cooling util %' },
    ],
    [],
  );

  const rows = powerByFacility.map((row) => ({
    facility: row.facility,
    itLoadKw: row.itLoadKw,
    facilityKw: row.facilityKw,
    pue: row.pue.toFixed(2),
    coolingUtil: row.coolingUtil,
  }));

  return (
    <div className="page">
      <PageHeader
        title="Power & cooling"
        description="Power usage effectiveness, IT vs facility load, and cooling headroom across sites."
        crumbs={[BREADCRUMB_ROOT, { label: 'Power & cooling' }]}
        actions={
          <SegmentedControl
            size="sm"
            value={view}
            onChange={setView}
            options={[
              { label: 'Overview', value: 'overview' },
              { label: 'By facility', value: 'table' },
            ]}
          />
        }
      />

      <section className="stat-grid stagger" aria-label="Power KPIs">
        <StatCard label="Fleet PUE" value={fleetPue.toFixed(2)} trend="down" trendValue="-0.03" hint="Better than last month" />
        <StatCard label="Facility power" value={formatKw(totalKw)} trend="flat" trendValue="0%" hint="Rolling 24h" />
        <StatCard label="IT load" value={formatKw(itKw)} trend="up" trendValue="+1.2%" hint="Compute + storage" />
        <StatCard
          label="Overhead"
          value={`${Math.round(((totalKw - itKw) / totalKw) * 100)}%`}
          hint="Cooling + distribution"
        />
      </section>

      <ChartSection title="Fleet PUE · 7 day" subtitle="Target band at 1.30">
        <AreaChart labels={pueTrend7d.labels} series={pueTrend7d.series} height={220} />
      </ChartSection>

      {view === 'overview' ? (
        <div className="power-grid card-grid stagger">
          {facilities.map((facility) => {
            const power = powerByFacility.find((row) => row.facilityId === facility.id)!;
            return (
              <Card key={facility.id} elevated padded>
                <div className="power-card">
                  <div className="power-card__head">
                    <div>
                      <h2>{facility.name}</h2>
                      <span className="muted">Target PUE ≤ 1.30</span>
                    </div>
                    <CircularProgress value={Math.round((1.5 - facility.pue) * 100)} size={64} showValue />
                  </div>
                  <ProgressBar label="Cooling utilization" value={power.coolingUtil} showValue />
                  <Meter
                    label="Thermal margin"
                    value={Math.max(5, 100 - Math.round(facility.tempC * 3))}
                    high={70}
                    low={25}
                    optimum={80}
                    showValue
                  />
                  <div className="power-card__meta">
                    <Badge label={`${facility.tempC}°C`} variant="info" soft />
                    <Badge label={`${facility.humidity}% RH`} variant="neutral" soft />
                    <Badge
                      label={`PUE ${facility.pue.toFixed(2)}`}
                      variant={facility.pue > 1.35 ? 'warning' : 'success'}
                      soft
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card elevated padded>
          <div className="table-wrap">
            <DataTable columns={columns} rows={rows} striped sortable />
          </div>
          <div className="inline-actions">
            <Button variant="secondary" size="sm" icon="download">
              Export CSV
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
