import { useMemo, useState } from 'react';
import {
  DatePicker,
  DateRangePicker,
  Rating,
  Timeline,
} from '@poluru-labs/enterprise-design-system-react';
import audits from '../data/audits.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { inDateRange } from '../lib/format.js';
import {
  ChartSection,
  DataTable,
  PageHeader,
  StatusBadge,
} from '../components/widgets/index.js';

export default function AuditsPage() {
  const [asOf, setAsOf] = useState('2026-09-04');
  const [start, setStart] = useState('2026-07-01');
  const [end, setEnd] = useState('2026-09-04');
  const [score, setScore] = useState(4);

  const rows = useMemo(
    () => audits.filter((item) => inDateRange(`${item.date}T12:00:00.000Z`, start, end)),
    [start, end],
  );

  return (
    <div className="gov-page">
      <PageHeader
        title="Audits"
        description="Walkthroughs, sampling, and vendor checks."
        crumbs={[BREADCRUMB_ROOT, { label: 'Audits' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-4">
          <DatePicker label="As of" value={asOf} onChange={setAsOf} />
        </div>
        <div className="col-12 col-md-8">
          <DateRangePicker
            label="Window"
            startValue={start}
            endValue={end}
            onChange={(nextStart, nextEnd) => {
              setStart(nextStart);
              setEnd(nextEnd);
            }}
          />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Findings" subtitle={`Window ${start} → ${end}`}>
            <DataTable
              rows={rows}
              columns={[
                { key: 'id', label: 'ID', render: (value) => <span className="gov-mono">{value}</span> },
                { key: 'title', label: 'Audit' },
                { key: 'owner', label: 'Owner' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
                { key: 'finding', label: 'Finding' },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Latest trail" subtitle="Most recent walkthroughs">
            <Timeline
              items={audits.slice(0, 4).map((item, index) => ({
                title: item.title,
                description: `${item.owner} · ${item.finding}`,
                timestamp: item.date,
                status: index === 0 ? 'current' : 'complete',
              }))}
            />
            <div className="mt-4">
              <p className="gov-subtle mb-2">Residual confidence after Q3 walkthrough</p>
              <Rating value={score} onChange={setScore} />
            </div>
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
