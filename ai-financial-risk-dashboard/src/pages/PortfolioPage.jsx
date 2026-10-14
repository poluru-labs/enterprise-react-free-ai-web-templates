import { useState } from 'react';
import {
  Alert,
  Badge,
  DateRangePicker,
  Modal,
  Pagination,
  ProgressBar,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import portfolio from '../data/portfolio.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_VARIANT = {
  passing: 'success',
  failing: 'danger',
  watch: 'warning',
};

export default function PortfolioPage() {
  const [page, setPage] = useState(1);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [open, setOpen] = useState(false);

  return (
    <div className="frd-page">
      <PageHeader
        title="Portfolio risk"
        description="Exposure, VaR, and limits. Books owned by Marcus Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Portfolio' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Run stress
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="Limit breach"
        message="Commercial SMB is at 96% of VaR limit. Marcus Poluru must approve any new exposure."
      />

      <div className="frd-filters">
        <DateRangePicker
          label="As-of window"
          startValue={start}
          endValue={end}
          onChange={(nextStart, nextEnd) => {
            setStart(nextStart);
            setEnd(nextEnd);
          }}
        />
      </div>

      <div className="frd-table-wrap">
        <table className="frd-table">
          <thead>
            <tr>
              <th>Book</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Limit use</th>
              <th>VaR ($M)</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.books.map((book) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.owner}</td>
                <td>
                  <Badge label={book.status} variant={STATUS_VARIANT[book.status]} soft pill size="sm" />
                </td>
                <td>
                  <ProgressBar value={book.utilization} max={100} showValue />
                </td>
                <td>{book.var}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pageSize={4} total={portfolio.books.length} onChange={setPage} />

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Run stress scenario"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                showToast({ title: 'Stress queued', variant: 'success' });
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="frd-copy">Runs baseline + rate shock on all books. Results post to Marcus Poluru.</p>
      </Modal>
    </div>
  );
}
