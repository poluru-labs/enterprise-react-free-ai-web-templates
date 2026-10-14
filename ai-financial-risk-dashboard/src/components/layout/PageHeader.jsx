import { Link } from 'react-router-dom';

export function PageHeader({ title, description, crumbs = [], actions }) {
  return (
    <header className="frd-page-header">
      {crumbs.length > 0 && (
        <nav className="frd-breadcrumb" aria-label="Breadcrumb">
          {crumbs.map((crumb, index) => {
            const last = index === crumbs.length - 1;
            return (
              <span key={`${crumb.label}-${index}`}>
                {index > 0 ? <span className="frd-crumb-sep">/</span> : null}
                {last || !crumb.to ? (
                  <span aria-current="page">{crumb.label}</span>
                ) : (
                  <Link to={crumb.to}>{crumb.label}</Link>
                )}
              </span>
            );
          })}
        </nav>
      )}
      <div className="frd-page-header-row">
        <div>
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>
        {actions ? <div className="frd-page-actions">{actions}</div> : null}
      </div>
    </header>
  );
}
