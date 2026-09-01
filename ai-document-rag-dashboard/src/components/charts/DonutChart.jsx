const TAU = Math.PI * 2;

function polar(cx, cy, radius, angle) {
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

function arcPath(cx, cy, radius, startAngle, endAngle) {
  const start = polar(cx, cy, radius, startAngle);
  const end = polar(cx, cy, radius, endAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export function DonutChart({ items = [], centerLabel = 'Total', centerValue }) {
  const total = items.reduce((sum, item) => sum + Number(item.value || 0), 0) || 1;
  const radius = 54;
  let cursor = -Math.PI / 2;

  const slices = items.map((item) => {
    const sweep = Math.max((Number(item.value || 0) / total) * TAU, 0.02);
    const start = cursor;
    const end = cursor + sweep;
    cursor = end;
    return { ...item, start, end };
  });

  return (
    <div className="rag-donut">
      <svg viewBox="0 0 160 160" role="img" aria-label={centerLabel}>
        <circle cx="80" cy="80" r={radius} className="rag-donut-track" />
        {slices.map((slice) => (
          <path
            key={slice.name}
            d={arcPath(80, 80, radius, slice.start, slice.end)}
            fill="none"
            stroke={slice.color}
            strokeWidth="16"
            strokeLinecap="butt"
          />
        ))}
        <text x="80" y="76" textAnchor="middle" className="rag-donut-value">
          {centerValue ?? total}
        </text>
        <text x="80" y="96" textAnchor="middle" className="rag-donut-label">
          {centerLabel}
        </text>
      </svg>
      <ul className="rag-donut-legend">
        {items.map((item) => (
          <li key={item.name}>
            <i style={{ background: item.color }} />
            <span>{item.name}</span>
            <strong>{item.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
