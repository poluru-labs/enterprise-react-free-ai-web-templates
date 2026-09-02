type BarItem = {
  name: string;
  value: number;
  color?: string;
};

type BarChartProps = {
  items?: BarItem[];
  maxValue?: number;
  unit?: string;
};

export function BarChart({ items = [], maxValue, unit = '' }: BarChartProps) {
  const peak = maxValue || Math.max(1, ...items.map((item) => item.value || 0));

  return (
    <div className="dc-hbar-list" role="list">
      {items.map((item) => {
        const width = `${Math.max(5, (item.value / peak) * 100)}%`;
        return (
          <div className="dc-hbar" key={item.name} role="listitem">
            <div className="dc-hbar-meta">
              <span>{item.name}</span>
              <strong>
                {Number(item.value).toLocaleString('en-US')}
                {unit}
              </strong>
            </div>
            <div className="dc-hbar-track">
              <div className="dc-hbar-fill" style={{ width, background: item.color || '#30AFFF' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
