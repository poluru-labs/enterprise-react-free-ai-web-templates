import { useState } from 'react';
import { Link } from 'react-router-dom';
import overviewData from '../data/overview.json';
import { PageHeader, StatCard, StatusBadge, DataTable } from '../components/widgets/index.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import { BASE_PATH } from '../constants/navigation.js';

export default function OverviewPage() {
  const { summary, generationThroughput, generatorDistribution, domainBreakdown, privacyMetrics, recentGenerations, quickStats } = overviewData;

  const recentColumns = [
    {
      key: 'datasetName',
      header: 'Dataset & Modality',
      render: (val, row) => (
        <div>
          <Link
            to={`${BASE_PATH}/datasets`}
            style={{ fontWeight: '700', color: 'var(--syn-brand)', textDecoration: 'none' }}
          >
            {val}
          </Link>
          <div style={{ fontSize: '0.74rem', color: 'var(--syn-muted)' }}>{row.modality} · {row.generator}</div>
        </div>
      ),
    },
    {
      key: 'recordsGenerated',
      header: 'Rows Generated',
      render: (val) => <strong style={{ fontFamily: 'Roboto' }}>{val}</strong>,
    },
    {
      key: 'privacyLevel',
      header: 'Privacy & ε',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'fidelityScore',
      header: 'Fidelity',
      render: (val) => (
        <span style={{ fontWeight: '700', color: '#059669' }}>
          {val}%
        </span>
      ),
    },
    {
      key: 'creator',
      header: 'Creator',
      render: (val) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}>
          <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#05339C', color: '#fff', fontSize: '0.62rem', display: 'grid', placeItems: 'center', fontWeight: '700' }}>
            {val.charAt(0)}
          </span>
          {val}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Poluru Labs AI Studio"
        title="AI Synthetic Data Studio"
        subtitle="Generate enterprise-scale synthetic datasets with mathematical differential privacy, zero PII leakage guarantees, and high statistical fidelity."
        actions={
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <Link to={`${BASE_PATH}/privacy-guard`} className="syn-btn-secondary">
              <i className="bi bi-shield-check" aria-hidden="true" />
              Privacy Guard
            </Link>
            <Link to={`${BASE_PATH}/generator`} className="syn-btn-brand">
              <i className="bi bi-cpu-fill" aria-hidden="true" />
              Launch Generator Studio
            </Link>
          </div>
        }
      />

      {/* Top Stat KPI Cards */}
      <div className="syn-stat-grid">
        <StatCard
          label="Total Synthetic Records"
          value={summary.totalRecords}
          trend="up"
          trendValue={summary.recordsTrend}
          hint="across 14 active pipelines"
          icon="bi-database-fill-check"
          tone="brand"
          sparkline={[14.2, 18.5, 22.1, 19.8, 28.4, 31.2, 34.2]}
        />
        <StatCard
          label="Privacy Preservation Score"
          value={summary.privacyScore}
          hint="Zero PII / PHI Leakage Verified"
          icon="bi-shield-lock-fill"
          tone="success"
          sparkline={[99.1, 99.2, 99.3, 99.4, 99.4, 99.5, 99.4]}
        />
        <StatCard
          label="Avg Statistical Fidelity"
          value={summary.fidelityScore}
          hint="TSTR ML utility parity > 99%"
          icon="bi-bar-chart-fill"
          tone="info"
          sparkline={[97.4, 97.8, 98.0, 97.9, 98.1, 98.2, 98.1]}
        />
        <StatCard
          label="DP Budget Used (ε)"
          value={summary.dpBudgetUsed}
          hint="2.68 ε remaining this cycle"
          icon="bi-pie-chart-fill"
          tone="warning"
          sparkline={[0.2, 0.4, 0.6, 0.8, 1.0, 1.15, 1.32]}
        />
      </div>

      {/* Quick Highlights Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.8rem',
        }}
      >
        {quickStats.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: '#ffffff',
              border: '1px solid var(--syn-line)',
              borderRadius: '0.65rem',
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
            }}
          >
            <span
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '0.5rem',
                background: 'var(--syn-brand-soft)',
                color: 'var(--syn-brand)',
                display: 'grid',
                placeItems: 'center',
                fontSize: '1.1rem',
              }}
            >
              <i className={`bi ${item.icon}`} />
            </span>
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--syn-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--syn-ink)', fontFamily: 'Roboto' }}>
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.4rem', marginBottom: '1.8rem' }}>
        <div className="syn-card" style={{ margin: 0 }}>
          <div className="syn-card-header">
            <div>
              <h3>Weekly Synthetic Generation Throughput</h3>
              <p>Total synthesized records vs mathematically verified zero-leakage records</p>
            </div>
            <span className="syn-badge tone-brand">
              <i className="bi bi-activity" /> Live Fleet
            </span>
          </div>
          <AreaChart
            labels={generationThroughput.labels}
            series={generationThroughput.series}
            height={230}
          />
        </div>

        <div className="syn-card" style={{ margin: 0 }}>
          <div className="syn-card-header">
            <div>
              <h3>Enterprise Domain Allocation</h3>
              <p>Active synthetic record volume segmented by enterprise vertical</p>
            </div>
            <span className="syn-badge tone-info">
              5 Key Verticals
            </span>
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            <DonutChart data={domainBreakdown} size={170} strokeWidth={26} />
          </div>
        </div>
      </div>

      {/* Privacy & Quality Quick Matrix */}
      <div className="syn-card">
        <div className="syn-card-header">
          <div>
            <h3>Privacy &amp; Quality Guarantee Ledger</h3>
            <p>Mathematical privacy thresholds audited by Subbu Poluru and Subrahmanyam Poluru</p>
          </div>
          <Link to={`${BASE_PATH}/quality-eval`} className="syn-btn-secondary" style={{ fontSize: '0.78rem', padding: '0.3rem 0.7rem' }}>
            View Full Benchmark Suite
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            padding: '0.5rem 0',
          }}
        >
          <div style={{ padding: '0.8rem', background: '#f8fafc', borderRadius: '0.55rem', border: '1px solid var(--syn-line-soft)' }}>
            <div style={{ fontSize: '0.73rem', color: 'var(--syn-muted)', fontWeight: '700' }}>DIFFERENTIAL PRIVACY</div>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--syn-brand)', fontFamily: 'Roboto' }}>
              ε = {privacyMetrics.differentialPrivacyEpsilon}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--syn-subtle)' }}>Laplace &amp; Gaussian DP Noise</div>
          </div>

          <div style={{ padding: '0.8rem', background: '#f8fafc', borderRadius: '0.55rem', border: '1px solid var(--syn-line-soft)' }}>
            <div style={{ fontSize: '0.73rem', color: 'var(--syn-muted)', fontWeight: '700' }}>K-ANONYMITY BOUND</div>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#059669', fontFamily: 'Roboto' }}>
              {privacyMetrics.kAnonymityScore}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--syn-subtle)' }}>Quasi-identifier indistinguishability</div>
          </div>

          <div style={{ padding: '0.8rem', background: '#f8fafc', borderRadius: '0.55rem', border: '1px solid var(--syn-line-soft)' }}>
            <div style={{ fontSize: '0.73rem', color: 'var(--syn-muted)', fontWeight: '700' }}>MEMBERSHIP INFERENCE</div>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#059669', fontFamily: 'Roboto' }}>
              {privacyMetrics.membershipInferenceRisk * 100}%
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--syn-subtle)' }}>Near-zero shadow model advantage</div>
          </div>

          <div style={{ padding: '0.8rem', background: '#f8fafc', borderRadius: '0.55rem', border: '1px solid var(--syn-line-soft)' }}>
            <div style={{ fontSize: '0.73rem', color: 'var(--syn-muted)', fontWeight: '700' }}>PII LEAKAGE RATE</div>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#059669', fontFamily: 'Roboto' }}>
              {privacyMetrics.piiLeakageRate}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--syn-subtle)' }}>100% Synthetic Replacement</div>
          </div>
        </div>
      </div>

      {/* Recent Generations Table */}
      <div className="syn-card">
        <div className="syn-card-header">
          <div>
            <h3>Recent Synthetic Generation Runs</h3>
            <p>Recently synthesized batches, active models, and real-time verification scores</p>
          </div>
          <Link to={`${BASE_PATH}/datasets`} className="syn-btn-secondary" style={{ fontSize: '0.78rem', padding: '0.3rem 0.7rem' }}>
            View All Datasets ({recentGenerations.length})
          </Link>
        </div>

        <DataTable
          columns={recentColumns}
          data={recentGenerations}
          keyField="id"
          pageSize={5}
        />
      </div>
    </div>
  );
}
