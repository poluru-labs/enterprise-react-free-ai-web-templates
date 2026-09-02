export function ChartSection({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`pmt-panel ${className}`.trim()}>
      <header className="pmt-panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div className="pmt-panel-action">{action}</div> : null}
      </header>
      <div className="pmt-panel-body">{children}</div>
    </section>
  );
}
