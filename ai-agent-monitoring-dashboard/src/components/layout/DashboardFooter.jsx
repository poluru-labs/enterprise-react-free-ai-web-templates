import { Link } from '@poluru-labs/enterprise-design-system-react';

export function DashboardFooter() {
  return (
    <footer className="amd-footer">
      <span>
        Created by Subrahmanyam Poluru (<Link href="https://polurus.com" target="_blank" rel="noopener noreferrer">polurus.com</Link>)
      </span>
      <span>
        Built with{' '}
        <Link
          href="https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          @poluru-labs/enterprise-design-system-react
        </Link>
      </span>
    </footer>
  );
}
