export function DonutChart({ data = [], size = 160, strokeWidth = 24 }) {
  const total = data.reduce((acc, item) => acc + (item.pct || item.value || 0), 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulated = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
      <div style={{ width: size, height: size, position: 'relative' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {data.map((slice) => {
            const val = slice.pct || slice.value || 0;
            const strokeDasharray = `${(val / total) * circumference} ${circumference}`;
            const strokeDashoffset = -accumulated * circumference;
            accumulated += val / total;

            return (
              <circle
                key={slice.name}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={slice.color || '#05339C'}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            );
          })}
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--syn-ink)', fontFamily: 'Roboto' }}>
            {total}%
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem' }}>
        {data.map((item) => (
          <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: item.color || '#05339C',
                flexShrink: 0,
              }}
            />
            <span style={{ color: 'var(--syn-ink)', fontWeight: '600' }}>{item.name}</span>
            <span style={{ color: 'var(--syn-muted)', marginLeft: 'auto' }}>
              {item.pct ? `${item.pct}%` : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
