import { useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  DateRangePicker,
  Modal,
  Pagination,
  ProgressBar,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import gaps from '../data/gaps.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_VARIANT = {
  passing: 'success',
  failing: 'danger',
};

export default function GapsPage() {
  const [page, setPage] = useState(1);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [open, setOpen] = useState(false);

  return (
    <div className="knb-page">
      <PageHeader
        title="Knowledge gaps"
        description="Unanswered intents and missing topics. Desk owned by Elena Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Gaps' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Create article
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="Billing proration gap open"
        message="240 unanswered queries this month. Elena Poluru paired with Marcus Poluru on a draft."
      />

      <div className="knb-filters">
        <DateRangePicker
          label="Query window"
          startValue={start}
          endValue={end}
          onChange={(nextStart, nextEnd) => {
            setStart(nextStart);
            setEnd(nextEnd);
          }}
        />
      </div>

      <div className="knb-table-wrap">
        <table className="knb-table">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Coverage</th>
              <th>Queries</th>
            </tr>
          </thead>
          <tbody>
            {gaps.metrics.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.owner}</td>
                <td>
                  <Badge label={row.status} variant={STATUS_VARIANT[row.status]} soft pill size="sm" />
                </td>
                <td>
                  <ProgressBar value={row.passRate} max={100} showValue />
                </td>
                <td>{row.cases.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pageSize={4} total={gaps.metrics.length} onChange={setPage} />

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Draft from gap"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                showToast({ title: 'Draft linked to gap', variant: 'success' });
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="knb-copy">
          Opens a new article stub and assigns Marcus Poluru. Citations required before publish.
        </p>
      </Modal>
    </div>
  );
}
