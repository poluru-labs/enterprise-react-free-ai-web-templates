import { describe, expect, it } from 'vitest';
import { severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps pipeline statuses to design-system tones', () => {
    expect(statusTone('Live')).toBe('success');
    expect(statusTone('Sending')).toBe('success');
    expect(statusTone('Running')).toBe('success');
    expect(statusTone('Healthy')).toBe('success');
    expect(statusTone('Passing')).toBe('success');
    expect(statusTone('Delayed')).toBe('warning');
    expect(statusTone('Watch')).toBe('warning');
    expect(statusTone('Failed')).toBe('danger');
    expect(statusTone('Failing')).toBe('danger');
    expect(statusTone('Paused')).toBe('neutral');
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
    expect(severityTone('failing')).toBe('danger');
    expect(severityTone('delayed')).toBe('warning');
    expect(severityTone('ok')).toBe('info');
    expect(severityTone('passing')).toBe('success');
    expect(severityTone('')).toBe('neutral');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('watch')).toBe('warning');
    expect(slaTone('delayed')).toBe('warning');
    expect(slaTone('failed')).toBe('danger');
  });
});
