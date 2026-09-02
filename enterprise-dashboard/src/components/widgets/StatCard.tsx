import type { ReactNode } from 'react';
import { Sparkline } from '../charts/Sparkline';

const TONE_COLOR = {
  brand: '#30AFFF',
  info: '#0b78c4',
  success: '#059669',
  warning: '#d97706',
  danger: '#dc2626',
};

type StatCardProps = {
  label: string;
  value: ReactNode;
  hint?: string;
  trend?: 'up' | 'down' | 'flat';
  trendValue?: string;
  tone?: keyof typeof TONE_COLOR;
  sparkline?: number[];
};

export function StatCard({
  label,
  value,
  hint,
  trend,
  trendValue,
  tone = 'brand',
  sparkline = [],
}: StatCardProps) {
  const color = TONE_COLOR[tone] || TONE_COLOR.brand;
  const trendClass = trend === 'up' ? 'is-up' : trend === 'down' ? 'is-down' : 'is-flat';

  return (
    <article className={`dc-stat-card tone-${tone}`}>
      <div className="dc-stat-top">
        <span className="dc-stat-label">{label}</span>
        {sparkline.length > 0 ? <Sparkline values={sparkline} color={color} /> : null}
      </div>
      <p className="dc-stat-value">{value}</p>
      <div className="dc-stat-foot">
        {trendValue ? <span className={`dc-stat-trend ${trendClass}`}>{trendValue}</span> : null}
        {hint ? <span className="dc-stat-hint">{hint}</span> : null}
      </div>
    </article>
  );
}
