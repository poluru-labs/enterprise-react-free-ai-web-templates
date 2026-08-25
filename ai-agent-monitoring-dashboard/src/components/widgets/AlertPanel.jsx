import { Alert, Button } from '@poluru-labs/enterprise-design-system-react';
import { useNavigate } from 'react-router-dom';

export function AlertPanel({ alerts = [], title = 'Anomaly alerts' }) {
  const navigate = useNavigate();

  return (
    <section className="amd-panel amd-alert-panel">
      <header className="amd-panel-header">
        <div>
          <h2>{title}</h2>
          <p>Live guardrails for loops, memory, and tool regressions.</p>
        </div>
      </header>
      <div className="amd-alert-list">
        {alerts.map((alert) => (
          <div key={alert.id} className="amd-alert-item">
            <Alert variant={alert.variant} title={alert.title} message={alert.message} />
            {alert.href ? (
              <Button
                variant="tertiary"
                size="sm"
                iconTrailing="chevron-right"
                onClick={() => navigate(alert.href)}
              >
                Inspect
              </Button>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
