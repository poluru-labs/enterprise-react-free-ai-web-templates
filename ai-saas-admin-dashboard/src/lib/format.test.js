import { describe, expect, it } from 'vitest';
import {
  formatAge,
  formatCompact,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatDuration,
  formatNumber,
  formatPercent,
  formatTime,
  inDateRange,
} from './format.js';

describe('format helpers', () => {
  it('returns an em dash for empty or invalid values', () => {
    expect(formatDateTime()).toBe('—');
    expect(formatDate(null)).toBe('—');
    expect(formatTime('not-a-date')).toBe('—');
    expect(formatDuration(undefined)).toBe('—');
    expect(formatPercent(NaN)).toBe('—');
    expect(formatNumber(null)).toBe('—');
    expect(formatCompact('x')).toBe('—');
    expect(formatCurrency(undefined)).toBe('—');
  });

  it('formats percentages with a configurable precision', () => {
    expect(formatPercent(1.8)).toBe('1.8%');
    expect(formatPercent(96.42, 1)).toBe('96.4%');
    expect(formatPercent(12.345, 2)).toBe('12.35%');
  });

  it('formats integers with grouping separators', () => {
    expect(formatNumber(42)).toBe('42');
    expect(formatNumber(2418)).toBe('2,418');
  });

  it('formats durations from minutes into compact units', () => {
    expect(formatDuration(0.5)).toBe('30s');
    expect(formatDuration(12)).toBe('12m');
    expect(formatDuration(90)).toBe('1h 30m');
    expect(formatDuration(120)).toBe('2h');
    expect(formatAge(8)).toBe('8m');
  });

  it('formats compact counts and currency', () => {
    expect(formatCompact(184200)).toMatch(/184/i);
    expect(formatCurrency(184200)).toBe('$184,200');
  });

  it('formats a valid timestamp without throwing', () => {
    const stamp = '2026-08-28T16:42:00.000Z';
    expect(formatDateTime(stamp)).not.toBe('—');
    expect(formatDate(stamp)).toMatch(/2026/);
    expect(formatTime(stamp).length).toBeGreaterThan(3);
  });

  it('filters ISO values against an inclusive date range', () => {
    const stamp = '2026-08-28T18:00:00.000Z';
    expect(inDateRange(stamp, '2026-08-28', '2026-08-28')).toBe(true);
    expect(inDateRange(stamp, '2026-08-29', '2026-08-30')).toBe(false);
    expect(inDateRange('', '2026-08-28', '2026-08-28')).toBe(false);
  });
});
