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
import coverage from '../data/coverage.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatPercent } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function CoveragePage() {
  const [start, setStart] = useState('2026-10-01');
  const [end, setEnd] = useState('2026-10-22');
  const [sort, setSort] = useState(null);

  const rows = useMemo(() => {
    const mapped = coverage.locales.map((row) => ({
      locale: row.locale,
      coverage: row.coverage,
      strings: row.strings,
      missing: row.missing,
    }));
    return sortRows(mapped, sort);
  }, [sort]);

  const avgFleet = Math.round(
    coverage.locales.reduce((sum, row) => sum + row.coverage * row.strings, 0) /
      coverage.locales.reduce((sum, row) => sum + row.strings, 0),
  );
  const swapsDue = coverage.locales.reduce((sum, row) => sum + row.missing, 0);
  const occupied = coverage.projects.filter((row) => row.occupied).length;

  return (
    <div className="trn-page">
      <PageHeader
        title="Coverage"
        description="Language completion, missing strings, and project focus. Kavya Poluru owns locale floors with Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Coverage' }]}
      />

      <div className="trn-panel">
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
        <p className="trn-copy trn-drawer-note">
          {formatDisplayDate(start)} – {formatDisplayDate(end)}. Swaps are scheduled when zone average SOC
          drops below 55%.
        </p>
      </div>

      <div className="trn-stat-grid trn-stat-grid-3">
        <Stat
          label="Weighted coverage"
          value={formatPercent(avgFleet, 0)}
          hint="Weighted by units"
          trend="down"
          trendValue="-2.3%"
        />
        <Stat
          label="Missing strings"
          value={String(swapsDue)}
          hint="Next 24 hours"
          trend="up"
          trendValue="+1"
        />
        <Stat
          label="Projects active"
          value={`${occupied}/${coverage.projects.length}`}
          hint="Charge yard"
          trend="flat"
          trendValue="Steady"
        />
      </div>

      <div className="trn-split">
        <section className="trn-panel">
          <h2>By locale</h2>
          <DataTable
            sortable
            striped
            columns={[
              { key: 'locale', label: 'Locale' },
              { key: 'coverage', label: 'Coverage %' },
              { key: 'strings', label: 'Strings' },
              { key: 'missing', label: 'Missing' },
            ]}
            rows={rows}
            onSort={(key, direction) => setSort({ key, direction })}
          />
        </section>
        <section className="trn-panel">
          <h2>Locale completion</h2>
          <div className="trn-stack">
            {coverage.locales.map((row) => (
              <Meter
                key={row.locale}
                label={row.locale}
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

      <section className="trn-panel">
        <h2>Projects</h2>
        <div className="trn-table-wrap trn-table-flush">
          <table className="trn-table">
            <thead>
              <tr>
                <th>DC</th>
                <th>Focus</th>
                <th>Completion %</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {coverage.projects.map((row) => (
                <tr key={row.id}>
                  <td>
                    <span className="trn-mono">{row.id}</span>
                    <span className="trn-cell-title">{row.label}</span>
                  </td>
                  <td>{row.focus}</td>
                  <td>
                    {row.occupied ? (
                      <>
                        {row.completion} d
                        <ProgressBar value={Math.min(row.completion * 3.33, 100)} max={100} />
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
            { term: 'Coverage floor', description: '75% coverage before wave' },
            { term: 'Owner', description: 'Elena Poluru' },
            { term: 'Help center', description: 'Leela Poluru' },
          ]}
        />
      </section>
    </div>
  );
}
