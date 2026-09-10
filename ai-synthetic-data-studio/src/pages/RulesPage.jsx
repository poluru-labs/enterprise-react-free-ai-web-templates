import { useState } from 'react';
import rulesData from '../data/rules.json';
import { PageHeader, StatusBadge, DataTable } from '../components/widgets/index.js';

export function RulesPage() {
  const [rules, setRules] = useState(rulesData);
  const [selectedRule, setSelectedRule] = useState(null);

  const columns = [
    {
      key: 'name',
      header: 'Rule & Category',
      render: (val, row) => (
        <div>
          <strong style={{ color: 'var(--syn-ink)', fontSize: '0.9rem' }}>{val}</strong>
          <div style={{ fontSize: '0.74rem', color: 'var(--syn-muted)' }}>
            Category: <span style={{ fontWeight: '600' }}>{row.category}</span> · By {row.creator}
          </div>
        </div>
      ),
    },
    {
      key: 'pattern',
      header: 'Pattern / Constraint Formula',
      render: (val) => (
        <code style={{ fontSize: '0.78rem', background: '#eaf0fc', color: '#05339C', padding: '0.2rem 0.5rem', borderRadius: '4px', wordBreak: 'break-word' }}>
          {val}
        </code>
      ),
    },
    {
      key: 'enforcement',
      header: 'Enforcement Mechanism',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'applicability',
      header: 'Applies To',
      render: (val) => <span style={{ fontSize: '0.8rem', color: 'var(--syn-muted)' }}>{val}</span>,
    },
    {
      key: 'actions',
      header: 'Inspect',
      render: (_, row) => (
        <button
          type="button"
          onClick={() => setSelectedRule(row)}
          className="syn-btn-secondary"
          style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
        >
          View Examples
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Constraint Engine"
        title="Schema Rules &amp; Synthetic Generators"
        subtitle="Define mathematical boundaries, cross-column conditional assertions, and custom Poluru entity masks to guarantee realistic synthetic distributions."
      />

      <div className="syn-card">
        <div className="syn-card-header">
          <div>
            <h3>Active Generator Rules &amp; Mask Registry</h3>
            <p>Rules applied during data synthesis and post-processing calibration</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={rules}
          keyField="id"
          pageSize={6}
        />
      </div>

      {/* Selected Rule Inspector */}
      {selectedRule && (
        <div className="syn-card" style={{ border: '1.5px solid var(--syn-brand-tint)', background: '#fcfdff' }}>
          <div className="syn-card-header">
            <div>
              <span className="syn-badge tone-brand">{selectedRule.category}</span>
              <h3 style={{ marginTop: '0.4rem' }}>{selectedRule.name} — Execution Details</h3>
              <p>{selectedRule.applicability} · Authored by {selectedRule.creator}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedRule(null)}
              className="syn-btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
            >
              Close
            </button>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ fontSize: '0.82rem', color: 'var(--syn-ink)', display: 'block', marginBottom: '0.3rem' }}>
              Mathematical Constraint Pattern:
            </strong>
            <div className="syn-code-box" style={{ background: '#07173b' }}>
              <code>{selectedRule.pattern}</code>
            </div>
          </div>

          <div>
            <strong style={{ fontSize: '0.82rem', color: 'var(--syn-ink)', display: 'block', marginBottom: '0.4rem' }}>
              Sample Synthetic Output Examples:
            </strong>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {selectedRule.examples.map((ex, i) => (
                <span
                  key={i}
                  style={{
                    background: '#eaf0fc',
                    color: '#05339C',
                    fontWeight: '600',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '0.4rem',
                    fontSize: '0.8rem',
                    border: '1px solid var(--syn-brand-tint)',
                  }}
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default RulesPage;
