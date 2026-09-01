import { Sparkline } from '../charts/Sparkline.jsx';

const TONE_COLOR = {
  brand: '#0F766E',
  info: '#134E4A',
  success: '#1f7a4d',
  warning: '#9a6700',
  danger: '#b42318',
};

const TONE_SURFACE = {
  brand: '#CCFBF1',
  info: '#D1FAE5',
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
  const trendClass = trend === 'up' ? 'is-up' : trend === 'down' ? 'is-down' : 'is-flat';
  const trendIcon =
    trend === 'up' ? 'bi-arrow-up-right' : trend === 'down' ? 'bi-arrow-down-right' : 'bi-dash';

  return (
    <article className={`rag-stat-card tone-${tone}`}>
      <div className="rag-stat-top">
        <span
          className="rag-stat-icon"
          style={{ color, background: TONE_SURFACE[tone] || TONE_SURFACE.brand }}
        >
          <i className={`bi ${icon}`} aria-hidden="true" />
        </span>
        {sparkline.length > 0 ? <Sparkline values={sparkline} color={color} /> : null}
      </div>
      <p className="rag-stat-label">{label}</p>
      <p className="rag-stat-value">{value}</p>
      <div className="rag-stat-foot">
        {trendValue ? (
          <span className={`rag-stat-trend ${trendClass}`}>
            <i className={`bi ${trendIcon}`} aria-hidden="true" />
            {trendValue}
          </span>
        ) : null}
        {hint ? <span className="rag-stat-hint">{hint}</span> : null}
      </div>
    </article>
  );
}
