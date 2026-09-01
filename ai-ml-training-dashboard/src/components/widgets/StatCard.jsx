import { Sparkline } from '../charts/Sparkline.jsx';

const TONE_COLOR = {
  brand: '#de3e3e',
  info: '#C2410C',
  success: '#1f7a4d',
  warning: '#D97706',
  danger: '#b42318',
};

const TONE_SURFACE = {
  brand: '#fdecec',
  info: '#FFEDD5',
  success: '#d9f2e5',
  warning: '#FEF3C7',
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
  const trendClass = trend === 'up' ? 'is-up' : trend === 'down' ? 'is-down' : 'is-flat';
  const trendIcon =
    trend === 'up' ? 'bi-arrow-up-right' : trend === 'down' ? 'bi-arrow-down-right' : 'bi-dash';

  return (
    <article className={`kiln-stat-card tone-${tone}`}>
      <div className="kiln-stat-top">
        <span
          className="kiln-stat-icon"
          style={{ color, background: TONE_SURFACE[tone] || TONE_SURFACE.brand }}
        >
          <i className={`bi ${icon}`} aria-hidden="true" />
        </span>
        {sparkline.length > 0 ? <Sparkline values={sparkline} color={color} /> : null}
      </div>
      <p className="kiln-stat-label">{label}</p>
      <p className="kiln-stat-value">{value}</p>
      <div className="kiln-stat-foot">
        {trendValue ? (
          <span className={`kiln-stat-trend ${trendClass}`}>
            <i className={`bi ${trendIcon}`} aria-hidden="true" />
            {trendValue}
          </span>
        ) : null}
        {hint ? <span className="kiln-stat-hint">{hint}</span> : null}
      </div>
    </article>
  );
}
