import { useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  DateRangePicker,
  Modal,
  Pagination,
  ProgressBar,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import carbon from '../data/carbon.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_VARIANT = {
  passing: 'success',
  failing: 'danger',
};

export default function CarbonPage() {
  const [page, setPage] = useState(1);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [open, setOpen] = useState(false);

  return (
    <div className="eod-page">
      <PageHeader
        title="Carbon impact"
        description="Scope 2, budgets, and disclosure. Owner: Elena Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Carbon' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Export pack
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="Budget over by 8%"
        message="Monthly cap exceeded at North DC. Elena Poluru is reviewing curtail options."
      />

      <div className="eod-filters">
        <DateRangePicker
          label="Reporting window"
          startValue={start}
          endValue={end}
          onChange={(nextStart, nextEnd) => {
            setStart(nextStart);
            setEnd(nextEnd);
          }}
        />
      </div>

      <div className="eod-table-wrap">
        <table className="eod-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Pass rate</th>
              <th>Sites</th>
            </tr>
          </thead>
          <tbody>
            {carbon.rules.map((rule) => (
              <tr key={rule.id}>
                <td>{rule.name}</td>
                <td>{rule.owner}</td>
                <td>
                  <Badge label={rule.status} variant={STATUS_VARIANT[rule.status]} soft pill size="sm" />
                </td>
                <td>
                  <ProgressBar value={rule.passRate} max={100} showValue />
                </td>
                <td>{rule.cases}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pageSize={4} total={carbon.rules.length} onChange={setPage} />

      <section className="eod-panel">
        <h2>Recent disclosures</h2>
        <Timeline
          items={[
            {
              title: 'Q3 scope 2 pack',
              description: 'Elena Poluru · submitted',
              timestamp: '28 Sep',
              status: 'complete',
            },
            {
              title: 'REC true-up',
              description: 'Jonah Poluru · pending',
              timestamp: '2 Oct',
              status: 'current',
            },
          ]}
        />
      </section>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Export disclosure pack"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                showToast({ title: 'Export queued', variant: 'success' });
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="eod-copy">CSV and PDF bundle for auditors. Includes meter lineage and REC match.</p>
      </Modal>
    </div>
  );
}
