export function ChartSection({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`cd-panel ${className}`.trim()}>
      <header className="cd-panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div className="cd-panel-action">{action}</div> : null}
      </header>
      <div className="cd-panel-body">{children}</div>
    </section>
  );
}
