import { describe, expect, it } from 'vitest';
import { severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps retrieval statuses to design-system tones', () => {
    expect(statusTone('Ready')).toBe('success');
    expect(statusTone('Indexing')).toBe('warning');
    expect(statusTone('Stale')).toBe('danger');
    expect(statusTone('Synced')).toBe('success');
    expect(statusTone('Needs review')).toBe('warning');
    expect(statusTone('Excellent')).toBe('success');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('needs_review')).toBe('Needs Review');
    expect(statusLabel('hash-match')).toBe('Hash Match');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('high')).toBe('danger');
    expect(severityTone('medium')).toBe('warning');
    expect(severityTone('low')).toBe('info');
    expect(severityTone('')).toBe('neutral');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('risk')).toBe('warning');
    expect(slaTone('at_risk')).toBe('warning');
    expect(slaTone('breach')).toBe('danger');
  });
});
