import { Sparkline } from '../charts/Sparkline.jsx';

const TONE_MAP = {
  brand: { bg: '#eaf0fc', color: '#05339C' },
  info: { bg: '#e0f2fe', color: '#0284c7' },
  success: { bg: '#d1fae5', color: '#059669' },
  warning: { bg: '#fef3c7', color: '#d97706' },
  danger: { bg: '#fee2e2', color: '#dc2626' },
};

export function StatCard({
  label,
  value,
  hint,
  trend,
  trendValue,
  icon = 'bi-activity',
  tone = 'brand',
  sparkline = [],
  className = '',
}) {
  const theme = TONE_MAP[tone] || TONE_MAP.brand;
  const trendClass = trend === 'up' ? 'is-up' : trend === 'down' ? 'is-down' : '';

  return (
    <article className={`syn-stat-card ${className}`.trim()}>
      <div className="syn-stat-top">
        <span className="syn-stat-icon" style={{ background: theme.bg, color: theme.color }}>
          <i className={`bi ${icon}`} aria-hidden="true" />
        </span>
        {sparkline && sparkline.length > 0 && <Sparkline values={sparkline} color={theme.color} />}
      </div>
      <p className="syn-stat-label">{label}</p>
      <p className="syn-stat-value">{value}</p>
      <div className="syn-stat-foot">
        {trendValue && (
          <span className={`syn-trend-tag ${trendClass}`}>
            <i className={`bi ${trend === 'up' ? 'bi-arrow-up-right' : 'bi-arrow-down-right'}`} />
            {trendValue}
          </span>
        )}
        {hint && <span>{hint}</span>}
      </div>
    </article>
  );
}
