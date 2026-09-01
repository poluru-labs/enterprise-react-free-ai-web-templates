import { describe, expect, it } from 'vitest';
import {
  formatAge,
  formatCompact,
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
  });

  it('formats percentages with a configurable precision', () => {
    expect(formatPercent(86)).toBe('86.0%');
    expect(formatPercent(94.21, 1)).toBe('94.2%');
    expect(formatPercent(12.345, 2)).toBe('12.35%');
  });

  it('formats integers with grouping separators', () => {
    expect(formatNumber(18)).toBe('18');
    expect(formatNumber(1847)).toBe('1,847');
  });

  it('formats durations from minutes into compact units', () => {
    expect(formatDuration(0.5)).toBe('30s');
    expect(formatDuration(11)).toBe('11m');
    expect(formatDuration(90)).toBe('1h 30m');
    expect(formatDuration(120)).toBe('2h');
    expect(formatAge(8)).toBe('8m');
  });

  it('formats compact counts', () => {
    expect(formatCompact(12400000)).toMatch(/12\.4/i);
  });

  it('formats a valid timestamp without throwing', () => {
    const stamp = '2026-08-28T22:00:00.000Z';
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
