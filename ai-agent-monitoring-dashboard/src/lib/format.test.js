import { describe, expect, it } from 'vitest';
import {
  formatCurrency,
  formatDateTime,
  formatDuration,
  formatLatency,
  formatNumber,
  formatPercent,
  inDateRange,
} from './format.js';

describe('format helpers', () => {
  it('returns an em dash for empty or invalid dates', () => {
    expect(formatDateTime('')).toBe('—');
    expect(formatDateTime('not-a-date')).toBe('—');
  });

  it('formats a valid timestamp without falling back', () => {
    expect(formatDateTime('2026-08-24T18:42:00.000Z')).not.toBe('—');
  });

  it('formats percents, currency, and numbers', () => {
    expect(formatPercent(89.3)).toBe('89.3%');
    expect(formatPercent(null)).toBe('—');
    expect(formatNumber(1284)).toBe('1,284');
    expect(formatCurrency(741.1, 0)).toBe('$741');
    expect(formatCurrency(0.58, 2)).toBe('$0.58');
  });

  it('formats duration and latency', () => {
    expect(formatDuration(18)).toBe('18m');
    expect(formatDuration(75)).toBe('1h 15m');
    expect(formatLatency(38)).toBe('38 ms');
    expect(formatLatency(1840)).toBe('1.84 s');
  });

  it('filters ISO dates to an inclusive day range', () => {
    expect(inDateRange('2026-08-24T18:42:00.000Z', '2026-08-24', '2026-08-24')).toBe(true);
    expect(inDateRange('2026-08-20T12:00:00.000Z', '2026-08-24', '2026-08-24')).toBe(false);
    expect(inDateRange('', '2026-08-24', '2026-08-24')).toBe(false);
  });
});
