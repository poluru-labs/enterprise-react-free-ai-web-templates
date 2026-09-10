import qualityData from '../data/quality.json';
import { PageHeader, StatCard, StatusBadge, DataTable } from '../components/widgets/index.js';
import { CorrelationHeatmap } from '../components/charts/CorrelationHeatmap.jsx';
import { DistributionOverlay } from '../components/charts/DistributionOverlay.jsx';

export default function QualityEvalPage() {
  const { summary, statisticalTests, mlUtilityTSTR, correlationMatrix, distributionComparison } = qualityData;

  const testColumns = [
    {
      key: 'test',
      header: 'Statistical Test / Metric',
      render: (val, row) => (
        <div>
          <strong style={{ color: 'var(--syn-ink)', fontSize: '0.88rem' }}>{val}</strong>
          <div style={{ fontSize: '0.74rem', color: 'var(--syn-muted)' }}>{row.description}</div>
        </div>
      ),
    },
    {
      key: 'target',
      header: 'Target Threshold',
      render: (val) => <span style={{ fontFamily: 'Roboto', fontSize: '0.82rem' }}>{val}</span>,
    },
    {
      key: 'actualScore',
      header: 'Measured Score',
      render: (val) => <strong style={{ color: 'var(--syn-brand)', fontFamily: 'Roboto' }}>{val}</strong>,
    },
    {
      key: 'status',
      header: 'Evaluation Status',
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  const mlColumns = [
    {
      key: 'model',
      header: 'Downstream ML Model & Task',
      render: (val) => <strong style={{ color: 'var(--syn-ink)' }}>{val}</strong>,
    },
    {
      key: 'realTrainedScore',
      header: 'TRTR (Trained on Real)',
      render: (val) => <span style={{ fontFamily: 'Roboto' }}>{val}</span>,
    },
    {
      key: 'syntheticTrainedScore',
      header: 'TSTR (Trained on Synthetic)',
      render: (val) => <span style={{ fontFamily: 'Roboto', color: 'var(--syn-brand)', fontWeight: '700' }}>{val}</span>,
    },
    {
      key: 'parityScore',
      header: 'Utility Parity Ratio',
      render: (val) => (
        <span className="syn-badge tone-success">
          <i className="bi bi-bullseye" /> {val}
        </span>
      ),
    },
    {
      key: 'delta',
      header: 'Performance Delta',
      render: (val) => <span style={{ color: 'var(--syn-muted)', fontSize: '0.8rem' }}>{val}</span>,
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Statistical Parity Lab"
        title="Quality &amp; Fidelity Benchmark Suite"
        subtitle="Validate empirical similarity between real and synthetic data distributions through Kolmogorov-Smirnov goodness-of-fit, Wasserstein distance, and TSTR machine learning utility."
      />

      {/* Quality KPI Summary Cards */}
      <div className="syn-stat-grid">
        <StatCard
          label="Overall Fidelity Score"
          value={`${summary.overallFidelityScore}%`}
          hint="Average across all evaluated cohorts"
          icon="bi-award-fill"
          tone="brand"
        />
        <StatCard
          label="TSTR ML Utility Parity"
          value={summary.tstrUtilityParity}
          hint="Models trained on synth match real accuracy"
          icon="bi-bullseye"
          tone="success"
        />
        <StatCard
          label="Correlation Matrix Parity"
          value={summary.correlationPreservation}
          hint="Pairwise Pearson & Cramér's V"
          icon="bi-diagram-3-fill"
          tone="info"
        />
        <StatCard
          label="Mutual Info Preservation"
          value={summary.mutualInformationPreservation}
          hint="Non-linear dependency retention"
          icon="bi-bezier2"
          tone="warning"
        />
      </div>

      {/* TSTR ML Utility Table */}
      <div className="syn-card">
        <div className="syn-card-header">
          <div>
            <h3>Train on Synthetic, Test on Real (TSTR) Benchmark</h3>
            <p>Compares ML models trained on 100% synthetic data vs real data when evaluated against real unseen test sets</p>
          </div>
          <span className="syn-badge tone-success">
            <i className="bi bi-patch-check-fill" /> High ML Utility Validated
          </span>
        </div>

        <DataTable
          columns={mlColumns}
          data={mlUtilityTSTR}
          keyField="model"
          pageSize={5}
        />
      </div>

      {/* Statistical Tests Table */}
      <div className="syn-card">
        <div className="syn-card-header">
          <div>
            <h3>Statistical Goodness-of-Fit Tests</h3>
            <p>Marginal column distributions and distance tests computed by Poluru Fidelity Engine</p>
          </div>
        </div>

        <DataTable
          columns={testColumns}
          data={statisticalTests}
          keyField="test"
          pageSize={5}
        />
      </div>

      {/* Visual Analytics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.4rem' }}>
        <div className="syn-card" style={{ margin: 0 }}>
          <div className="syn-card-header">
            <div>
              <h3>Marginal Feature Distribution</h3>
              <p>Real vs Synthetic overlay for Continuous Features</p>
            </div>
          </div>
          <DistributionOverlay
            title={distributionComparison.featureName}
            bins={distributionComparison.bins}
            realPercentages={distributionComparison.realPercentages}
            syntheticPercentages={distributionComparison.syntheticPercentages}
          />
        </div>

        <div className="syn-card" style={{ margin: 0 }}>
          <div className="syn-card-header">
            <div>
              <h3>Multivariate Correlation Heatmap</h3>
              <p>Pairwise feature correlation preservation comparison</p>
            </div>
          </div>
          <CorrelationHeatmap
            features={correlationMatrix.features}
            realMatrix={correlationMatrix.realMatrix}
            syntheticMatrix={correlationMatrix.syntheticMatrix}
          />
        </div>
      </div>
    </div>
  );
}

