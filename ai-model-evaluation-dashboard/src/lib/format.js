const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
});

function toDate(value) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

export function formatDateTime(value) {
  const date = toDate(value);
  return date ? dateTimeFormatter.format(date) : '—';
}

export function formatDate(value) {
  const date = toDate(value);
  return date ? dateFormatter.format(date) : '—';
}

export function formatTime(value) {
  const date = toDate(value);
  return date ? timeFormatter.format(date) : '—';
}

export function formatDuration(minutes) {
  if (minutes == null || Number.isNaN(Number(minutes))) return '—';
  const total = Number(minutes);
  if (total < 1) return `${Math.round(total * 60)}s`;
  if (total < 60) return `${Math.round(total)}m`;
  const hours = Math.floor(total / 60);
  const mins = Math.round(total % 60);
  return mins ? `${hours}h ${mins}m` : `${hours}h`;
}

export function formatPercent(value, digits = 1) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return `${Number(value).toFixed(digits)}%`;
}

export function formatNumber(value) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return Number(value).toLocaleString('en-US');
}

export function formatCompact(value) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return Number(value).toLocaleString('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  });
}

export function formatAge(minutes) {
  return formatDuration(minutes);
}

export function formatScore(value, digits = 1) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return Number(value).toFixed(digits);
}

export function inDateRange(iso, start, end) {
  const date = toDate(iso);
  if (!date) return false;
  const time = date.getTime();
  if (start) {
    const startTime = new Date(`${start}T00:00:00`).getTime();
    if (time < startTime) return false;
  }
  if (end) {
    const endTime = new Date(`${end}T23:59:59`).getTime();
    if (time > endTime) return false;
  }
  return true;
}
