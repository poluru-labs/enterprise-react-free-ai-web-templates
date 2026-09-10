export function BarChart({ data = [], height = 200, valueFormatter = (v) => `${v}%` }) {
  const max = Math.max(1, ...data.map((d) => d.value || 0));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {data.map((item) => {
        const pct = Math.round((item.value / max) * 100);
        return (
          <div key={item.name} style={{ fontSize: '0.84rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.25rem',
                fontWeight: '600',
                color: 'var(--syn-ink)',
              }}
            >
              <span>{item.name}</span>
              <span style={{ color: 'var(--syn-muted)' }}>{valueFormatter(item.value)}</span>
            </div>
            <div
              style={{
                background: '#e2e8f0',
                borderRadius: '4px',
                height: '10px',
                overflow: 'hidden',
                width: '100%',
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  background: item.color || '#05339C',
                  height: '100%',
                  borderRadius: '4px',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
