export function ChartSection({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`desk-panel ${className}`.trim()}>
      <header className="desk-panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div className="desk-panel-action">{action}</div> : null}
      </header>
      <div className="desk-panel-body">{children}</div>
    </section>
  );
}
