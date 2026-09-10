export function normalizeQuery(query) {
  return String(query ?? '').trim().toLowerCase();
}

export function matchesQuery(text, query) {
  const needle = normalizeQuery(query);
  if (!needle) return true;
  return String(text ?? '').toLowerCase().includes(needle);
}

export function recordHaystack(record, fields) {
  if (!record || typeof record !== 'object') return '';
  const keys = Array.isArray(fields) && fields.length ? fields : Object.keys(record);
  return keys
    .map((key) => {
      const value = record[key];
      if (value == null) return '';
      if (typeof value === 'object') return JSON.stringify(value);
      return String(value);
    })
    .join(' ');
}

export function searchRecords(records = [], query, fields) {
  const needle = normalizeQuery(query);
  if (!needle) return records;
  return records.filter((record) => matchesQuery(recordHaystack(record, fields), needle));
}

export function searchGroups(groups, query) {
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
