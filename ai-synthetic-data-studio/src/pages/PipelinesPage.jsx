import { useState } from 'react';
import pipelinesData from '../data/pipelines.json';
import { PageHeader, StatCard, StatusBadge, DataTable } from '../components/widgets/index.js';

export function PipelinesPage() {
  const [pipelines, setPipelines] = useState(pipelinesData);
  const [showModal, setShowModal] = useState(false);
  const [newPipeName, setNewPipeName] = useState('');
  const [newPipeSchedule, setNewPipeSchedule] = useState('Daily at 03:00 UTC');
  const [newPipeRows, setNewPipeRows] = useState('500000');

  const handleToggle = (id) => {
    setPipelines((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  const handleCreatePipeline = (e) => {
    e.preventDefault();
    if (!newPipeName.trim()) return;

    const newPipe = {
      id: `pipe-0${pipelines.length + 1}`,
      name: newPipeName.trim(),
      schedule: newPipeSchedule,
      targetDataset: 'Poluru Synthetic Cohort 2026',
      generator: 'Poluru-CTGAN v4.2',
      batchRows: parseInt(newPipeRows, 10),
      lastRunStatus: 'Pending',
      lastRunDuration: '—',
      lastRunDate: 'Scheduled',
      privacyEnforcement: 'Strict DP (ε=0.8)',
      owner: 'Subbu Poluru',
      destination: 'Snowflake Staging Sandbox',
      active: true,
    };

    setPipelines([newPipe, ...pipelines]);
    setNewPipeName('');
    setShowModal(false);
  };

  const columns = [
    {
      key: 'name',
      header: 'Pipeline & Schedule',
      render: (val, row) => (
        <div>
          <strong style={{ color: 'var(--syn-ink)', fontSize: '0.9rem' }}>{val}</strong>
          <div style={{ fontSize: '0.74rem', color: 'var(--syn-muted)' }}>
            <i className="bi bi-clock" /> {row.schedule} · Target: <em>{row.targetDataset}</em>
          </div>
          <div style={{ fontSize: '0.71rem', color: 'var(--syn-subtle)' }}>
            Dest: {row.destination}
          </div>
        </div>
      ),
    },
    {
      key: 'generator',
      header: 'Engine & Privacy',
      render: (val, row) => (
        <div>
          <span style={{ fontWeight: '600', color: 'var(--syn-brand)', fontSize: '0.82rem' }}>{val}</span>
          <div style={{ fontSize: '0.72rem', color: 'var(--syn-muted)' }}>{row.privacyEnforcement}</div>
        </div>
      ),
    },
    {
      key: 'batchRows',
      header: 'Batch Size',
      render: (val) => <strong style={{ fontFamily: 'Roboto' }}>{val.toLocaleString()} rows</strong>,
    },
    {
      key: 'lastRunStatus',
      header: 'Last Run',
      render: (val, row) => (
        <div>
          <StatusBadge status={val} />
          <div style={{ fontSize: '0.72rem', color: 'var(--syn-muted)', marginTop: '0.2rem' }}>
            {row.lastRunDuration} ({row.lastRunDate})
          </div>
        </div>
      ),
    },
    {
      key: 'owner',
      header: 'Pipeline Owner',
      render: (val) => (
        <span style={{ fontSize: '0.82rem', fontWeight: '600' }}>
          {val}
        </span>
      ),
    },
    {
      key: 'active',
      header: 'State / Toggle',
      render: (val, row) => (
        <button
          type="button"
          onClick={() => handleToggle(row.id)}
          className={`syn-btn-secondary ${val ? 'syn-btn-brand' : ''}`}
          style={{ fontSize: '0.75rem', padding: '0.28rem 0.65rem' }}
        >
          {val ? 'Active' : 'Paused'}
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Continuous Synthesis"
        title="Pipelines &amp; Scheduled Jobs"
        subtitle="Automate continuous synthetic data generation for staging databases, nightly anonymized mirrors, and automated CI/CD test fixtures."
        actions={
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="syn-btn-brand"
          >
            <i className="bi bi-plus-circle-fill" aria-hidden="true" />
            Create Synthetic Pipeline
          </button>
        }
      />

      <div className="syn-stat-grid">
        <StatCard
          label="Active Automated Pipelines"
          value={pipelines.filter((p) => p.active).length}
          hint="Continuous & nightly workers"
          icon="bi-arrow-repeat"
          tone="brand"
        />
        <StatCard
          label="Avg Pipeline Runtime"
          value="24m 18s"
          hint="Parallel GPU cluster synthesis"
          icon="bi-stopwatch-fill"
          tone="info"
        />
        <StatCard
          label="Synthesized This Week"
          value="18.7M rows"
          hint="100% Differential Privacy Verified"
          icon="bi-database-check"
          tone="success"
        />
        <StatCard
          label="Pipeline Success Rate"
          value="100.0%"
          hint="Zero failures in last 30 days"
          icon="bi-patch-check-fill"
          tone="success"
        />
      </div>

      <div className="syn-card">
        <div className="syn-card-header">
          <div>
            <h3>Scheduled Synthetic Generation Workflows</h3>
            <p>Monitored pipelines feeding sanitized synthetic twins into analytics cleanrooms</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={pipelines}
          keyField="id"
          pageSize={6}
        />
      </div>

      {/* Create Pipeline Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 23, 59, 0.5)',
            backdropFilter: 'blur(3px)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 1050,
            padding: '1rem',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '0.75rem',
              width: '100%',
              maxWidth: '520px',
              padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>New Synthetic Data Pipeline</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <form onSubmit={handleCreatePipeline} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                  Pipeline Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nightly Clinical Data Mirror"
                  value={newPipeName}
                  onChange={(e) => setNewPipeName(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--syn-line)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                  Execution Schedule / Trigger
                </label>
                <input
                  type="text"
                  value={newPipeSchedule}
                  onChange={(e) => setNewPipeSchedule(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--syn-line)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                  Batch Row Volume
                </label>
                <select
                  value={newPipeRows}
                  onChange={(e) => setNewPipeRows(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--syn-line)' }}
                >
                  <option value="100000">100,000 rows</option>
                  <option value="500000">500,000 rows</option>
                  <option value="1000000">1,000,000 rows</option>
                  <option value="5000000">5,000,000 rows</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="syn-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="syn-btn-brand"
                >
                  Deploy Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default PipelinesPage;
