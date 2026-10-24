import { useMemo, useState } from 'react';
import {
  DataTable,
  DateRangePicker,
  DescriptionList,
  Meter,
  ProgressBar,
  Stat,
  formatDisplayDate,
} from '@poluru-labs/enterprise-design-system-react';
import battery from '../data/battery.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatPercent } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function BatteryPage() {
  const [start, setStart] = useState('2026-10-01');
  const [end, setEnd] = useState('2026-10-22');
  const [sort, setSort] = useState(null);

  const rows = useMemo(() => {
    const mapped = battery.bands.map((row) => ({
      zone: row.zone,
      avgSoc: row.avgSoc,
      units: row.units,
      swapsDue: row.swapsDue,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  const avgFleet = Math.round(
    battery.bands.reduce((sum, row) => sum + row.avgSoc * row.units, 0) /
      battery.bands.reduce((sum, row) => sum + row.units, 0),
  );
  const swapsDue = battery.bands.reduce((sum, row) => sum + row.swapsDue, 0);
  const occupied = battery.docks.filter((row) => row.occupied).length;

  return (
    <div className="flt-page">
      <PageHeader
        title="Battery"
        description="SOC bands, dock swaps, and charge yard. Elena Poluru owns the swap schedule with Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Battery' }]}
      />

      <div className="flt-panel">
        <DateRangePicker
          label="Reporting window"
          startValue={start}
          endValue={end}
          min="2026-09-01"
          max="2026-10-22"
          onChange={(nextStart, nextEnd) => {
            setStart(nextStart);
            setEnd(nextEnd);
          }}
        />
        <p className="flt-copy flt-drawer-note">
          {formatDisplayDate(start)} – {formatDisplayDate(end)}. Swaps are scheduled when zone average SOC
          drops below 55%.
        </p>
      </div>

      <div className="flt-stat-grid flt-stat-grid-3">
        <Stat
          label="Fleet average SOC"
          value={formatPercent(avgFleet, 0)}
          hint="Weighted by units"
          trend="down"
          trendValue="-2.3%"
        />
        <Stat
          label="Swaps due"
          value={String(swapsDue)}
          hint="Next 24 hours"
          trend="up"
          trendValue="+1"
        />
        <Stat
          label="Docks in use"
          value={`${occupied}/${battery.docks.length}`}
          hint="Charge yard"
          trend="flat"
          trendValue="Steady"
        />
      </div>

      <div className="flt-split">
        <section className="flt-panel">
          <h2>By zone</h2>
          <DataTable
            sortable
            striped
            columns={[
              { key: 'zone', label: 'Zone' },
              { key: 'avgSoc', label: 'Avg SOC %' },
              { key: 'units', label: 'Units' },
              { key: 'swapsDue', label: 'Swaps due' },
            ]}
            rows={rows}
            onSort={(key, direction) => setSort({ key, direction })}
          />
        </section>
        <section className="flt-panel">
          <h2>Zone health</h2>
          <div className="flt-stack">
            {battery.bands.map((row) => (
              <Meter
                key={row.zone}
                label={row.zone}
                value={row.avgSoc}
                min={0}
                max={100}
                low={35}
                high={75}
                optimum={85}
                showValue
              />
            ))}
          </div>
        </section>
      </div>

      <section className="flt-panel">
        <h2>Charge docks</h2>
        <div className="flt-table-wrap flt-table-flush">
          <table className="flt-table">
            <thead>
              <tr>
                <th>Dock</th>
                <th>Robot</th>
                <th>SOC</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {battery.docks.map((row) => (
                <tr key={row.id}>
                  <td>
                    <span className="flt-mono">{row.id}</span>
                    <span className="flt-cell-title">{row.label}</span>
                  </td>
                  <td>{row.robot}</td>
                  <td>
                    {row.occupied ? (
                      <>
                        {formatPercent(row.soc, 0)}
                        <ProgressBar value={row.soc} max={100} />
                      </>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>{row.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DescriptionList
          compact
          items={[
            { term: 'Swap floor', description: '25% SOC before dispatch' },
            { term: 'Owner', description: 'Elena Poluru' },
            { term: 'Fast charge', description: 'Leela Poluru' },
          ]}
        />
      </section>
    </div>
  );
}
