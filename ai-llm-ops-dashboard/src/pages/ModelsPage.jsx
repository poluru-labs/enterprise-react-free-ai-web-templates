import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CircularProgress, ProgressBar, SegmentedControl, Status, Toolbar } from '@poluru-labs/enterprise-design-system-react';
import { models, statusVariant } from '../data';

export default function ModelsPage() {
  const [filter, setFilter] = useState('all');
  const visible = models.filter((model) => {
    if (filter === 'production') return model.status === 'Production';
    if (filter === 'review') return model.status === 'Review';
    return true;
  });

  return (
    <Card padded={false}>
      <div className="llm-card-heading">
        <div>
          <h2>Registered models</h2>
          <p>Version, ownership, and production readiness</p>
        </div>
        <Toolbar
          end={(
            <SegmentedControl
              size="sm"
              value={filter}
              onChange={setFilter}
              options={[
                { value: 'all', label: 'All' },
                { value: 'production', label: 'Live' },
                { value: 'review', label: 'Review' },
              ]}
            />
          )}
        />
      </div>
      <div className="llm-table-wrap">
        <table className="llm-table">
          <thead>
            <tr><th>Model</th><th>Version</th><th>Owner</th><th>Reliability</th><th>SLO</th><th>Status</th></tr>
          </thead>
          <tbody>
            {visible.map((model) => (
              <tr key={model.id}>
                <td>
                  <Link className="llm-model-cell" to={`/models/${model.id}`}>
                    <span className="llm-model-icon"><i className="bi bi-cpu" /></span>
                    <div>
                      <strong>{model.name}</strong>
                      <small>{model.provider} · {model.calls} req</small>
                    </div>
                  </Link>
                </td>
                <td>{model.version}</td>
                <td>{model.owner}</td>
                <td>
                  <div className="llm-progress-cell">
                    <ProgressBar value={model.success} max={100} />
                    <span>{model.success}%</span>
                  </div>
                </td>
                <td><CircularProgress value={model.success} size={36} /></td>
                <td>
                  <Status label={model.status} variant={statusVariant(model.status)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
