import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard.jsx';

describe('StatCard', () => {
  it('renders the label and value', () => {
    render(<StatCard label="Live prompts" value="128" hint="this week" />);
    expect(screen.getByText('Live prompts')).toBeInTheDocument();
    expect(screen.getByText('128')).toBeInTheDocument();
    expect(screen.getByText('this week')).toBeInTheDocument();
  });

  it('shows an upward trend', () => {
    render(<StatCard label="Eval pass rate" value="94.2%" trend="up" trendValue="+2.1%" />);
    expect(screen.getByText('+2.1%')).toBeInTheDocument();
    expect(document.querySelector('.pmt-stat-trend.is-up')).toBeTruthy();
  });

  it('shows a downward trend', () => {
    render(<StatCard label="Avg. latency" value="1.18s" trend="down" trendValue="-0.12s" />);
    expect(screen.getByText('-0.12s')).toBeInTheDocument();
    expect(document.querySelector('.pmt-stat-trend.is-down')).toBeTruthy();
  });

  it('renders a sparkline when values are provided', () => {
    render(<StatCard label="Error rate" value="0.3%" sparkline={[0.5, 0.4, 0.4, 0.3]} />);
    expect(screen.getByTestId('sparkline')).toBeInTheDocument();
  });
});
