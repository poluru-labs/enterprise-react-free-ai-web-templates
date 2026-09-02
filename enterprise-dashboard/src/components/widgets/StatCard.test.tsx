import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders the label and value', () => {
    render(<StatCard label="Fleet PUE" value="1.26" hint="Better than last month" />);
    expect(screen.getByText('Fleet PUE')).toBeInTheDocument();
    expect(screen.getByText('1.26')).toBeInTheDocument();
    expect(screen.getByText('Better than last month')).toBeInTheDocument();
  });

  it('shows an upward trend', () => {
    render(<StatCard label="Rack utilization" value="76%" trend="up" trendValue="+1.8%" />);
    expect(screen.getByText('+1.8%')).toBeInTheDocument();
    expect(document.querySelector('.dc-stat-trend.is-up')).toBeTruthy();
  });

  it('shows a downward trend', () => {
    render(<StatCard label="Open alerts" value="6" trend="down" trendValue="-2" />);
    expect(screen.getByText('-2')).toBeInTheDocument();
    expect(document.querySelector('.dc-stat-trend.is-down')).toBeTruthy();
  });

  it('renders a sparkline when values are provided', () => {
    render(<StatCard label="Cooling load" value="71%" sparkline={[68, 70, 72, 69]} />);
    expect(screen.getByTestId('sparkline')).toBeInTheDocument();
  });
});
