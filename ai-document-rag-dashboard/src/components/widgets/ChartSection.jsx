export function ChartSection({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`rag-panel ${className}`.trim()}>
      <header className="rag-panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div className="rag-panel-action">{action}</div> : null}
      </header>
      <div className="rag-panel-body">{children}</div>
    </section>
  );
}
