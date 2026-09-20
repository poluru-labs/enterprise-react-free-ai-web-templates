import { useState } from 'react';
import {
  Badge,
  Button,
  Modal,
  Status,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import deployments from '../data/deployments.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  live: 'success',
  ready: 'info',
};

export default function DeploymentsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="abs-page">
      <PageHeader
        title="Deployments"
        description="Preview, canary, and production. Rollouts owned by Sofia Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Deploy' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Promote
          </Button>
        }
      />

      <div className="abs-env-row">
        {deployments.environments.map((env) => (
          <article key={env} className="abs-panel">
            <h3>{env}</h3>
            <Status label={env === 'Production' ? 'Healthy' : 'Open'} variant="success" pulse={env === 'Canary'} />
          </article>
        ))}
      </div>

      <div className="abs-table-wrap">
        <table className="abs-table">
          <thead>
            <tr>
              <th>Release</th>
              <th>Env</th>
              <th>Owner</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {deployments.history.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>
                  <Badge label={row.env} variant="brand" soft size="sm" />
                </td>
                <td>{row.owner}</td>
                <td>
                  <Status label={row.status} variant={STATUS_MAP[row.status]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="abs-panel">
        <h2>Recent</h2>
        <Timeline
          items={deployments.history.map((row) => ({
            title: row.name,
            description: `${row.env} · ${row.owner}`,
            timestamp: row.at.slice(0, 10),
            status: row.status === 'live' ? 'complete' : 'current',
          }))}
        />
      </section>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Promote to production"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                showToast({ title: 'Promote queued', description: 'Sofia Poluru will confirm.', variant: 'success' });
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="abs-copy">This ships the canary build to production after the eval gate.</p>
      </Modal>
    </div>
  );
}
