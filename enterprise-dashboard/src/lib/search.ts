export function normalizeQuery(query?: string | null) {
  return String(query ?? '')
    .trim()
    .toLowerCase();
}

export function matchesQuery(text?: string | null, query?: string | null) {
  const needle = normalizeQuery(query);
  if (!needle) return true;
  return String(text ?? '')
    .toLowerCase()
    .includes(needle);
}

export function recordHaystack(record: unknown, fields?: string[]) {
  if (!record || typeof record !== 'object') return '';
  const source = record as Record<string, unknown>;
  const keys = Array.isArray(fields) && fields.length ? fields : Object.keys(source);
  return keys
    .map((key) => {
      const value = source[key];
      if (value == null) return '';
      if (typeof value === 'object') return JSON.stringify(value);
      return String(value);
    })
    .join(' ');
}

export function searchRecords<T>(records: T[] = [], query?: string | null, fields?: string[]) {
  const needle = normalizeQuery(query);
  if (!needle) return records;
  return records.filter((record) => matchesQuery(recordHaystack(record, fields), needle));
}

export type SearchGroup<T> = {
  group?: string;
  items: T[];
};

export function searchGroups<T extends { label?: string; hint?: string; group?: string }>(
  groups: SearchGroup<T>[],
  query?: string | null,
) {
  const needle = normalizeQuery(query);
  if (!needle) return groups;
  return groups
    .map((group) => ({
      ...group,
      items: (group.items || []).filter((item) =>
        matchesQuery(`${item.label || ''} ${item.hint || ''} ${item.group || ''}`, needle),
      ),
    }))
    .filter((group) => group.items.length > 0);
}
