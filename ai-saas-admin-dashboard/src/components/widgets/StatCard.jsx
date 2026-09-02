import { Sparkline } from '../charts/Sparkline.jsx';

const TONE_COLOR = {
  brand: '#059669',
  info: '#047857',
  success: '#10B981',
  warning: '#d97706',
  danger: '#dc2626',
};

const TONE_SURFACE = {
  brand: '#D1FAE5',
  info: '#ECFDF5',
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
  icon = 'bi-graph-up',
  tone = 'brand',
  sparkline = [],
}) {
  const color = TONE_COLOR[tone] || TONE_COLOR.brand;
  const trendClass = trend === 'up' ? 'is-up' : trend === 'down' ? 'is-down' : 'is-flat';
  const trendIcon =
    trend === 'up' ? 'bi-arrow-up-right' : trend === 'down' ? 'bi-arrow-down-right' : 'bi-dash';

  return (
    <article className={`nx-stat-card tone-${tone}`}>
      <div className="nx-stat-top">
        <span
          className="nx-stat-icon"
          style={{ color, background: TONE_SURFACE[tone] || TONE_SURFACE.brand }}
        >
          <i className={`bi ${icon}`} aria-hidden="true" />
        </span>
        {sparkline.length > 0 ? <Sparkline values={sparkline} color={color} /> : null}
      </div>
      <p className="nx-stat-label">{label}</p>
      <p className="nx-stat-value">{value}</p>
      <div className="nx-stat-foot">
        {trendValue ? (
          <span className={`nx-stat-trend ${trendClass}`}>
            <i className={`bi ${trendIcon}`} aria-hidden="true" />
            {trendValue}
          </span>
        ) : null}
        {hint ? <span className="nx-stat-hint">{hint}</span> : null}
      </div>
    </article>
  );
}
