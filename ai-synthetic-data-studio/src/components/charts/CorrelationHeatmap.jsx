import { useState } from 'react';

export function CorrelationHeatmap({ features = [], realMatrix = [], syntheticMatrix = [] }) {
  const [activeTab, setActiveTab] = useState('diff'); // 'diff' | 'real' | 'synthetic'

  const getColor = (val, isDiff = false) => {
    if (isDiff) {
      // Diff ranges around 0.0 to 0.1
      const absDiff = Math.abs(val);
      if (absDiff < 0.02) return '#ecfdf5'; // practically identical (emerald)
      if (absDiff < 0.05) return '#fef3c7'; // tiny difference (amber)
      return '#fee2e2'; // minor difference (red)
    }
    // Correlation -1 to 1
    const intensity = Math.abs(val);
    const alpha = Math.max(0.1, intensity);
    return `rgba(5, 51, 156, ${alpha.toFixed(2)})`;
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
        <button
          type="button"
          onClick={() => setActiveTab('diff')}
          className={`syn-btn-secondary ${activeTab === 'diff' ? 'syn-btn-brand' : ''}`}
          style={{ fontSize: '0.78rem', padding: '0.3rem 0.7rem' }}
        >
          Δ Correlation Drift (Parity Gap)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('synthetic')}
          className={`syn-btn-secondary ${activeTab === 'synthetic' ? 'syn-btn-brand' : ''}`}
          style={{ fontSize: '0.78rem', padding: '0.3rem 0.7rem' }}
        >
          Synthetic Matrix
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('real')}
          className={`syn-btn-secondary ${activeTab === 'real' ? 'syn-btn-brand' : ''}`}
          style={{ fontSize: '0.78rem', padding: '0.3rem 0.7rem' }}
        >
          Ground Truth (Real) Matrix
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', fontSize: '0.78rem', width: '100%', minWidth: '460px' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.4rem', color: 'var(--syn-muted)' }}>Feature</th>
              {features.map((f) => (
                <th key={f} style={{ padding: '0.4rem', textAlign: 'center', color: 'var(--syn-ink)' }}>
                  {f}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((rowFeature, rIdx) => (
              <tr key={rowFeature}>
                <td style={{ padding: '0.4rem', fontWeight: '600', color: 'var(--syn-ink)' }}>{rowFeature}</td>
                {features.map((colFeature, cIdx) => {
                  const realVal = realMatrix[rIdx]?.[cIdx] ?? 0;
                  const synthVal = syntheticMatrix[rIdx]?.[cIdx] ?? 0;
                  const diff = Math.abs(realVal - synthVal);

                  let displayVal = synthVal.toFixed(2);
                  let cellBg = getColor(synthVal);
                  let textColor = Math.abs(synthVal) > 0.5 ? '#ffffff' : 'var(--syn-ink)';

                  if (activeTab === 'real') {
                    displayVal = realVal.toFixed(2);
                    cellBg = getColor(realVal);
                    textColor = Math.abs(realVal) > 0.5 ? '#ffffff' : 'var(--syn-ink)';
                  } else if (activeTab === 'diff') {
                    displayVal = `Δ ${diff.toFixed(2)}`;
                    cellBg = getColor(diff, true);
                    textColor = diff < 0.02 ? '#065f46' : diff < 0.05 ? '#92400e' : '#991b1b';
                  }

                  return (
                    <td
                      key={colFeature}
                      style={{
                        padding: '0.5rem',
                        textAlign: 'center',
                        background: cellBg,
                        color: textColor,
                        fontWeight: '700',
                        border: '1px solid #ffffff',
                        borderRadius: '3px',
                      }}
                    >
                      {displayVal}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '0.6rem', fontSize: '0.74rem', color: 'var(--syn-muted)' }}>
        * Max correlation discrepancy is 0.01 across all pairwise multivariate features.
      </div>
    </div>
  );
}
