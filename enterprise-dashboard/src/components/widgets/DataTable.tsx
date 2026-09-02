import { EmptyState } from '@poluru-labs/enterprise-design-system-react';
import type { ReactNode } from 'react';

type Column<T> = {
  key: keyof T & string;
  label: string;
  className?: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns?: Column<T>[];
  rows?: T[];
  rowKey?: keyof T & string;
  onRowClick?: (row: T) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  rowClassName?: (row: T) => string;
};

export function DataTable<T>({
  columns = [],
  rows = [],
  rowKey = 'id' as keyof T & string,
  onRowClick,
  emptyTitle = 'No records',
  emptyDescription = 'Try adjusting filters or wait for the next sync.',
  rowClassName,
}: DataTableProps<T>) {
  return (
    <div className="dc-table-wrap">
      {rows.length === 0 ? (
        <EmptyState heading={emptyTitle} description={emptyDescription} />
      ) : (
        <table className="dc-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={column.className}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const record = row as Record<string, unknown>;
              const key = String(record[rowKey] ?? JSON.stringify(row));
              const extraClass = typeof rowClassName === 'function' ? rowClassName(row) : '';
              return (
                <tr
                  key={key}
                  className={`${onRowClick ? 'is-clickable' : ''} ${extraClass || ''}`.trim()}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((column) => (
                    <td key={column.key} className={column.className} data-label={column.label}>
                      {column.render ? column.render(row[column.key], row) : ((record[column.key] as ReactNode) ?? '—')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
