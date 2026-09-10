import { useState } from 'react';
import settingsData from '../data/settings.json';
import { PageHeader, StatusBadge } from '../components/widgets/index.js';

export function SettingsPage() {
  const [settings, setSettings] = useState(settingsData);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Configuration"
        title="Studio &amp; Engine Settings"
        subtitle="Manage compute clusters, differential privacy defaults, destination object stores, and compliance standards for Poluru Synth Studio."
        actions={
          <button
            type="button"
            onClick={handleSave}
            className="syn-btn-brand"
          >
            <i className="bi bi-floppy-fill" aria-hidden="true" />
            Save Configuration
          </button>
        }
      />

      {savedNotice && (
        <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', color: '#065f46', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}>
          <i className="bi bi-check-circle-fill" /> Settings successfully updated and saved to Poluru Labs cluster!
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '1.8rem' }}>
        {/* Differential Privacy Defaults */}
        <div className="syn-card" style={{ margin: 0 }}>
          <div className="syn-card-header">
            <div>
              <h3>Differential Privacy &amp; Anonymization Defaults</h3>
              <p>Default parameters enforced across all synthetic generation runs</p>
            </div>
            <StatusBadge status="Zero Leakage Mode" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                Default Epsilon Budget (ε)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="5.0"
                value={settings.privacyDefaults.defaultEpsilon}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    privacyDefaults: { ...settings.privacyDefaults, defaultEpsilon: parseFloat(e.target.value) },
                  })
                }
                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--syn-line)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                Default Delta Bound (δ)
              </label>
              <input
                type="text"
                value={settings.privacyDefaults.defaultDelta}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    privacyDefaults: { ...settings.privacyDefaults, defaultDelta: e.target.value },
                  })
                }
                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--syn-line)' }}
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.84rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.privacyDefaults.autoRedactPII}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    privacyDefaults: { ...settings.privacyDefaults, autoRedactPII: e.target.checked },
                  })
                }
                style={{ width: '16px', height: '16px', accentColor: 'var(--syn-brand)' }}
              />
              <span>Enforce automated PII / PHI regex masking before synthesis</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.84rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.privacyDefaults.zeroLeakageGuarantee}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    privacyDefaults: { ...settings.privacyDefaults, zeroLeakageGuarantee: e.target.checked },
                  })
                }
                style={{ width: '16px', height: '16px', accentColor: 'var(--syn-brand)' }}
              />
              <span>Guarantee nearest-neighbor distance ratio &gt; 0.90 (Zero Record Copying)</span>
            </label>
          </div>
        </div>

        {/* Compute Engine Settings */}
        <div className="syn-card" style={{ margin: 0 }}>
          <div className="syn-card-header">
            <div>
              <h3>Neural Synthesis Engine &amp; GPU Hardware</h3>
              <p>Hardware cluster allocation for training CTGAN and Diffusion models</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                GPU Acceleration Cluster
              </label>
              <input
                type="text"
                value={settings.computeEngine.gpuInstanceType}
                readOnly
                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--syn-line)', background: '#f8fafc' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                Max Concurrent Synthesis Pipelines
              </label>
              <input
                type="number"
                value={settings.computeEngine.maxConcurrentGenerators}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    computeEngine: { ...settings.computeEngine, maxConcurrentGenerators: parseInt(e.target.value, 10) },
                  })
                }
                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--syn-line)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                Reproducibility Seed
              </label>
              <input
                type="number"
                value={settings.computeEngine.randomSeed}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    computeEngine: { ...settings.computeEngine, randomSeed: parseInt(e.target.value, 10) },
                  })
                }
                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--syn-line)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Storage and Connectors */}
      <div className="syn-card">
        <div className="syn-card-header">
          <div>
            <h3>Connected Data Warehouses &amp; Object Stores</h3>
            <p>Target cleanrooms for synthetic batch exports and automated pipeline destinations</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {settings.storageAndConnectors.map((conn) => (
            <div
              key={conn.name}
              style={{
                border: '1px solid var(--syn-line)',
                borderRadius: '0.6rem',
                padding: '1rem',
                background: '#ffffff',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--syn-ink)' }}>{conn.name}</strong>
                <StatusBadge status={conn.status} />
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--syn-muted)', marginBottom: '0.3rem' }}>{conn.type}</div>
              <code style={{ fontSize: '0.72rem', color: 'var(--syn-brand)', wordBreak: 'break-all' }}>{conn.endpoint}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default SettingsPage;
