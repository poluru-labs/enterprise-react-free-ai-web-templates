import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard.jsx';

describe('StatCard', () => {
  it('renders the label and value', () => {
    render(<StatCard label="Open tickets" value="47" hint="12 waiting on customer" />);
    expect(screen.getByText('Open tickets')).toBeInTheDocument();
    expect(screen.getByText('47')).toBeInTheDocument();
    expect(screen.getByText('12 waiting on customer')).toBeInTheDocument();
  });

  it('shows an upward trend', () => {
    render(<StatCard label="CSAT" value="4.6" trend="up" trendValue="+0.2" />);
    expect(screen.getByText('+0.2')).toBeInTheDocument();
    expect(document.querySelector('.desk-stat-trend.is-up')).toBeTruthy();
  });

  it('shows a downward trend', () => {
    render(<StatCard label="First response" value="18m" trend="down" trendValue="-4m" />);
    expect(screen.getByText('-4m')).toBeInTheDocument();
    expect(document.querySelector('.desk-stat-trend.is-down')).toBeTruthy();
  });

  it('renders a sparkline when values are provided', () => {
    render(<StatCard label="AI deflection" value="41%" sparkline={[34, 36, 38, 41]} />);
    expect(screen.getByTestId('sparkline')).toBeInTheDocument();
  });
});
