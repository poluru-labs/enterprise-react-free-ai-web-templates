export function ChartSection({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`cvd-panel ${className}`.trim()}>
      <header className="cvd-panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div className="cvd-panel-action">{action}</div> : null}
      </header>
      <div className="cvd-panel-body">{children}</div>
    </section>
  );
}
