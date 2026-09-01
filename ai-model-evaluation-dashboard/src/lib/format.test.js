import { describe, expect, it } from 'vitest';
import {
  formatAge,
  formatCompact,
  formatDate,
  formatDateTime,
  formatDuration,
  formatNumber,
  formatPercent,
  formatScore,
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
    expect(formatScore(undefined)).toBe('—');
  });

  it('formats percentages with a configurable precision', () => {
    expect(formatPercent(78)).toBe('78.0%');
    expect(formatPercent(96.42, 1)).toBe('96.4%');
    expect(formatPercent(12.345, 2)).toBe('12.35%');
  });

  it('formats integers with grouping separators', () => {
    expect(formatNumber(312)).toBe('312');
    expect(formatNumber(1847)).toBe('1,847');
  });

  it('formats durations from minutes into compact units', () => {
    expect(formatDuration(0.5)).toBe('30s');
    expect(formatDuration(12)).toBe('12m');
    expect(formatDuration(90)).toBe('1h 30m');
    expect(formatDuration(120)).toBe('2h');
    expect(formatAge(8)).toBe('8m');
  });

  it('formats compact counts', () => {
    expect(formatCompact(1847)).toMatch(/1\.8/i);
  });

  it('formats a score to one decimal by default', () => {
    expect(formatScore(94.6)).toBe('94.6');
    expect(formatScore(91, 1)).toBe('91.0');
  });

  it('formats a valid timestamp without throwing', () => {
    const stamp = '2026-08-29T16:30:00.000Z';
    expect(formatDateTime(stamp)).not.toBe('—');
    expect(formatDate(stamp)).toMatch(/2026/);
    expect(formatTime(stamp).length).toBeGreaterThan(3);
  });

  it('filters ISO values against an inclusive date range', () => {
    const stamp = '2026-08-29T16:00:00.000Z';
    expect(inDateRange(stamp, '2026-08-29', '2026-08-29')).toBe(true);
    expect(inDateRange(stamp, '2026-08-30', '2026-08-31')).toBe(false);
    expect(inDateRange('', '2026-08-29', '2026-08-29')).toBe(false);
  });
});
