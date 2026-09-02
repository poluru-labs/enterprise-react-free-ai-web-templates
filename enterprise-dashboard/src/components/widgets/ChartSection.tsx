import type { ReactNode } from 'react';

type ChartSectionProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function ChartSection({ title, subtitle, action, children, className = '' }: ChartSectionProps) {
  return (
    <section className={`dc-panel ${className}`.trim()}>
      <header className="dc-panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div className="dc-panel-action">{action}</div> : null}
      </header>
      <div className="dc-panel-body">{children}</div>
    </section>
  );
}
