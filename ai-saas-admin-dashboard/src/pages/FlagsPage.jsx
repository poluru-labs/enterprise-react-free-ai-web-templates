import { useState } from 'react';
import { Switch, showToast } from '@poluru-labs/enterprise-design-system-react';
import flags from '../data/flags.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { PageHeader, StatCard } from '../components/widgets/index.js';

export default function FlagsPage() {
  const [state, setState] = useState(() =>
    Object.fromEntries(flags.map((flag) => [flag.id, flag.enabled])),
  );

  return (
    <div className="nx-page">
      <PageHeader
        title="Feature flags"
        description="Rollouts stay in this browser session. Lakshmi owns SSO and SCIM."
        crumbs={[BREADCRUMB_ROOT, { label: 'Flags' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Flags" value={flags.length} icon="bi-toggle-on" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="Enabled"
            value={Object.values(state).filter(Boolean).length}
            icon="bi-check-circle"
            tone="success"
          />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="Off"
            value={Object.values(state).filter((value) => !value).length}
            icon="bi-toggle-off"
            tone="warning"
          />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Owners" value="6" hint="Poluru platform team" icon="bi-people" tone="info" />
        </div>
      </div>

      <div className="row g-3">
        {flags.map((flag) => (
          <div className="col-12 col-xl-6" key={flag.id}>
            <article className="nx-flag-card">
              <header>
                <div>
                  <h3>{flag.name}</h3>
                  <span className="nx-mono">{flag.id}</span>
                </div>
                <Switch
                  label={state[flag.id] ? 'On' : 'Off'}
                  checked={state[flag.id]}
                  onChange={(_, checked) => {
                    setState((current) => ({ ...current, [flag.id]: checked }));
                    showToast({
                      title: checked ? 'Flag enabled' : 'Flag disabled',
                      description: `${flag.name} · ${flag.audience}`,
                      variant: 'info',
                    });
                  }}
                />
              </header>
              <p className="nx-policy-note">{flag.description}</p>
              <footer>
                <span>{flag.audience}</span>
                <span>{flag.owner} · {formatDateTime(flag.updated)}</span>
              </footer>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
