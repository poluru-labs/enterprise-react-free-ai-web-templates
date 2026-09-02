export function BarChart({ items = [], maxValue, unit = '' }) {
  const peak = maxValue || Math.max(1, ...items.map((item) => item.value || 0));

  return (
    <div className="nx-hbar-list" role="list">
      {items.map((item) => {
        const width = `${Math.max(5, (item.value / peak) * 100)}%`;
        return (
          <div className="nx-hbar" key={item.name} role="listitem">
            <div className="nx-hbar-meta">
              <span>{item.name}</span>
              <strong>
                {Number(item.value).toLocaleString('en-US')}
                {unit}
              </strong>
            </div>
            <div className="nx-hbar-track">
              <div
                className="nx-hbar-fill"
                style={{ width, background: item.color || 'var(--nx-brand)' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function GroupedBarChart({ labels = [], series = [], height = 220 }) {
  const width = 640;
  const padX = 22;
  const padY = 16;
  const max = Math.max(1, ...series.flatMap((item) => item.values || []));
  const groupCount = labels.length || 1;
  const groupWidth = (width - padX * 2) / groupCount;
  const barWidth = Math.max(7, (groupWidth - 18) / Math.max(series.length, 1));

  return (
    <div className="nx-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Grouped bar chart">
        {[0.25, 0.5, 0.75, 1].map((tick) => {
          const y = padY + (height - padY * 2) * (1 - tick);
          return (
            <line key={tick} x1={padX} x2={width - padX} y1={y} y2={y} className="nx-chart-grid" />
          );
        })}
        {labels.map((label, groupIndex) =>
          series.map((item, seriesIndex) => {
            const value = item.values[groupIndex] || 0;
            const barHeight = (value / max) * (height - padY * 2);
            const x = padX + groupIndex * groupWidth + 10 + seriesIndex * barWidth;
            const y = height - padY - barHeight;
            return (
              <rect
                key={`${label}-${item.name}`}
                x={x}
                y={y}
                width={barWidth - 4}
                height={Math.max(barHeight, 0)}
                rx="4"
                fill={item.color}
              />
            );
          }),
        )}
      </svg>
      <div className="nx-chart-labels">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="nx-chart-legend">
        {series.map((item) => (
          <span key={item.name}>
            <i style={{ background: item.color }} />
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
