import { Divider, Link } from '@poluru-labs/enterprise-design-system-react';

const NPM_PKG = 'https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="qla-footer">
      <div className="qla-footer-inner">
        <div className="qla-footer-brand">
          <span className="qla-mark" aria-hidden="true" />
          <strong>QueryLens</strong>
        </div>
        <p className="qla-footer-tagline">
          AI search analytics for teams who need clarity on queries, clicks, and generative answers.
        </p>
        <Divider label="Attribution" spacing="md" />
        <p className="qla-footer-meta">
          Created by{' '}
          <Link href="https://polurus.com" target="_blank" rel="noopener noreferrer" external>
            Subrahmanyam Poluru
          </Link>
        </p>
        <p className="qla-footer-meta">
          Built with{' '}
          <Link href={NPM_PKG} target="_blank" rel="noopener noreferrer" external>
            @poluru-labs/enterprise-design-system-react
          </Link>
        </p>
        <p className="qla-footer-copy">&copy; {year} QueryLens demo. All metrics are sample data.</p>
      </div>
    </footer>
  );
}
