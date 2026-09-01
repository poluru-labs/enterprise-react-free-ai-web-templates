import { Sparkline } from '../charts/Sparkline.jsx';

const TONE_COLOR = {
  brand: '#0F766E',
  info: '#0E7490',
  success: '#047857',
  warning: '#B45309',
  danger: '#B42318',
};

const TONE_SURFACE = {
  brand: '#CCFBF1',
  info: '#CFFAFE',
  success: '#D1FAE5',
  warning: '#FEF3C7',
  danger: '#FEE2E2',
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
    <article className={`cvd-stat-card tone-${tone}`}>
      <div className="cvd-stat-top">
        <span className="cvd-stat-icon" style={{ color, background: TONE_SURFACE[tone] || TONE_SURFACE.brand }}>
          <i className={`bi ${icon}`} aria-hidden="true" />
        </span>
        {sparkline.length > 0 ? <Sparkline values={sparkline} color={color} /> : null}
      </div>
      <p className="cvd-stat-label">{label}</p>
      <p className="cvd-stat-value">{value}</p>
      <div className="cvd-stat-foot">
        {trendValue ? (
          <span className={`cvd-stat-trend ${trendClass}`}>
            <i className={`bi ${trendIcon}`} aria-hidden="true" />
            {trendValue}
          </span>
        ) : null}
        {hint ? <span className="cvd-stat-hint">{hint}</span> : null}
      </div>
    </article>
  );
}
