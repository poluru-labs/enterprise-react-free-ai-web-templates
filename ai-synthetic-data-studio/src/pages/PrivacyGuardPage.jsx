import { useState } from 'react';
import privacyData from '../data/privacy.json';
import { PageHeader, StatCard, StatusBadge, DataTable } from '../components/widgets/index.js';

export function PrivacyGuardPage() {
  const { differentialPrivacyBudget, attackSimulations, piiScannerStats, complianceCertificates } = privacyData;
  const [simulations, setSimulations] = useState(attackSimulations);
  const [runningSimId, setRunningSimId] = useState(null);

  const handleRerunSimulation = (id) => {
    setRunningSimId(id);
    setTimeout(() => {
      setSimulations((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, lastRun: 'Just now (Simulated)', riskStatus: 'Protected', empiricalAccuracy: '50.2%' }
            : s
        )
      );
      setRunningSimId(null);
    }, 1200);
  };

  const attackColumns = [
    {
      key: 'name',
      header: 'Attack Vector & Target',
      render: (val, row) => (
        <div>
          <strong style={{ color: 'var(--syn-ink)', fontSize: '0.88rem' }}>{val}</strong>
          <div style={{ fontSize: '0.74rem', color: 'var(--syn-muted)' }}>
            Target: <em>{row.targetDataset}</em>
          </div>
          <div style={{ fontSize: '0.71rem', color: 'var(--syn-subtle)' }}>Attacker: {row.attackerModel}</div>
        </div>
      ),
    },
    {
      key: 'baselineRisk',
      header: 'Baseline vs Empirical',
      render: (_, row) => (
        <div>
          <div style={{ fontSize: '0.78rem' }}>Baseline: {row.baselineRisk}</div>
          <div style={{ fontWeight: '700', color: '#059669' }}>Actual: {row.empiricalAccuracy}</div>
        </div>
      ),
    },
    {
      key: 'riskStatus',
      header: 'Defense Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'auditor',
      header: 'Audited By',
      render: (val, row) => (
        <div style={{ fontSize: '0.8rem' }}>
          <div style={{ fontWeight: '600' }}>{val}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--syn-muted)' }}>{row.lastRun}</div>
        </div>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      render: (_, row) => (
        <button
          type="button"
          disabled={runningSimId === row.id}
          onClick={() => handleRerunSimulation(row.id)}
          className="syn-btn-secondary"
          style={{ fontSize: '0.75rem', padding: '0.28rem 0.6rem' }}
        >
          {runningSimId === row.id ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              <span>Simulating...</span>
            </>
          ) : (
            <>
              <i className="bi bi-play-fill" /> Re-test
            </>
          )}
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Mathematical Privacy Engine"
        title="Privacy Guard &amp; Differential Privacy Suite"
        subtitle="Track differential privacy epsilon budgets, simulate membership inference attacks, and ensure zero PII/PHI leakage with Poluru compliance standards."
      />

      {/* DP Budget Overview */}
      <div className="syn-stat-grid">
        <StatCard
          label="Total Epsilon Budget"
          value={`ε = ${differentialPrivacyBudget.totalAllocatedEpsilon.toFixed(2)}`}
          hint="Monthly Tenant Allocation"
          icon="bi-pie-chart-fill"
          tone="brand"
        />
        <StatCard
          label="Consumed Epsilon"
          value={`ε = ${differentialPrivacyBudget.consumedEpsilon.toFixed(2)}`}
          hint="33% budget spent this cycle"
          icon="bi-shield-check"
          tone="warning"
        />
        <StatCard
          label="Remaining Epsilon"
          value={`ε = ${differentialPrivacyBudget.remainingEpsilon.toFixed(2)}`}
          hint="20 days until monthly reset"
          icon="bi-shield-fill-plus"
          tone="success"
        />
        <StatCard
          label="PII Leakage Rate"
          value="0.000%"
          hint="1.28M fields scanned & redacted"
          icon="bi-lock-fill"
          tone="success"
        />
      </div>

      {/* Differential Privacy Mechanism Banner */}
      <div className="syn-card" style={{ background: '#f8faff', borderColor: 'var(--syn-brand-tint)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: '0 0 0.3rem', color: 'var(--syn-brand)', fontSize: '1.1rem' }}>
              <i className="bi bi-shield-shaded" /> Active DP Engine: {differentialPrivacyBudget.noiseMechanism}
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--syn-muted)' }}>
              Enforcing provable $(\varepsilon, \delta)$-differential privacy bounds during CTGAN and Diffusion model training with zero gradient leakage.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <span className="syn-badge tone-brand">
              <i className="bi bi-check-circle-fill" /> {differentialPrivacyBudget.activeEnforcement}
            </span>
          </div>
        </div>
      </div>

      {/* Attack Simulations Bench */}
      <div className="syn-card">
        <div className="syn-card-header">
          <div>
            <h3>Empirical Re-identification &amp; Attack Simulator</h3>
            <p>Active shadow models assessing Membership Inference, Attribute Inversion, and Singling-Out risk</p>
          </div>
        </div>

        <DataTable
          columns={attackColumns}
          data={simulations}
          keyField="id"
          pageSize={5}
        />
      </div>

      {/* Compliance Certificates Grid */}
      <div className="syn-card">
        <div className="syn-card-header">
          <div>
            <h3>Enterprise Privacy &amp; Compliance Certifications</h3>
            <p>Audited by Dr. Subrahmanyam Poluru &amp; Subbu Poluru (Poluru Global Privacy Council)</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
          {complianceCertificates.map((cert) => (
            <div
              key={cert.certId}
              style={{
                border: '1px solid var(--syn-line)',
                borderRadius: '0.65rem',
                padding: '1.2rem',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                  <span className="syn-badge tone-success">
                    <i className="bi bi-patch-check-fill" /> {cert.status}
                  </span>
                  <code style={{ fontSize: '0.7rem', color: 'var(--syn-muted)' }}>{cert.certId}</code>
                </div>
                <h4 style={{ margin: '0 0 0.4rem', fontSize: '0.98rem', fontWeight: '700', color: 'var(--syn-ink)' }}>
                  {cert.standard}
                </h4>
                <p style={{ margin: '0 0 0.8rem', fontSize: '0.8rem', color: 'var(--syn-muted)', lineHeight: '1.4' }}>
                  {cert.details}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--syn-line-soft)', paddingTop: '0.6rem', fontSize: '0.73rem', color: 'var(--syn-subtle)' }}>
                <div>Signatory: <strong>{cert.signatory}</strong></div>
                <div>Valid until: {cert.validUntil}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default PrivacyGuardPage;
