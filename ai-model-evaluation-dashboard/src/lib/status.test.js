import { describe, expect, it } from 'vitest';
import { severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps eval statuses to design-system tones', () => {
    expect(statusTone('Passed')).toBe('success');
    expect(statusTone('Needs review')).toBe('warning');
    expect(statusTone('Running')).toBe('info');
    expect(statusTone('Queued')).toBe('info');
    expect(statusTone('Failed')).toBe('danger');
    expect(statusTone('Live')).toBe('success');
    expect(statusTone('Watch')).toBe('warning');
    expect(statusTone('Pass')).toBe('success');
    expect(statusTone('Fail')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('needs_review')).toBe('Needs Review');
    expect(statusLabel('needs-review')).toBe('Needs Review');
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
