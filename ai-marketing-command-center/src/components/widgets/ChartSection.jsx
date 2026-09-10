export function ChartSection({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`mq-panel ${className}`.trim()}>
      <header className="mq-panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div className="mq-panel-action">{action}</div> : null}
      </header>
      <div className="mq-panel-body">{children}</div>
    </section>
  );
}
