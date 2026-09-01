import { ProgressBar } from '@poluru-labs/enterprise-design-system-react';
import policies from '../data/policies.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDate, formatNumber, formatPercent } from '../lib/format.js';
import { PageHeader, StatCard, StatusBadge } from '../components/widgets/index.js';

export default function PoliciesPage() {
  const enforcing = policies.policies.filter((policy) => policy.mode === 'enforce').length;

  return (
    <div className="cmb-page">
      <PageHeader
        title="Policies"
        description="Enforcement mode, blocks today, and the false-positive notes that still need a human."
        crumbs={[BREADCRUMB_ROOT, { label: 'Policies' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Live policies" value={policies.policies.length} icon="bi-shield-check" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Enforcing" value={enforcing} hint="Shadow stays off the auto-block path" icon="bi-lock" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="Blocks today"
            value={formatNumber(policies.policies.reduce((sum, policy) => sum + policy.blocksToday, 0))}
            icon="bi-slash-circle"
            tone="danger"
          />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="In shadow" value={policies.policies.filter((policy) => policy.mode === 'shadow').length} icon="bi-eye" tone="warning" />
        </div>
      </div>

      <div className="row g-3">
        {policies.policies.map((policy) => (
          <div className="col-12 col-md-6 col-xl-4" key={policy.id}>
            <article className="cmb-policy-card">
              <header>
                <h3>{policy.name}</h3>
                <StatusBadge status={policy.mode} />
              </header>
              <p className="cmb-policy-metric">
                <strong>{formatNumber(policy.blocksToday)}</strong>
                <span>blocks today · {formatNumber(policy.hitsToday)} hits</span>
              </p>
              <ProgressBar label="Coverage" value={policy.coverage} showValue />
              <p className="cmb-policy-note">{policy.falsePositiveNotes}</p>
              <footer>
                <span>{policy.owner}</span>
                <span>Updated {formatDate(policy.updatedAt)}</span>
              </footer>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
