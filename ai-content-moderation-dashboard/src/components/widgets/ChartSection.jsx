export function ChartSection({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`cmb-panel ${className}`.trim()}>
      <header className="cmb-panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div className="cmb-panel-action">{action}</div> : null}
      </header>
      <div className="cmb-panel-body">{children}</div>
    </section>
  );
}
