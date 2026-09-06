import { describe, expect, it } from 'vitest';
import { severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps LLM ops statuses to design-system tones', () => {
    expect(statusTone('Production')).toBe('success');
    expect(statusTone('Review')).toBe('warning');
    expect(statusTone('Passed')).toBe('success');
    expect(statusTone('ok')).toBe('success');
    expect(statusTone('warn')).toBe('warning');
    expect(statusTone('error')).toBe('danger');
    expect(statusTone('Watch')).toBe('warning');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('needs_review')).toBe('Needs Review');
    expect(statusLabel('ok')).toBe('Ok');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('error')).toBe('danger');
    expect(severityTone('watch')).toBe('warning');
    expect(severityTone('warn')).toBe('warning');
    expect(severityTone('ok')).toBe('info');
    expect(severityTone('resolved')).toBe('success');
    expect(severityTone('')).toBe('neutral');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('warn')).toBe('warning');
    expect(slaTone('watch')).toBe('warning');
    expect(slaTone('error')).toBe('danger');
  });
});
