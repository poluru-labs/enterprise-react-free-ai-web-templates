export function Sparkline({ values = [], color = '#1a9b95', width = 88, height = 28 }) {
  if (!values.length) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = values.length > 1 ? (width - 2) / (values.length - 1) : width;
  const points = values.map((value, index) => {
    const x = 1 + index * step;
    const y = height - 2 - ((value - min) / range) * (height - 4);
    return `${x},${y}`;
  });

  return (
    <svg
      className="amd-sparkline"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      aria-hidden="true"
    >
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
