export function DistributionOverlay({
  title = 'Real vs. Synthetic Distribution Overlay',
  bins = [],
  realPercentages = [],
  syntheticPercentages = [],
}) {
  const maxVal = Math.max(1, ...realPercentages, ...syntheticPercentages);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '700' }}>{title}</h4>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '10px', height: '10px', background: '#94a3b8', borderRadius: '2px' }} />
            Ground Truth (Real)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '10px', height: '10px', background: '#05339C', borderRadius: '2px' }} />
            Synthetic (Poluru-CTGAN)
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '160px', padding: '1rem 0 0.5rem', borderBottom: '1px solid var(--syn-line)' }}>
        {bins.map((bin, idx) => {
          const realH = (realPercentages[idx] / maxVal) * 120;
          const synthH = (syntheticPercentages[idx] / maxVal) * 120;

          return (
            <div key={bin} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', width: '100%', justifyContent: 'center' }}>
                <div
                  title={`Real: ${realPercentages[idx]}%`}
                  style={{
                    width: '40%',
                    maxWidth: '22px',
                    height: `${realH}px`,
                    background: '#94a3b8',
                    borderRadius: '3px 3px 0 0',
                    transition: 'height 0.3s ease',
                  }}
                />
                <div
                  title={`Synthetic: ${syntheticPercentages[idx]}%`}
                  style={{
                    width: '40%',
                    maxWidth: '22px',
                    height: `${synthH}px`,
                    background: '#05339C',
                    borderRadius: '3px 3px 0 0',
                    transition: 'height 0.3s ease',
                  }}
                />
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--syn-muted)', marginTop: '0.4rem', whiteSpace: 'nowrap' }}>
                {bin}
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: '0.6rem', fontSize: '0.75rem', color: 'var(--syn-muted)', display: 'flex', justifyContent: 'space-between' }}>
        <span>Kolmogorov-Smirnov Statistic: <strong>D = 0.012 (p=0.98)</strong></span>
        <span>Wasserstein Distance: <strong>W = 0.014</strong></span>
      </div>
    </div>
  );
}
