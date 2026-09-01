import { Alert, Button } from '@poluru-labs/enterprise-design-system-react';
import { useNavigate } from 'react-router-dom';

export function AlertPanel({ alerts = [], title = 'Live alerts' }) {
  const navigate = useNavigate();

  return (
    <section className="cvd-panel cvd-alert-panel">
      <header className="cvd-panel-header">
        <div>
          <h2>{title}</h2>
          <p>Safety misses, stream outages, and model quality watches.</p>
        </div>
      </header>
      <div className="cvd-alert-list">
        {alerts.map((alert) => (
          <div key={alert.id} className="cvd-alert-item">
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
