import type { ReactNode } from 'react';
import { Button } from '@poluru-labs/enterprise-design-system-react';

type FilterBarProps = {
  children?: ReactNode;
  onReset?: () => void;
  search?: ReactNode;
};

export function FilterBar({ children, onReset, search }: FilterBarProps) {
  return (
    <div className="dc-filter-bar">
      {search ? <div className="dc-filter-search">{search}</div> : null}
      <div className="dc-filter-fields">{children}</div>
      {onReset ? (
        <Button variant="tertiary" size="sm" onClick={onReset}>
          Reset
        </Button>
      ) : null}
    </div>
  );
}
