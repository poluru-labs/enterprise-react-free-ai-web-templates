export function ChartSection({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`llm-panel ${className}`.trim()}>
      <header className="llm-panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div className="llm-panel-action">{action}</div> : null}
      </header>
      <div className="llm-panel-body">{children}</div>
    </section>
  );
}
