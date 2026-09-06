import { Sparkline } from '../charts/Sparkline.jsx';

const TONE_COLOR = {
  brand: '#2C5268',
  info: '#3D6A8A',
  success: '#059669',
  warning: '#d97706',
  danger: '#dc2626',
};

const TONE_SURFACE = {
  brand: '#E8F1F7',
  info: '#B0CDE6',
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
  icon = 'bi-shield-check',
  tone = 'brand',
  sparkline = [],
}) {
  const color = TONE_COLOR[tone] || TONE_COLOR.brand;
  const trendClass = trend === 'up' ? 'is-up' : trend === 'down' ? 'is-down' : 'is-flat';
  const trendIcon =
    trend === 'up' ? 'bi-arrow-up-right' : trend === 'down' ? 'bi-arrow-down-right' : 'bi-dash';

  return (
    <article className={`gov-stat-card tone-${tone}`}>
      <div className="gov-stat-top">
        <span
          className="gov-stat-icon"
          style={{ color, background: TONE_SURFACE[tone] || TONE_SURFACE.brand }}
        >
          <i className={`bi ${icon}`} aria-hidden="true" />
        </span>
        {sparkline.length > 0 ? <Sparkline values={sparkline} color={color} /> : null}
      </div>
      <p className="gov-stat-label">{label}</p>
      <p className="gov-stat-value">{value}</p>
      <div className="gov-stat-foot">
        {trendValue ? (
          <span className={`gov-stat-trend ${trendClass}`}>
            <i className={`bi ${trendIcon}`} aria-hidden="true" />
            {trendValue}
          </span>
        ) : null}
        {hint ? <span className="gov-stat-hint">{hint}</span> : null}
      </div>
    </article>
  );
}
