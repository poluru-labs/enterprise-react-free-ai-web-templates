import { Link } from 'react-router-dom';

export function PageHeader({ title, description, crumbs = [], actions }) {
  return (
    <header className="hil-page-header">
      {crumbs.length > 0 && (
        <nav className="hil-breadcrumb" aria-label="Breadcrumb">
          {crumbs.map((crumb, index) => {
            const last = index === crumbs.length - 1;
            return (
              <span key={`${crumb.label}-${index}`}>
                {index > 0 ? <span className="hil-crumb-sep">/</span> : null}
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
      <div className="hil-page-header-row">
        <div>
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>
        {actions ? <div className="hil-page-actions">{actions}</div> : null}
      </div>
    </header>
  );
}
