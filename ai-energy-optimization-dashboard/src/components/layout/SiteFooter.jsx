import { Link as EdsLink } from '@poluru-labs/enterprise-design-system-react';

export function SiteFooter() {
  return (
    <footer className="eod-footer">
      <p>
        Created by{' '}
        <EdsLink href="https://polurus.com" external>
          Subrahmanyam Poluru
        </EdsLink>
      </p>
      <p>
        Built with{' '}
        <EdsLink
          href="https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react"
          external
        >
          @poluru-labs/enterprise-design-system-react
        </EdsLink>
      </p>
    </footer>
  );
}
