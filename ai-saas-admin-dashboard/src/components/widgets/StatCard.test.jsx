import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard.jsx';

describe('StatCard', () => {
  it('renders the label and value', () => {
    render(<StatCard label="Monthly recurring revenue" value="$184.2K" hint="vs $171.4K last period" />);
    expect(screen.getByText('Monthly recurring revenue')).toBeInTheDocument();
    expect(screen.getByText('$184.2K')).toBeInTheDocument();
    expect(screen.getByText('vs $171.4K last period')).toBeInTheDocument();
  });

  it('shows an upward trend', () => {
    render(<StatCard label="Active tenants" value="42" trend="up" trendValue="+3" />);
    expect(screen.getByText('+3')).toBeInTheDocument();
    expect(document.querySelector('.nx-stat-trend.is-up')).toBeTruthy();
  });

  it('shows a downward trend', () => {
    render(<StatCard label="Logo churn" value="1.8%" trend="down" trendValue="-0.3 pts" />);
    expect(screen.getByText('-0.3 pts')).toBeInTheDocument();
    expect(document.querySelector('.nx-stat-trend.is-down')).toBeTruthy();
  });

  it('renders a sparkline when values are provided', () => {
    render(<StatCard label="Failed invoices" value="4" sparkline={[7, 6, 5, 4]} />);
    expect(screen.getByTestId('sparkline')).toBeInTheDocument();
  });
});
