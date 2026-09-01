import { Sparkline } from '../charts/Sparkline.jsx';

const TONE_COLOR = {
  brand: '#4338CA',
  info: '#0891B2',
  success: '#059669',
  warning: '#d97706',
  danger: '#dc2626',
};

const TONE_SURFACE = {
  brand: '#E0E7FF',
  info: '#CFFAFE',
  success: '#d1fae5',
  warning: '#fef3c7',
  danger: '#fee2e2',
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
}) {
  const color = TONE_COLOR[tone] || TONE_COLOR.brand;
  const trendClass = trend === 'up' ? 'is-up' : trend === 'down' ? 'is-down' : 'is-flat';
  const trendIcon =
    trend === 'up' ? 'bi-arrow-up-right' : trend === 'down' ? 'bi-arrow-down-right' : 'bi-dash';

  return (
    <article className={`llm-stat-card tone-${tone}`}>
      <div className="llm-stat-top">
        <span
          className="llm-stat-icon"
          style={{ color, background: TONE_SURFACE[tone] || TONE_SURFACE.brand }}
        >
          <i className={`bi ${icon}`} aria-hidden="true" />
        </span>
        {sparkline.length > 0 ? <Sparkline values={sparkline} color={color} /> : null}
      </div>
      <p className="llm-stat-label">{label}</p>
      <p className="llm-stat-value">{value}</p>
      <div className="llm-stat-foot">
        {trendValue ? (
          <span className={`llm-stat-trend ${trendClass}`}>
            <i className={`bi ${trendIcon}`} aria-hidden="true" />
            {trendValue}
          </span>
        ) : null}
        {hint ? <span className="llm-stat-hint">{hint}</span> : null}
      </div>
    </article>
  );
}
