import { describe, expect, it } from 'vitest';
import {
  formatCompact,
  formatConfidence,
  formatDateTime,
  formatLatency,
  formatNumber,
  formatPercent,
  formatScore,
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

  it('formats percents, numbers, and compact counts', () => {
    expect(formatPercent(71)).toBe('71.0%');
    expect(formatPercent(null)).toBe('—');
    expect(formatNumber(1820000)).toBe('1,820,000');
    expect(formatCompact(1820000)).toMatch(/1\.82\s*M/i);
  });

  it('formats latency, scores, and confidence', () => {
    expect(formatLatency(38)).toBe('38ms');
    expect(formatLatency(1500)).toBe('1.50s');
    expect(formatScore(0.841)).toBe('0.841');
    expect(formatConfidence(0.912)).toBe('91.2%');
    expect(formatConfidence(88)).toBe('88.0%');
  });

  it('filters ISO dates to an inclusive day range', () => {
    expect(inDateRange('2026-08-24T18:42:00.000Z', '2026-08-24', '2026-08-24')).toBe(true);
    expect(inDateRange('2026-08-20T12:00:00.000Z', '2026-08-24', '2026-08-24')).toBe(false);
    expect(inDateRange('', '2026-08-24', '2026-08-24')).toBe(false);
  });
});
