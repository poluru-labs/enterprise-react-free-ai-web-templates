import { useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  CircularProgress,
  DateRangePicker,
  DescriptionList,
  Meter,
  Modal,
  Pagination,
  ProgressBar,
  Switch,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import reviews from '../data/reviews.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_VARIANT = {
  passing: 'success',
  failing: 'danger',
};

export default function ReviewsPage() {
  const [page, setPage] = useState(1);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [open, setOpen] = useState(false);

  return (
    <div className="lci-page">
      <PageHeader
        title="Contract reviews"
        description="Redlines, playbook checks, and sign-off. Desk owned by Elena Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Reviews' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Request sign-off
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="Acme amendment over SLA"
        message="Review open 9 days. Elena Poluru shared counsel pack with Adira Poluru."
      />

      <div className="lci-reviews-hero">
        <article className="lci-panel lci-center">
          <p>On-time reviews</p>
          <CircularProgress value={reviews.score} max={100} size={140} showValue />
        </article>
        {reviews.bands.map((band) => (
          <article key={band.id} className="lci-panel">
            <h3>{band.name}</h3>
            <p className="lci-copy">
              {band.owner} · {band.ttl}
            </p>
            <ProgressBar value={band.usage} max={100} label="Queue health" showValue />
            <Meter value={band.quality} min={0} max={100} label="Playbook alignment" showValue />
            <DescriptionList items={band.fields} />
            <div className="lci-switch-row">
              <Switch
                label="Require counsel on non-standard"
                defaultChecked={band.quality >= 90}
                onChange={() => showToast({ title: `${band.id} gate updated`, variant: 'info' })}
              />
            </div>
          </article>
        ))}
      </div>

      <div className="lci-filters">
        <DateRangePicker
          label="Review window"
          startValue={start}
          endValue={end}
          onChange={(nextStart, nextEnd) => {
            setStart(nextStart);
            setEnd(nextEnd);
          }}
        />
      </div>

      <div className="lci-table-wrap">
        <table className="lci-table">
          <thead>
            <tr>
              <th>Review</th>
              <th>Owner</th>
              <th>SLA</th>
              <th>Progress</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {reviews.queue.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.owner}</td>
                <td>
                  <Badge label={row.status} variant={STATUS_VARIANT[row.status]} soft pill size="sm" />
                </td>
                <td>
                  <ProgressBar value={row.passRate} max={100} showValue />
                </td>
                <td>{row.cases}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pageSize={3} total={reviews.queue.length} onChange={setPage} />

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Request sign-off"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                showToast({ title: 'Sign-off requested', variant: 'success' });
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="lci-copy">
          Notifies Adira Poluru and attaches the latest redline pack. Counsel copy optional.
        </p>
      </Modal>
    </div>
  );
}
