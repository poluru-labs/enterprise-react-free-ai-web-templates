import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import datasetsData from '../data/datasets.json';
import qualityData from '../data/quality.json';
import { PageHeader, StatusBadge } from '../components/widgets/index.js';
import { CorrelationHeatmap } from '../components/charts/CorrelationHeatmap.jsx';
import { DistributionOverlay } from '../components/charts/DistributionOverlay.jsx';
import { BASE_PATH } from '../constants/navigation.js';

export default function DatasetDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('sample'); // 'sample' | 'schema' | 'quality' | 'privacy' | 'export'
  const [copiedCode, setCopiedCode] = useState(false);

  const dataset = datasetsData.find((d) => d.id === id) || datasetsData[0];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const pythonSnippet = `import poluru_synth as ps

# Load differentially private synthetic dataset from Poluru Labs Studio
client = ps.Client(api_key="plr_live_syn_9981...")
dataset = client.datasets.get("${dataset.id}")

# Stream synthetic records into pandas DataFrame
df_synth = dataset.to_pandas(limit=100000)
print(f"Loaded {len(df_synth)} rows with epsilon={dataset.epsilon}")
print(df_synth.head())

# Run automated Train-on-Synthetic Test-on-Real (TSTR) eval
report = dataset.evaluate_fidelity(target_col="readmission_risk")
print(f"Fidelity Parity: {report.parity_score}%")
`;

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link
          to={`${BASE_PATH}/datasets`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--syn-brand)',
            textDecoration: 'none',
            fontSize: '0.84rem',
            fontWeight: '600',
          }}
        >
          <i className="bi bi-arrow-left" /> Back to Datasets Catalog
        </Link>
      </div>

      <PageHeader
        eyebrow={dataset.domain}
        title={dataset.name}
        subtitle={dataset.description}
        actions={
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setActiveTab('export')}
              className="syn-btn-secondary"
            >
              <i className="bi bi-code-slash" /> API / SDK
            </button>
            <button
              type="button"
              onClick={() => {
                const blob = new Blob([JSON.stringify(dataset.sampleRows, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${dataset.slug}.json`;
                a.click();
              }}
              className="syn-btn-brand"
            >
              <i className="bi bi-cloud-arrow-down-fill" /> Download Batch
            </button>
          </div>
        }
      />

      {/* Dataset Overview Stat Ribbon */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '1.6rem',
        }}
      >
        <div style={{ background: '#ffffff', border: '1px solid var(--syn-line)', borderRadius: '0.65rem', padding: '0.9rem' }}>
          <div style={{ fontSize: '0.73rem', color: 'var(--syn-muted)', fontWeight: '700' }}>DATASET VOLUME</div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--syn-ink)', fontFamily: 'Roboto' }}>
            {dataset.rowCountDisplay}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--syn-subtle)' }}>{dataset.fileSize} · {dataset.columnCount} columns</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--syn-line)', borderRadius: '0.65rem', padding: '0.9rem' }}>
          <div style={{ fontSize: '0.73rem', color: 'var(--syn-muted)', fontWeight: '700' }}>DIFFERENTIAL PRIVACY</div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--syn-brand)', fontFamily: 'Roboto' }}>
            ε = {dataset.epsilon}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: '600' }}>Re-ID {dataset.reIdRisk}</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--syn-line)', borderRadius: '0.65rem', padding: '0.9rem' }}>
          <div style={{ fontSize: '0.73rem', color: 'var(--syn-muted)', fontWeight: '700' }}>FIDELITY SCORE</div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#059669', fontFamily: 'Roboto' }}>
            {dataset.fidelityScore}%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--syn-subtle)' }}>ML Utility Parity {dataset.mlUtilityScore}%</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--syn-line)', borderRadius: '0.65rem', padding: '0.9rem' }}>
          <div style={{ fontSize: '0.73rem', color: 'var(--syn-muted)', fontWeight: '700' }}>ENGINE &amp; AUTHOR</div>
          <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--syn-ink)' }}>{dataset.generator}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--syn-muted)' }}>Created by {dataset.creator}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="syn-tabs">
        <button
          type="button"
          onClick={() => setActiveTab('sample')}
          className={`syn-tab-btn ${activeTab === 'sample' ? 'is-active' : ''}`}
        >
          <i className="bi bi-table" /> Live Data Sample Explorer
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('schema')}
          className={`syn-tab-btn ${activeTab === 'schema' ? 'is-active' : ''}`}
        >
          <i className="bi bi-diagram-3" /> Column Schema &amp; Rules ({dataset.schema?.length || 0})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('quality')}
          className={`syn-tab-btn ${activeTab === 'quality' ? 'is-active' : ''}`}
        >
          <i className="bi bi-bar-chart-steps" /> Quality &amp; Statistical Fidelity
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('privacy')}
          className={`syn-tab-btn ${activeTab === 'privacy' ? 'is-active' : ''}`}
        >
          <i className="bi bi-shield-lock" /> Privacy &amp; Leakage Audit
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('export')}
          className={`syn-tab-btn ${activeTab === 'export' ? 'is-active' : ''}`}
        >
          <i className="bi bi-terminal" /> Export &amp; Code Snippets
        </button>
      </div>

      {/* Tab 1: Live Sample */}
      {activeTab === 'sample' && (
        <div className="syn-card">
          <div className="syn-card-header">
            <div>
              <h3>Synthetic Records Sample (Zero-PII Preserved)</h3>
              <p>Generated records featuring synthetic entities (Subbu Poluru, Poluru Labs, etc.) with real statistical distributions</p>
            </div>
            <StatusBadge status="Differential Privacy Active" />
          </div>

          <div className="syn-table-wrapper">
            <table className="syn-table">
              <thead>
                <tr>
                  {Object.keys(dataset.sampleRows?.[0] || {}).map((key) => (
                    <th key={key}>{key.replace(/_/g, ' ').toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataset.sampleRows?.map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((val, cellIdx) => (
                      <td key={cellIdx} style={{ fontWeight: cellIdx === 1 ? '700' : '400' }}>
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Schema */}
      {activeTab === 'schema' && (
        <div className="syn-card">
          <div className="syn-card-header">
            <div>
              <h3>Schema Specification &amp; Differential Privacy Rules</h3>
              <p>Column-level semantics, categorical cardinality, null rate constraints, and synthetic generator masks</p>
            </div>
          </div>

          <div className="syn-table-wrapper">
            <table className="syn-table">
              <thead>
                <tr>
                  <th>Field Name</th>
                  <th>Semantic Data Type</th>
                  <th>Domain Category</th>
                  <th>PII Mask / DP Rule</th>
                  <th>Null Rate</th>
                </tr>
              </thead>
              <tbody>
                {dataset.schema?.map((col) => (
                  <tr key={col.name}>
                    <td>
                      <code style={{ background: '#eaf0fc', color: '#05339C', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>
                        {col.name}
                      </code>
                    </td>
                    <td>{col.type}</td>
                    <td>
                      <span className="syn-badge tone-brand">{col.category}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--syn-ink)' }}>{col.piiMask}</span>
                    </td>
                    <td style={{ color: 'var(--syn-muted)' }}>{col.nullPct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Quality */}
      {activeTab === 'quality' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="syn-card" style={{ margin: 0 }}>
            <div className="syn-card-header">
              <div>
                <h3>Statistical Fidelity Benchmark Summary</h3>
                <p>Kolmogorov-Smirnov distance, Wasserstein metric, and Jensen-Shannon divergence</p>
              </div>
              <StatusBadge status="Fidelity 98.6%" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.2rem' }}>
              <div style={{ padding: '0.8rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid var(--syn-line-soft)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--syn-muted)', fontWeight: '700' }}>KS-STATISTIC PASS RATE</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#059669' }}>{dataset.qualityReport?.ksStatisticPassRate}</div>
              </div>
              <div style={{ padding: '0.8rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid var(--syn-line-soft)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--syn-muted)', fontWeight: '700' }}>WASSERSTEIN DISTANCE</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--syn-brand)' }}>{dataset.qualityReport?.wassersteinMeanDistance}</div>
              </div>
              <div style={{ padding: '0.8rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid var(--syn-line-soft)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--syn-muted)', fontWeight: '700' }}>CORRELATION MATCH</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#059669' }}>{dataset.qualityReport?.correlationPreservation}</div>
              </div>
              <div style={{ padding: '0.8rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid var(--syn-line-soft)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--syn-muted)', fontWeight: '700' }}>TSTR ML UTILITY</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--syn-ink)' }}>{dataset.qualityReport?.tstrUtility}</div>
              </div>
            </div>

            <DistributionOverlay
              title="Marginal Feature Distribution Overlay: Real vs Synthetic"
              bins={qualityData.distributionComparison.bins}
              realPercentages={qualityData.distributionComparison.realPercentages}
              syntheticPercentages={qualityData.distributionComparison.syntheticPercentages}
            />
          </div>

          <div className="syn-card" style={{ margin: 0 }}>
            <div className="syn-card-header">
              <div>
                <h3>Multivariate Correlation Heatmap Comparison</h3>
                <p>Verifies pairwise feature relationships are accurately preserved without memorization</p>
              </div>
            </div>
            <CorrelationHeatmap
              features={qualityData.correlationMatrix.features}
              realMatrix={qualityData.correlationMatrix.realMatrix}
              syntheticMatrix={qualityData.correlationMatrix.syntheticMatrix}
            />
          </div>
        </div>
      )}

      {/* Tab 4: Privacy */}
      {activeTab === 'privacy' && (
        <div className="syn-card">
          <div className="syn-card-header">
            <div>
              <h3>Mathematical Privacy &amp; Leakage Audit</h3>
              <p>Audited by Dr. Subrahmanyam Poluru (Chief Privacy Officer) &amp; Subbu Poluru (Lead AI Architect)</p>
            </div>
            <span className="syn-badge tone-success">
              <i className="bi bi-patch-check-fill" /> Zero PII Leakage Verified
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.6rem', border: '1px solid var(--syn-line-soft)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--syn-muted)', fontWeight: '700' }}>EPSILON DP BOUND</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--syn-brand)', fontFamily: 'Roboto' }}>
                ε = {dataset.epsilon}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--syn-subtle)' }}>Noise multiplier: σ = 1.15</div>
            </div>

            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.6rem', border: '1px solid var(--syn-line-soft)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--syn-muted)', fontWeight: '700' }}>DELTA PROBABILITY</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--syn-ink)', fontFamily: 'Roboto' }}>
                δ = {dataset.delta}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--syn-subtle)' }}>Strict cryptographic limit</div>
            </div>

            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.6rem', border: '1px solid var(--syn-line-soft)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--syn-muted)', fontWeight: '700' }}>K-ANONYMITY THRESHOLD</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#059669', fontFamily: 'Roboto' }}>
                k = {dataset.kAnonymity}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--syn-subtle)' }}>No single individual identifiable</div>
            </div>

            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.6rem', border: '1px solid var(--syn-line-soft)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--syn-muted)', fontWeight: '700' }}>RE-IDENTIFICATION RISK</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#059669', fontFamily: 'Roboto' }}>
                {dataset.reIdRisk}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--syn-subtle)' }}>HIPAA Expert Determination Pass</div>
            </div>
          </div>

          <div style={{ padding: '1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.6rem' }}>
            <h4 style={{ margin: '0 0 0.4rem', color: '#166534', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <i className="bi bi-shield-fill-check" /> Certified Compliant by Poluru Labs Privacy Office
            </h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#14532d', lineHeight: '1.5' }}>
              This synthetic dataset contains 0% real personal data records. All entities have been generated through Poluru-CTGAN neural synthesizer with continuous Gaussian differential privacy noise. Safe for cross-border transfer, external research sharing, and model training under GDPR, HIPAA, and CCPA regulations.
            </p>
          </div>
        </div>
      )}

      {/* Tab 5: Export & Code */}
      {activeTab === 'export' && (
        <div className="syn-card">
          <div className="syn-card-header">
            <div>
              <h3>API &amp; SDK Integration</h3>
              <p>Stream or load this dataset programmatically into Python, PyTorch, Snowflake, or REST API</p>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(pythonSnippet)}
              className="syn-btn-brand"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
            >
              <i className="bi bi-clipboard" /> {copiedCode ? 'Copied!' : 'Copy Code'}
            </button>
          </div>

          <div className="syn-code-box">
            <pre style={{ margin: 0 }}>{pythonSnippet}</pre>
          </div>

          <div style={{ marginTop: '1.2rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => {
                const blob = new Blob([JSON.stringify(dataset.sampleRows, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${dataset.slug}.json`;
                a.click();
              }}
              className="syn-btn-secondary"
            >
              <i className="bi bi-filetype-json" /> Download Full JSON
            </button>
            <button
              type="button"
              onClick={() => {
                const csvHeader = Object.keys(dataset.sampleRows[0] || {}).join(',');
                const csvRows = dataset.sampleRows.map((r) => Object.values(r).map((v) => `"${v}"`).join(','));
                const csvContent = [csvHeader, ...csvRows].join('\n');
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${dataset.slug}.csv`;
                a.click();
              }}
              className="syn-btn-secondary"
            >
              <i className="bi bi-filetype-csv" /> Download CSV Format
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
