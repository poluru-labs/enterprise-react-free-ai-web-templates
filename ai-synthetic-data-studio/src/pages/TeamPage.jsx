import { useState } from 'react';
import teamData from '../data/team.json';
import { PageHeader, StatusBadge, DataTable } from '../components/widgets/index.js';

export function TeamPage() {
  const { organization, members, apiKeys } = teamData;
  const [keysList, setKeysList] = useState(apiKeys);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  const handleCreateKey = (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const newKey = {
      id: `key-0${keysList.length + 1}`,
      name: newKeyName.trim(),
      prefix: `plr_live_syn_${Math.floor(1000 + Math.random() * 9000)}...`,
      created: 'Just now',
      createdBy: 'Subbu Poluru',
      lastUsed: 'Never',
      scope: 'Read / Write / Generate (DP Enforced)',
      status: 'Active',
    };

    setKeysList([newKey, ...keysList]);
    setNewKeyName('');
    setShowKeyModal(false);
  };

  const memberColumns = [
    {
      key: 'name',
      header: 'Team Member',
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#05339C',
              color: '#ffffff',
              display: 'grid',
              placeItems: 'center',
              fontWeight: '700',
              fontSize: '0.78rem',
            }}
          >
            {row.avatar}
          </div>
          <div>
            <strong style={{ color: 'var(--syn-ink)', fontSize: '0.9rem' }}>{val}</strong>
            <div style={{ fontSize: '0.74rem', color: 'var(--syn-muted)' }}>{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role & Title',
      render: (val) => <span style={{ fontWeight: '600', color: 'var(--syn-brand)', fontSize: '0.82rem' }}>{val}</span>,
    },
    {
      key: 'datasetsCreated',
      header: 'Datasets Created',
      render: (val) => <strong style={{ fontFamily: 'Roboto' }}>{val} datasets</strong>,
    },
    {
      key: 'dpBudgetAssigned',
      header: 'DP Quota (ε)',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'lastActive',
      header: 'Last Active',
      render: (val) => <span style={{ fontSize: '0.78rem', color: 'var(--syn-muted)' }}>{val}</span>,
    },
  ];

  const keyColumns = [
    {
      key: 'name',
      header: 'Key Identifier',
      render: (val, row) => (
        <div>
          <strong style={{ color: 'var(--syn-ink)' }}>{val}</strong>
          <div style={{ fontSize: '0.74rem', color: 'var(--syn-muted)' }}>Created by {row.createdBy} ({row.created})</div>
        </div>
      ),
    },
    {
      key: 'prefix',
      header: 'API Token Prefix',
      render: (val) => (
        <code style={{ background: '#f1f5f9', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.78rem' }}>
          {val}
        </code>
      ),
    },
    {
      key: 'scope',
      header: 'Access Scope & Privacy',
      render: (val) => <span style={{ fontSize: '0.8rem', color: 'var(--syn-muted)' }}>{val}</span>,
    },
    {
      key: 'lastUsed',
      header: 'Last Invoked',
      render: (val) => <span style={{ fontSize: '0.78rem', color: 'var(--syn-muted)' }}>{val}</span>,
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
        eyebrow="Access & Identity"
        title="Team Members &amp; API Access"
        subtitle={`Manage Poluru Labs AI team workspaces, differential privacy budget quotas, and SDK programmatic access tokens for ${organization}.`}
      />

      {/* Team Members List */}
      <div className="syn-card">
        <div className="syn-card-header">
          <div>
            <h3>Poluru Labs Studio Team Members ({members.length})</h3>
            <p>Team members authorized for differential privacy dataset generation &amp; compliance signing</p>
          </div>
        </div>

        <DataTable
          columns={memberColumns}
          data={members}
          keyField="id"
          pageSize={6}
        />
      </div>

      {/* API Keys List */}
      <div className="syn-card">
        <div className="syn-card-header">
          <div>
            <h3>Studio Programmatic API Keys &amp; SDK Tokens</h3>
            <p>Access tokens used for streaming synthetic batches and querying quality evaluation endpoints</p>
          </div>
          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            className="syn-btn-brand"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
          >
            <i className="bi bi-key-fill" /> Generate New API Key
          </button>
        </div>

        <DataTable
          columns={keyColumns}
          data={keysList}
          keyField="id"
          pageSize={5}
        />
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
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
              maxWidth: '480px',
              padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800' }}>Create Programmatic API Key</h3>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <form onSubmit={handleCreateKey} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                  Key Name / Purpose
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Production Data Warehouse Synthesizer"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--syn-line)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="syn-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="syn-btn-brand"
                >
                  Create Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default TeamPage;
