import { Sparkline } from '../charts/Sparkline.jsx';

const TONE_COLOR = {
  brand: '#1a9b95',
  info: '#175cd3',
  success: '#1f7a4d',
  warning: '#9a6700',
  danger: '#b42318',
};

const TONE_SURFACE = {
  brand: '#eef9f8',
  info: '#e0ecff',
  success: '#d9f2e5',
  warning: '#fff1cc',
  danger: '#fce8e6',
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
  const trendClass =
    trend === 'up' ? 'is-up' : trend === 'down' ? 'is-down' : 'is-flat';
  const trendIcon =
    trend === 'up' ? 'bi-arrow-up-right' : trend === 'down' ? 'bi-arrow-down-right' : 'bi-dash';

  return (
    <article className={`amd-stat-card tone-${tone}`}>
      <div className="amd-stat-top">
        <span className="amd-stat-icon" style={{ color, background: TONE_SURFACE[tone] || TONE_SURFACE.brand }}>
          <i className={`bi ${icon}`} aria-hidden="true" />
        </span>
        {sparkline.length > 0 ? <Sparkline values={sparkline} color={color} /> : null}
      </div>
      <p className="amd-stat-label">{label}</p>
      <p className="amd-stat-value">{value}</p>
      <div className="amd-stat-foot">
        {trendValue ? (
          <span className={`amd-stat-trend ${trendClass}`}>
            <i className={`bi ${trendIcon}`} aria-hidden="true" />
            {trendValue}
          </span>
        ) : null}
        {hint ? <span className="amd-stat-hint">{hint}</span> : null}
      </div>
    </article>
  );
}
