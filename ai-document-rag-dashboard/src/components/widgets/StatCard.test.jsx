import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard.jsx';

describe('StatCard', () => {
  it('renders the label and value', () => {
    render(<StatCard label="Indexed documents" value="1,284" hint="from last month" />);
    expect(screen.getByText('Indexed documents')).toBeInTheDocument();
    expect(screen.getByText('1,284')).toBeInTheDocument();
    expect(screen.getByText('from last month')).toBeInTheDocument();
  });

  it('shows an upward trend', () => {
    render(<StatCard label="Queries this week" value="8,946" trend="up" trendValue="+18.2%" />);
    expect(screen.getByText('+18.2%')).toBeInTheDocument();
    expect(document.querySelector('.rag-stat-trend.is-up')).toBeTruthy();
  });

  it('shows a downward trend', () => {
    render(<StatCard label="Avg. response time" value="1.2s" trend="down" trendValue="0.3s faster" />);
    expect(screen.getByText('0.3s faster')).toBeInTheDocument();
    expect(document.querySelector('.rag-stat-trend.is-down')).toBeTruthy();
  });

  it('renders a sparkline when values are provided', () => {
    render(<StatCard label="Answer accuracy" value="94.8%" sparkline={[91, 93, 94, 95]} />);
    expect(screen.getByTestId('sparkline')).toBeInTheDocument();
  });
});
