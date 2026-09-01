import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard.jsx';

describe('StatCard', () => {
  it('renders the label and value', () => {
    render(<StatCard label="Active runs" value="18" hint="6 on A100 · 4 on H100" />);
    expect(screen.getByText('Active runs')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('6 on A100 · 4 on H100')).toBeInTheDocument();
  });

  it('shows an upward trend', () => {
    render(<StatCard label="Val accuracy" value="94.2%" trend="up" trendValue="+1.1 pts" />);
    expect(screen.getByText('+1.1 pts')).toBeInTheDocument();
    expect(document.querySelector('.kiln-stat-trend.is-up')).toBeTruthy();
  });

  it('shows a downward trend', () => {
    render(<StatCard label="Queue wait" value="11m" trend="down" trendValue="-4m" />);
    expect(screen.getByText('-4m')).toBeInTheDocument();
    expect(document.querySelector('.kiln-stat-trend.is-down')).toBeTruthy();
  });

  it('renders a sparkline when values are provided', () => {
    render(<StatCard label="GPU utilization" value="86%" sparkline={[71, 74, 78, 86]} />);
    expect(screen.getByTestId('sparkline')).toBeInTheDocument();
  });
});
