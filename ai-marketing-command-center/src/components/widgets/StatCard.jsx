import { Sparkline } from '../charts/Sparkline.jsx';

const TONE_COLOR = {
  brand: '#3E0F8D',
  info: '#320C72',
  success: '#059669',
  warning: '#d97706',
  danger: '#dc2626',
};

const TONE_SURFACE = {
  brand: '#F3EDFA',
  info: '#E4D6F5',
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
    <article className={`mq-stat-card tone-${tone}`}>
      <div className="mq-stat-top">
        <span
          className="mq-stat-icon"
          style={{ color, background: TONE_SURFACE[tone] || TONE_SURFACE.brand }}
        >
          <i className={`bi ${icon}`} aria-hidden="true" />
        </span>
        {sparkline.length > 0 ? <Sparkline values={sparkline} color={color} /> : null}
      </div>
      <p className="mq-stat-label">{label}</p>
      <p className="mq-stat-value">{value}</p>
      <div className="mq-stat-foot">
        {trendValue ? (
          <span className={`mq-stat-trend ${trendClass}`}>
            <i className={`bi ${trendIcon}`} aria-hidden="true" />
            {trendValue}
          </span>
        ) : null}
        {hint ? <span className="mq-stat-hint">{hint}</span> : null}
      </div>
    </article>
  );
}
