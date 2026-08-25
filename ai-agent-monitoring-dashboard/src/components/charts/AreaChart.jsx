function buildLinePath(values, width, height, padX, padY, max) {
  if (!values.length) return '';
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  return values
    .map((value, index) => {
      const x = padX + (values.length === 1 ? innerW / 2 : (index / (values.length - 1)) * innerW);
      const y = padY + innerH - (value / (max || 1)) * innerH;
      return `${index === 0 ? 'M' : 'L'}${x} ${y}`;
    })
    .join(' ');
}

export function AreaChart({ labels = [], series = [], height = 220 }) {
  const width = 640;
  const padX = 16;
  const padY = 18;
  const max = Math.max(
    1,
    ...series.flatMap((item) => item.values || []),
  );

  return (
    <div className="amd-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Trend chart">
        {[0.25, 0.5, 0.75, 1].map((tick) => {
          const y = padY + (height - padY * 2) * (1 - tick);
          return (
            <line
              key={tick}
              x1={padX}
              x2={width - padX}
              y1={y}
              y2={y}
              className="amd-chart-grid"
            />
          );
        })}
        {series.map((item) => (
          <path
            key={item.name}
            d={buildLinePath(item.values, width, height, padX, padY, max)}
            fill="none"
            stroke={item.color}
            strokeWidth="2.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div className="amd-chart-labels">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="amd-chart-legend">
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
