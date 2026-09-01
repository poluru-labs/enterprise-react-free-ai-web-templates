import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard.jsx';

describe('StatCard', () => {
  it('renders the label and value', () => {
    render(<StatCard label="Total requests" value="111.2K" hint="vs 98.9K last period" />);
    expect(screen.getByText('Total requests')).toBeInTheDocument();
    expect(screen.getByText('111.2K')).toBeInTheDocument();
    expect(screen.getByText('vs 98.9K last period')).toBeInTheDocument();
  });

  it('shows an upward trend', () => {
    render(<StatCard label="Success rate" value="98.7%" trend="up" trendValue="+0.6%" />);
    expect(screen.getByText('+0.6%')).toBeInTheDocument();
    expect(document.querySelector('.llm-stat-trend.is-up')).toBeTruthy();
  });

  it('shows a downward trend', () => {
    render(<StatCard label="p95 latency" value="684ms" trend="down" trendValue="-8.1%" />);
    expect(screen.getByText('-8.1%')).toBeInTheDocument();
    expect(document.querySelector('.llm-stat-trend.is-down')).toBeTruthy();
  });

  it('renders a sparkline when values are provided', () => {
    render(<StatCard label="Error rate" value="0.3%" sparkline={[0.5, 0.4, 0.4, 0.3]} />);
    expect(screen.getByTestId('sparkline')).toBeInTheDocument();
  });
});
