export function ChartSection({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`prism-panel ${className}`.trim()}>
      <header className="prism-panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div className="prism-panel-action">{action}</div> : null}
      </header>
      <div className="prism-panel-body">{children}</div>
    </section>
  );
}
