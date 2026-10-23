import { useMemo, useState } from 'react';
import {
  Badge,
  DataTable,
  DateRangePicker,
  DescriptionList,
  Meter,
  Stat,
  formatDisplayDate,
} from '@poluru-labs/enterprise-design-system-react';
import conversions from '../data/conversions.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatMoney, formatNumber, formatPercent } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function ConversionsPage() {
  const [start, setStart] = useState('2026-10-01');
  const [end, setEnd] = useState('2026-10-22');
  const [sort, setSort] = useState(null);

  const rows = useMemo(() => {
    const mapped = conversions.channels.map((row) => ({
      surface: row.surface,
      orders: row.orders,
      revenue: row.revenue,
      rate: row.rate,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  const assisted = conversions.orders.filter((row) => row.credit === 'Assisted').length;

  return (
    <div className="rec-page">
      <PageHeader
        title="Conversions"
        description="Assisted orders and revenue by surface. Elena Poluru closes the ledger each Monday. Jonah Poluru owns attribution."
        crumbs={[BREADCRUMB_ROOT, { label: 'Conversions' }]}
      />

      <div className="rec-panel">
        <DateRangePicker
          label="Attribution window"
          startValue={start}
          endValue={end}
          min="2026-09-01"
          max="2026-10-22"
          onChange={(nextStart, nextEnd) => {
            setStart(nextStart);
            setEnd(nextEnd);
          }}
        />
        <p className="rec-copy rec-drawer-note">
          {formatDisplayDate(start)} – {formatDisplayDate(end)}. Credit lands when an order follows a
          slot within seven days.
        </p>
      </div>

      <div className="rec-stat-grid rec-stat-grid-3">
        <Stat label="Assisted orders" value={formatNumber(44450)} hint="All surfaces" trend="up" trendValue="+4.1%" />
        <Stat label="Assisted revenue" value={formatMoney(2336200)} hint="USD" trend="up" trendValue="+5.4%" />
        <Stat label="Ledger rows" value={String(assisted)} hint="Assisted in the sample" trend="flat" trendValue="Steady" />
      </div>

      <div className="rec-split">
        <section className="rec-panel">
          <h2>By surface</h2>
          <DataTable
            sortable
            striped
            columns={[
              { key: 'surface', label: 'Surface' },
              { key: 'orders', label: 'Orders' },
              { key: 'revenue', label: 'Revenue (USD)' },
              { key: 'rate', label: 'Rate' },
            ]}
            rows={rows}
            onSort={(key, direction) => setSort({ key, direction })}
          />
        </section>
        <section className="rec-panel">
          <h2>Assist quality</h2>
          <div className="rec-stack">
            {conversions.channels.map((row) => (
              <Meter
                key={row.surface}
                label={row.surface}
                value={row.rate}
                min={0}
                max={6}
                low={1.5}
                high={3.5}
                optimum={4}
                showValue
              />
            ))}
          </div>
        </section>
      </div>

      <section className="rec-panel">
        <h2>Recent credited orders</h2>
        <div className="rec-table-wrap rec-table-flush">
          <table className="rec-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Slot</th>
                <th>Buyer</th>
                <th>Total</th>
                <th>Credit</th>
              </tr>
            </thead>
            <tbody>
              {conversions.orders.map((row) => (
                <tr key={row.id}>
                  <td>
                    <span className="rec-mono">{row.id}</span>
                    <span className="rec-cell-title">{formatDateTime(row.when)}</span>
                  </td>
                  <td>{row.slot}</td>
                  <td>{row.buyer}</td>
                  <td>{formatMoney(row.total)}</td>
                  <td>
                    <Badge
                      label={row.credit}
                      variant={row.credit === 'Assisted' ? 'brand' : 'neutral'}
                      soft
                      size="sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DescriptionList
          compact
          items={[
            { term: 'Window', description: '7 days from impression' },
            { term: 'Owner', description: 'Elena Poluru' },
            { term: 'Finance', description: 'Jonah Poluru' },
          ]}
        />
      </section>
    </div>
  );
}
