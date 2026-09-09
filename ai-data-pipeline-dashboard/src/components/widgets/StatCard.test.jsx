import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard.jsx';

describe('StatCard', () => {
  it('renders the label and value', () => {
    render(<StatCard label="Rows ingested" value="18.4M" hint="last 24 hours" />);
    expect(screen.getByText('Rows ingested')).toBeInTheDocument();
    expect(screen.getByText('18.4M')).toBeInTheDocument();
    expect(screen.getByText('last 24 hours')).toBeInTheDocument();
  });

  it('shows an upward trend', () => {
    render(<StatCard label="Freshness SLA" value="96%" trend="up" trendValue="+2%" />);
    expect(screen.getByText('+2%')).toBeInTheDocument();
    expect(document.querySelector('.cd-stat-trend.is-up')).toBeTruthy();
  });

  it('shows a downward trend', () => {
    render(<StatCard label="Median lag" value="47s" trend="down" trendValue="-9s" />);
    expect(screen.getByText('-9s')).toBeInTheDocument();
    expect(document.querySelector('.cd-stat-trend.is-down')).toBeTruthy();
  });

  it('renders a sparkline when values are provided', () => {
    render(<StatCard label="Failing checks" value="2" sparkline={[0, 1, 1, 2]} />);
    expect(screen.getByTestId('sparkline')).toBeInTheDocument();
  });
});
