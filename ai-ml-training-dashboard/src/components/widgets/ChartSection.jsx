export function ChartSection({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`kiln-panel ${className}`.trim()}>
      <header className="kiln-panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div className="kiln-panel-action">{action}</div> : null}
      </header>
      <div className="kiln-panel-body">{children}</div>
    </section>
  );
}
