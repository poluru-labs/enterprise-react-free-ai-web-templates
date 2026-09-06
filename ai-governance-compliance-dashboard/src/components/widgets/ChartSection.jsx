export function ChartSection({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`gov-panel ${className}`.trim()}>
      <header className="gov-panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div className="gov-panel-action">{action}</div> : null}
      </header>
      <div className="gov-panel-body">{children}</div>
    </section>
  );
}
