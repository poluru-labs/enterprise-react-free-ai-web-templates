export function ChartSection({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`amd-panel ${className}`.trim()}>
      <header className="amd-panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div className="amd-panel-action">{action}</div> : null}
      </header>
      <div className="amd-panel-body">{children}</div>
    </section>
  );
}
