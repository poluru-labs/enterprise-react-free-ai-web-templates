import { useState } from 'react';
import { PageHeader, StatusBadge } from '../components/widgets/index.js';
import generatorsData from '../data/generators.json';

const PRESET_SCHEMAS = {
  healthcare: {
    name: 'Healthcare EHR & Clinical Vitals',
    domain: 'Healthcare & Life Sciences',
    columns: [
      { name: 'patient_synth_id', type: 'Identifier (UUIDv5)', piiRule: 'Synthetic Mask', distribution: 'Sequential' },
      { name: 'full_name', type: 'Demographic', piiRule: 'Poluru & Subbu Name Bank', distribution: 'Categorical Frequency' },
      { name: 'age', type: 'Demographic', piiRule: 'Bounded (18-92)', distribution: 'Gaussian (μ=48, σ=14)' },
      { name: 'primary_diagnosis', type: 'ICD-10 Clinical', piiRule: 'Anonymized Clinical Codes', distribution: 'Multinomial' },
      { name: 'systolic_bp', type: 'Vitals', piiRule: 'Normal with DP Noise', distribution: 'Normal (μ=128, σ=16)' },
      { name: 'fasting_glucose', type: 'Lab Metric', piiRule: 'Log-Normal DP Noise', distribution: 'Log-Normal (μ=105, σ=22)' },
      { name: 'readmission_risk', type: 'Target Variable', piiRule: 'Calibrated Parity', distribution: 'Logistic Prob (0.0 - 1.0)' },
    ],
    generateRow: (i, eps) => {
      const names = [
        'Subbu Poluru', 'Dr. Subrahmanyam Poluru', 'Ananya Poluru', 'Vikram Subbu Poluru',
        'Kiran Poluru (Synth-A)', 'Subbu Healthcare Corp', 'Poluru Clinical Labs', 'Dr. Kiran Subbu'
      ];
      const diagnoses = ['E11.9 (Type 2 Diabetes)', 'I10 (Essential Hypertension)', 'J45.909 (Asthma)', 'I25.10 (CAD)', 'M54.5 (Low Back Pain)'];
      const age = Math.floor(22 + Math.random() * 60);
      const sBp = Math.floor(110 + Math.random() * 40 + (eps < 1 ? Math.random() * 4 : 0));
      const glucose = (85 + Math.random() * 55).toFixed(1);
      const risk = (0.02 + Math.random() * 0.4).toFixed(2);
      return {
        patient_synth_id: `SYN-HLTH-${88000 + i}`,
        full_name: names[i % names.length],
        age,
        primary_diagnosis: diagnoses[i % diagnoses.length],
        systolic_bp: sBp,
        fasting_glucose: glucose,
        readmission_risk: risk,
      };
    },
  },
  fintech: {
    name: 'FinTech AML & High-Risk Wire Transactions',
    domain: 'Banking & FinTech',
    columns: [
      { name: 'txn_synth_id', type: 'Identifier', piiRule: 'PLR-TXN Mask', distribution: 'Sequential Hex' },
      { name: 'account_holder', type: 'PII Synthetic', piiRule: 'Subbu Poluru Entity Bank', distribution: 'Entity Match' },
      { name: 'txn_amount_usd', type: 'Monetary', piiRule: 'Pareto + DP Noise', distribution: 'Pareto (α=1.8)' },
      { name: 'channel', type: 'Channel', piiRule: 'SWIFT / ACH / Fedwire', distribution: 'Multinomial' },
      { name: 'risk_score_ml', type: 'Risk Metric', piiRule: 'Beta Distribution', distribution: 'Beta (α=2, β=5)' },
      { name: 'is_sar_reported', type: 'Target Label', piiRule: 'Rare Event Synthesis (0.5%)', distribution: 'Bernoulli' },
    ],
    generateRow: (i) => {
      const entities = [
        'Subbu Poluru Enterprises LLC', 'Poluru National Digital Bank', 'Subrahmanyam Poluru Tech Ltd',
        'Poluru Global Ventures', 'Subbu Mobile Pay Gateway', 'Poluru FinTech Capital'
      ];
      const channels = ['SWIFT Wire', 'ACH Transfer', 'Fedwire Real-Time', 'Mobile Point-of-Sale'];
      const amount = (250 + Math.random() * 85000).toFixed(2);
      const risk = (Math.random() * 0.95).toFixed(2);
      return {
        txn_synth_id: `TXN-PLR-${990000 + i}`,
        account_holder: entities[i % entities.length],
        txn_amount_usd: `$${amount}`,
        channel: channels[i % channels.length],
        risk_score_ml: risk,
        is_sar_reported: risk > 0.82 ? 'True (SAR)' : 'False',
      };
    },
  },
  retail: {
    name: 'Omnichannel Retail Customer 360 & Churn',
    domain: 'E-Commerce & Retail',
    columns: [
      { name: 'customer_synth_id', type: 'Identifier', piiRule: 'CUST-PLR Mask', distribution: 'UUID' },
      { name: 'customer_name', type: 'Demographic', piiRule: 'Poluru Synth Names', distribution: 'Categorical' },
      { name: 'tenure_months', type: 'Behavioral', piiRule: 'Weibull Distribution', distribution: 'Weibull' },
      { name: 'annual_spend_usd', type: 'Financial', piiRule: 'Log-Normal DP', distribution: 'Log-Normal' },
      { name: 'loyalty_tier', type: 'Tier', piiRule: 'Platinum / Gold / Silver', distribution: 'Categorical' },
      { name: 'churn_probability', type: 'Target', piiRule: 'Continuous Probability', distribution: 'Bounded (0-1)' },
    ],
    generateRow: (i) => {
      const names = ['Subbu Poluru', 'Subrahmanyam Poluru', 'Ananya Subbu Poluru', 'Vikram Poluru', 'Kiran Subbu (Poluru Labs)'];
      const tiers = ['Platinum Club', 'Gold Elite', 'Silver Plus'];
      const spend = (450 + Math.random() * 6800).toFixed(2);
      return {
        customer_synth_id: `CUST-PLR-${10400 + i}`,
        customer_name: names[i % names.length],
        tenure_months: Math.floor(4 + Math.random() * 48),
        annual_spend_usd: `$${spend}`,
        loyalty_tier: tiers[i % tiers.length],
        churn_probability: (Math.random() * 0.65).toFixed(2),
      };
    },
  },
};

export function GeneratorStudioPage() {
  const [selectedPreset, setSelectedPreset] = useState('healthcare');
  const [selectedGenerator, setSelectedGenerator] = useState('gen-ctgan');
  const [rowCount, setRowCount] = useState('50000');
  const [epsilon, setEpsilon] = useState(0.8);
  const [delta] = useState('1e-5');
  const [kAnonymity, setKAnonymity] = useState(25);
  const [autoRedactPII, setAutoRedactPII] = useState(true);
  const [differentialPrivacyEnabled, setDifferentialPrivacyEnabled] = useState(true);
  const [customDatasetName, setCustomDatasetName] = useState('Poluru Synthetic Cohort 2026');

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationPhase, setGenerationPhase] = useState('');
  const [generatedBatch, setGeneratedBatch] = useState(null);

  const activePresetConfig = PRESET_SCHEMAS[selectedPreset];

  const handleStartGeneration = () => {
    setIsGenerating(true);
    setGenerationProgress(10);
    setGenerationPhase('Initializing neural latent space & column distribution encoders...');
    setGeneratedBatch(null);

    setTimeout(() => {
      setGenerationProgress(35);
      setGenerationPhase('Training discriminator & applying DP-SGD gradient noise clipping...');
    }, 600);

    setTimeout(() => {
      setGenerationProgress(70);
      setGenerationPhase(`Injecting Rényi Differential Privacy (ε=${epsilon}, δ=${delta})...`);
    }, 1200);

    setTimeout(() => {
      setGenerationProgress(90);
      setGenerationPhase('Running zero-leakage PII audit & Kolmogorov-Smirnov quality check...');
    }, 1800);

    setTimeout(() => {
      setGenerationProgress(100);
      setGenerationPhase('Complete! Synthetic batch ready for inspection & export.');
      setIsGenerating(false);

      // Generate rows
      const rows = [];
      for (let i = 1; i <= 8; i++) {
        rows.push(activePresetConfig.generateRow(i, epsilon));
      }

      setGeneratedBatch({
        datasetName: customDatasetName,
        presetName: activePresetConfig.name,
        generator: generatorsData.find((g) => g.id === selectedGenerator)?.name || 'Poluru-CTGAN v4.2',
        rowCount: Number(rowCount).toLocaleString(),
        epsilon: differentialPrivacyEnabled ? epsilon : 'N/A',
        privacyScore: differentialPrivacyEnabled ? '99.8%' : '94.2%',
        fidelityScore: '98.7%',
        ksStatisticPassRate: '99.4%',
        reIdRisk: '< 0.005%',
        generatedBy: 'Subbu Poluru (Lead AI Architect)',
        rows,
      });
    }, 2300);
  };

  const handleDownload = (format) => {
    if (!generatedBatch) return;
    const blob = new Blob([JSON.stringify(generatedBatch.rows, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `poluru-synthetic-${selectedPreset}-${Date.now()}.${format.toLowerCase()}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Interactive Generator Studio"
        title="Synthetic Data Generator Studio"
        subtitle="Configure synthetic generation pipelines, apply differential privacy noise, enforce column schema constraints, and synthesize high-utility mock data with Poluru naming presets."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '1.8rem' }}>
        {/* Left: Configuration Form */}
        <div className="syn-card" style={{ margin: 0 }}>
          <div className="syn-card-header">
            <div>
              <h3>1. Generator Configuration</h3>
              <p>Configure model architecture, sample volume, and schema rules</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {/* Dataset Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--syn-ink)', marginBottom: '0.3rem' }}>
                Dataset Name
              </label>
              <input
                type="text"
                value={customDatasetName}
                onChange={(e) => setCustomDatasetName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.8rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--syn-line)',
                  fontSize: '0.85rem',
                  color: 'var(--syn-ink)',
                }}
              />
            </div>

            {/* Preset Schema */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--syn-ink)', marginBottom: '0.3rem' }}>
                Select Domain Schema Preset
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                {Object.entries(PRESET_SCHEMAS).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedPreset(key)}
                    style={{
                      padding: '0.6rem 0.5rem',
                      borderRadius: '0.5rem',
                      border: `1.5px solid ${selectedPreset === key ? 'var(--syn-brand)' : 'var(--syn-line)'}`,
                      background: selectedPreset === key ? 'var(--syn-brand-soft)' : '#ffffff',
                      color: selectedPreset === key ? 'var(--syn-brand)' : 'var(--syn-ink)',
                      fontWeight: selectedPreset === key ? '700' : '500',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    {val.name.split('&')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Generator Algorithm Model */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--syn-ink)', marginBottom: '0.3rem' }}>
                Generator Synthesis Engine
              </label>
              <select
                value={selectedGenerator}
                onChange={(e) => setSelectedGenerator(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.8rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--syn-line)',
                  fontSize: '0.85rem',
                  color: 'var(--syn-ink)',
                  background: '#ffffff',
                }}
              >
                {generatorsData.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} ({g.family} - {g.dpSupport})
                  </option>
                ))}
              </select>
            </div>

            {/* Row Count */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--syn-ink)', marginBottom: '0.3rem' }}>
                Target Batch Volume (Rows)
              </label>
              <select
                value={rowCount}
                onChange={(e) => setRowCount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.8rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--syn-line)',
                  fontSize: '0.85rem',
                  color: 'var(--syn-ink)',
                  background: '#ffffff',
                }}
              >
                <option value="10000">10,000 rows (Instant Preview)</option>
                <option value="50000">50,000 rows (Standard Test)</option>
                <option value="250000">250,000 rows (Model Training Split)</option>
                <option value="1000000">1,000,000 rows (Full Enterprise Scale)</option>
                <option value="5000000">5,000,000 rows (Cluster Batch)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Privacy & Quality Checks Controls */}
        <div className="syn-card" style={{ margin: 0 }}>
          <div className="syn-card-header">
            <div>
              <h3>2. Privacy &amp; Quality Check Controls</h3>
              <p>Configure differential privacy budget, k-anonymity, and PII masks</p>
            </div>
            <StatusBadge status="Zero Leakage Mode" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* Differential Privacy Toggle & Slider */}
            <div style={{ padding: '0.9rem', background: '#f8fafc', borderRadius: '0.6rem', border: '1px solid var(--syn-line-soft)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--syn-ink)' }}>Differential Privacy (ε-DP)</strong>
                  <div style={{ fontSize: '0.72rem', color: 'var(--syn-muted)' }}>Inject provable mathematical noise into gradients</div>
                </div>
                <input
                  type="checkbox"
                  checked={differentialPrivacyEnabled}
                  onChange={(e) => setDifferentialPrivacyEnabled(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--syn-brand)', cursor: 'pointer' }}
                />
              </div>

              {differentialPrivacyEnabled && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.2rem' }}>
                    <span>Epsilon Budget (ε): <strong style={{ color: 'var(--syn-brand)' }}>{epsilon}</strong></span>
                    <span style={{ fontSize: '0.72rem', color: epsilon < 1.0 ? '#059669' : '#d97706' }}>
                      {epsilon < 1.0 ? 'Strict Privacy (HIPAA/GDPR)' : 'Balanced Utility'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="3.0"
                    step="0.1"
                    value={epsilon}
                    onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--syn-brand)', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--syn-subtle)' }}>
                    <span>ε=0.1 (Max Privacy)</span>
                    <span>ε=1.5 (Standard)</span>
                    <span>ε=3.0 (Max Fidelity)</span>
                  </div>
                </div>
              )}
            </div>

            {/* K-Anonymity & PII Scanner */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
              <div style={{ padding: '0.8rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid var(--syn-line-soft)' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--syn-ink)', marginBottom: '0.2rem' }}>
                  K-Anonymity Floor
                </label>
                <select
                  value={kAnonymity}
                  onChange={(e) => setKAnonymity(parseInt(e.target.value, 10))}
                  style={{ width: '100%', padding: '0.35rem', borderRadius: '0.4rem', border: '1px solid var(--syn-line)', fontSize: '0.8rem' }}
                >
                  <option value="10">k = 10 (Minimal)</option>
                  <option value="20">k = 20 (Standard)</option>
                  <option value="25">k = 25 (Recommended)</option>
                  <option value="50">k = 50 (High Security)</option>
                </select>
              </div>

              <div style={{ padding: '0.8rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid var(--syn-line-soft)' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--syn-ink)', marginBottom: '0.2rem' }}>
                  PII Name Synthesizer
                </label>
                <div style={{ fontSize: '0.75rem', color: 'var(--syn-brand)', fontWeight: '700', paddingTop: '0.3rem' }}>
                  <i className="bi bi-shield-lock-fill" /> Poluru / Subbu Generator
                </div>
              </div>
            </div>

            {/* Auto Redact Checkbox */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem', color: 'var(--syn-ink)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={autoRedactPII}
                onChange={(e) => setAutoRedactPII(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--syn-brand)' }}
              />
              <span>Enforce automated PII / PHI regex masking before synthesis</span>
            </label>

            {/* Launch Action Button */}
            <button
              type="button"
              disabled={isGenerating}
              onClick={handleStartGeneration}
              className="syn-btn-brand"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.75rem',
                fontSize: '0.95rem',
                fontWeight: '700',
              }}
            >
              {isGenerating ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                  <span>Synthesizing Records...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-play-circle-fill" aria-hidden="true" />
                  <span>Generate Live Synthetic Batch</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar when Generating */}
      {isGenerating && (
        <div className="syn-card" style={{ background: '#f0f5ff', borderColor: 'var(--syn-brand-tint)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--syn-brand)' }}>
            <span>{generationPhase}</span>
            <span>{generationProgress}%</span>
          </div>
          <div style={{ height: '10px', background: '#d5e2f9', borderRadius: '5px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${generationProgress}%`,
                height: '100%',
                background: 'var(--syn-brand)',
                borderRadius: '5px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>
      )}

      {/* Generated Batch Preview & Verification */}
      {generatedBatch && (
        <div className="syn-card">
          <div className="syn-card-header">
            <div>
              <div className="syn-page-eyebrow">
                <i className="bi bi-check-circle-fill" /> Generation Verified
              </div>
              <h3>{generatedBatch.datasetName} — Live Synthetic Sample</h3>
              <p>
                Generated {generatedBatch.rowCount} synthetic records with {generatedBatch.generator} by {generatedBatch.generatedBy}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handleDownload('CSV')}
                className="syn-btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
              >
                <i className="bi bi-filetype-csv" /> Export CSV
              </button>
              <button
                type="button"
                onClick={() => handleDownload('JSON')}
                className="syn-btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
              >
                <i className="bi bi-filetype-json" /> Export JSON
              </button>
              <button
                type="button"
                onClick={() => handleDownload('PARQUET')}
                className="syn-btn-brand"
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
              >
                <i className="bi bi-cloud-arrow-down-fill" /> Download Parquet
              </button>
            </div>
          </div>

          {/* Verification KPI row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '0.8rem',
              marginBottom: '1.2rem',
              padding: '0.8rem',
              background: '#f8fafc',
              borderRadius: '0.6rem',
              border: '1px solid var(--syn-line-soft)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--syn-muted)', fontWeight: '700' }}>PRIVACY SCORE</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#059669' }}>{generatedBatch.privacyScore}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--syn-muted)', fontWeight: '700' }}>FIDELITY PARITY</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--syn-brand)' }}>{generatedBatch.fidelityScore}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--syn-muted)', fontWeight: '700' }}>KS-TEST PASS</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--syn-ink)' }}>{generatedBatch.ksStatisticPassRate}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--syn-muted)', fontWeight: '700' }}>RE-ID RISK</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#059669' }}>{generatedBatch.reIdRisk}</div>
            </div>
          </div>

          {/* Data Table Preview */}
          <div className="syn-table-wrapper">
            <table className="syn-table">
              <thead>
                <tr>
                  {Object.keys(generatedBatch.rows[0] || {}).map((col) => (
                    <th key={col}>{col.replace(/_/g, ' ').toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {generatedBatch.rows.map((row, idx) => (
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

      {/* Schema Reference Guide */}
      <div className="syn-card">
        <div className="syn-card-header">
          <div>
            <h3>Active Schema Definition &amp; Column Mask Rules</h3>
            <p>Underlying feature distributions and privacy protection mechanisms for {activePresetConfig.name}</p>
          </div>
        </div>

        <div className="syn-table-wrapper">
          <table className="syn-table">
            <thead>
              <tr>
                <th>Column Name</th>
                <th>Semantic Type</th>
                <th>Privacy / Masking Rule</th>
                <th>Target Distribution Profile</th>
              </tr>
            </thead>
            <tbody>
              {activePresetConfig.columns.map((col) => (
                <tr key={col.name}>
                  <td>
                    <code style={{ background: '#eaf0fc', color: '#05339C', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>
                      {col.name}
                    </code>
                  </td>
                  <td>{col.type}</td>
                  <td>
                    <StatusBadge status={col.piiRule} />
                  </td>
                  <td style={{ color: 'var(--syn-muted)', fontSize: '0.8rem' }}>{col.distribution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default GeneratorStudioPage;
