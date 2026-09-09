import { Sparkline } from '../charts/Sparkline.jsx';

const TONE_COLOR = {
  brand: '#D45060',
  info: '#B83E4D',
  success: '#059669',
  warning: '#d97706',
  danger: '#dc2626',
};

const TONE_SURFACE = {
  brand: '#FBECEE',
  info: '#F5D5D9',
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
  icon = 'bi-diagram-3',
  tone = 'brand',
  sparkline = [],
}) {
  const color = TONE_COLOR[tone] || TONE_COLOR.brand;
  const trendClass = trend === 'up' ? 'is-up' : trend === 'down' ? 'is-down' : 'is-flat';
  const trendIcon =
    trend === 'up' ? 'bi-arrow-up-right' : trend === 'down' ? 'bi-arrow-down-right' : 'bi-dash';

  return (
    <article className={`cd-stat-card tone-${tone}`}>
      <div className="cd-stat-top">
        <span
          className="cd-stat-icon"
          style={{ color, background: TONE_SURFACE[tone] || TONE_SURFACE.brand }}
        >
          <i className={`bi ${icon}`} aria-hidden="true" />
        </span>
        {sparkline.length > 0 ? <Sparkline values={sparkline} color={color} /> : null}
      </div>
      <p className="cd-stat-label">{label}</p>
      <p className="cd-stat-value">{value}</p>
      <div className="cd-stat-foot">
        {trendValue ? (
          <span className={`cd-stat-trend ${trendClass}`}>
            <i className={`bi ${trendIcon}`} aria-hidden="true" />
            {trendValue}
          </span>
        ) : null}
        {hint ? <span className="cd-stat-hint">{hint}</span> : null}
      </div>
    </article>
  );
}
