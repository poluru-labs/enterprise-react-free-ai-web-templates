export function BarChart({ items = [], maxValue, unit = '' }) {
  const peak = maxValue || Math.max(1, ...items.map((item) => item.value || 0));

  return (
    <div className="mq-hbar-list" role="list">
      {items.map((item) => {
        const width = `${Math.max(5, (item.value / peak) * 100)}%`;
        return (
          <div className="mq-hbar" key={item.name} role="listitem">
            <div className="mq-hbar-meta">
              <span>{item.name}</span>
              <strong>
                {Number(item.value).toLocaleString('en-US')}
                {unit}
              </strong>
            </div>
            <div className="mq-hbar-track">
              <div
                className="mq-hbar-fill"
                style={{ width, background: item.color || 'var(--mq-brand-500)' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
