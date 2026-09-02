import { Sparkline } from '../charts/Sparkline.jsx';

const TONE_COLOR = {
  brand: '#162E93',
  info: '#3A52B0',
  success: '#059669',
  warning: '#d97706',
  danger: '#dc2626',
};

const TONE_SURFACE = {
  brand: '#E8ECF8',
  info: '#E8ECF8',
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
  className = '',
}) {
  const color = TONE_COLOR[tone] || TONE_COLOR.brand;
  const trendClass = trend === 'up' ? 'is-up' : trend === 'down' ? 'is-down' : 'is-flat';
  const trendIcon =
    trend === 'up' ? 'bi-arrow-up-right' : trend === 'down' ? 'bi-arrow-down-right' : 'bi-dash';

  return (
    <article className={`pmt-stat-card tone-${tone} ${className}`.trim()}>
      <div className="pmt-stat-top">
        <span
          className="pmt-stat-icon"
          style={{ color, background: TONE_SURFACE[tone] || TONE_SURFACE.brand }}
        >
          <i className={`bi ${icon}`} aria-hidden="true" />
        </span>
        {sparkline.length > 0 ? <Sparkline values={sparkline} color={color} /> : null}
      </div>
      <p className="pmt-stat-label">{label}</p>
      <p className="pmt-stat-value">{value}</p>
      <div className="pmt-stat-foot">
        {trendValue ? (
          <span className={`pmt-stat-trend ${trendClass}`}>
            <i className={`bi ${trendIcon}`} aria-hidden="true" />
            {trendValue}
          </span>
        ) : null}
        {hint ? <span className="pmt-stat-hint">{hint}</span> : null}
      </div>
    </article>
  );
}
