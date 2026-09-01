function linePath(values, width, height, padX, padY, max) {
  if (!values.length) return '';
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  return values
    .map((value, index) => {
      const x = padX + (values.length === 1 ? innerW / 2 : (index / (values.length - 1)) * innerW);
      const y = padY + innerH - (value / (max || 1)) * innerH;
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

function areaPath(values, width, height, padX, padY, max) {
  const line = linePath(values, width, height, padX, padY, max);
  if (!line) return '';
  const lastX = width - padX;
  return `${line} L${lastX} ${height - padY} L${padX} ${height - padY} Z`;
}

export function AreaChart({ labels = [], series = [], height = 220 }) {
  const width = 640;
  const padX = 18;
  const padY = 16;
  const max = Math.max(1, ...series.flatMap((item) => item.values || []));
  const fillSeries = series[0];

  return (
    <div className="rag-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Volume trend">
        {[0.25, 0.5, 0.75, 1].map((tick) => {
          const y = padY + (height - padY * 2) * (1 - tick);
          return (
            <line key={tick} x1={padX} x2={width - padX} y1={y} y2={y} className="rag-chart-grid" />
          );
        })}
        {fillSeries ? (
          <path d={areaPath(fillSeries.values, width, height, padX, padY, max)} fill={fillSeries.color} opacity="0.12" />
        ) : null}
        {series.map((item) => (
          <path
            key={item.name}
            d={linePath(item.values, width, height, padX, padY, max)}
            fill="none"
            stroke={item.color}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div className="rag-chart-labels">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="rag-chart-legend">
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
