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
import inventory from '../data/inventory.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatPercent } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function InventoryPage() {
  const [start, setStart] = useState('2026-10-01');
  const [end, setEnd] = useState('2026-10-22');
  const [sort, setSort] = useState(null);

  const rows = useMemo(() => {
    const mapped = inventory.regions.map((row) => ({
      region: row.region,
      coverage: row.coverage,
      skus: row.skus,
      underFloor: row.underFloor,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  const avgFleet = Math.round(
    inventory.regions.reduce((sum, row) => sum + row.coverage * row.skus, 0) /
      inventory.regions.reduce((sum, row) => sum + row.skus, 0),
  );
  const swapsDue = inventory.regions.reduce((sum, row) => sum + row.underFloor, 0);
  const occupied = inventory.dc.filter((row) => row.occupied).length;

  return (
    <div className="sct-page">
      <PageHeader
        title="Inventory"
        description="Regional coverage, days on hand, and DC health. Elena Poluru owns stock floors with Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Inventory' }]}
      />

      <div className="sct-panel">
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
        <p className="sct-copy sct-drawer-note">
          {formatDisplayDate(start)} – {formatDisplayDate(end)}. Swaps are scheduled when zone average SOC
          drops below 55%.
        </p>
      </div>

      <div className="sct-stat-grid sct-stat-grid-3">
        <Stat
          label="Network coverage"
          value={formatPercent(avgFleet, 0)}
          hint="Weighted by units"
          trend="down"
          trendValue="-2.3%"
        />
        <Stat
          label="SKUs under floor"
          value={String(swapsDue)}
          hint="Next 24 hours"
          trend="up"
          trendValue="+1"
        />
        <Stat
          label="DCs active"
          value={`${occupied}/${inventory.dc.length}`}
          hint="Charge yard"
          trend="flat"
          trendValue="Steady"
        />
      </div>

      <div className="sct-split">
        <section className="sct-panel">
          <h2>By region</h2>
          <DataTable
            sortable
            striped
            columns={[
              { key: 'region', label: 'Region' },
              { key: 'coverage', label: 'Coverage %' },
              { key: 'skus', label: 'SKUs' },
              { key: 'underFloor', label: 'Under floor' },
            ]}
            rows={rows}
            onSort={(key, direction) => setSort({ key, direction })}
          />
        </section>
        <section className="sct-panel">
          <h2>Regional coverage</h2>
          <div className="sct-stack">
            {inventory.regions.map((row) => (
              <Meter
                key={row.region}
                label={row.region}
                value={row.coverage}
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

      <section className="sct-panel">
        <h2>Distribution centers</h2>
        <div className="sct-table-wrap sct-table-flush">
          <table className="sct-table">
            <thead>
              <tr>
                <th>DC</th>
                <th>Focus SKU</th>
                <th>Days on hand</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {inventory.dc.map((row) => (
                <tr key={row.id}>
                  <td>
                    <span className="sct-mono">{row.id}</span>
                    <span className="sct-cell-title">{row.label}</span>
                  </td>
                  <td>{row.sku}</td>
                  <td>
                    {row.occupied ? (
                      <>
                        {row.daysOnHand} d
                        <ProgressBar value={Math.min(row.daysOnHand * 3.33, 100)} max={100} />
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
            { term: 'Safety stock floor', description: '75% coverage before wave' },
            { term: 'Owner', description: 'Elena Poluru' },
            { term: 'Singapore hub', description: 'Leela Poluru' },
          ]}
        />
      </section>
    </div>
  );
}
