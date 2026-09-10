export function PageHeader({ eyebrow, title, subtitle, actions = null }) {
  return (
    <div className="syn-page-header">
      <div>
        {eyebrow && (
          <div className="syn-page-eyebrow">
            <i className="bi bi-shield-check" aria-hidden="true" />
            <span>{eyebrow}</span>
          </div>
        )}
        <h1 className="syn-page-title">{title}</h1>
        {subtitle && <p className="syn-page-subtitle">{subtitle}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>{actions}</div>}
    </div>
  );
}
