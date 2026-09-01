export function BarChart({ items = [], maxValue, unit = '' }) {
  const peak = maxValue || Math.max(1, ...items.map((item) => item.value || 0));

  return (
    <div className="kiln-hbar-list" role="list">
      {items.map((item) => {
        const width = `${Math.max(5, (item.value / peak) * 100)}%`;
        return (
          <div className="kiln-hbar" key={item.name} role="listitem">
            <div className="kiln-hbar-meta">
              <span>{item.name}</span>
              <strong>
                {Number(item.value).toLocaleString('en-US')}
                {unit}
              </strong>
            </div>
            <div className="kiln-hbar-track">
              <div
                className="kiln-hbar-fill"
                style={{ width, background: item.color || 'var(--kiln-brand)' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
