export function BarChart({ items = [], maxValue, unit = '' }) {
  const peak = maxValue || Math.max(1, ...items.map((item) => item.value || 0));

  return (
    <div className="cd-hbar-list" role="list">
      {items.map((item) => {
        const width = `${Math.max(5, (item.value / peak) * 100)}%`;
        return (
          <div className="cd-hbar" key={item.name} role="listitem">
            <div className="cd-hbar-meta">
              <span>{item.name}</span>
              <strong>
                {Number(item.value).toLocaleString('en-US')}
                {unit}
              </strong>
            </div>
            <div className="cd-hbar-track">
              <div
                className="cd-hbar-fill"
                style={{ width, background: item.color || 'var(--cd-brand-500)' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
