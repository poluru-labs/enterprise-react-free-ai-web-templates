export function BarChart({ items = [], maxValue, unit = '' }) {
  const peak = maxValue || Math.max(1, ...items.map((item) => item.value || 0));

  return (
    <div className="prism-hbar-list" role="list">
      {items.map((item) => {
        const width = `${Math.max(5, (item.value / peak) * 100)}%`;
        return (
          <div className="prism-hbar" key={item.name} role="listitem">
            <div className="prism-hbar-meta">
              <span>{item.name}</span>
              <strong>
                {Number(item.value).toLocaleString('en-US')}
                {unit}
              </strong>
            </div>
            <div className="prism-hbar-track">
              <div
                className="prism-hbar-fill"
                style={{ width, background: item.color || 'var(--prism-brand)' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
