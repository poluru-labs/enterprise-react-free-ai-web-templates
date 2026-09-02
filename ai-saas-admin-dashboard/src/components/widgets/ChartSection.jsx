export function ChartSection({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`nx-panel ${className}`.trim()}>
      <header className="nx-panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div className="nx-panel-action">{action}</div> : null}
      </header>
      <div className="nx-panel-body">{children}</div>
    </section>
  );
}
