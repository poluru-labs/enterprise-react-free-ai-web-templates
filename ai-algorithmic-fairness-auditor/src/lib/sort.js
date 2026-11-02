export function sortRows(rows, sort) {
  if (!sort?.key) return rows;
  const next = [...rows].sort((a, b) => {
    const left = a[sort.key];
    const right = b[sort.key];
    if (typeof left === 'number' && typeof right === 'number') return left - right;
    return String(left).localeCompare(String(right), undefined, { numeric: true });
  });
  return sort.direction === 'desc' ? next.reverse() : next;
}
