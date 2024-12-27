import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { PropertyFilters } from './PropertyFilters';

describe('PropertyFilters', () => {
  const mockOnFilterChange = vi.fn();

  const renderFilters = () => {
    return render(<PropertyFilters onFilterChange={mockOnFilterChange} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all filter components', () => {
    renderFilters();
    expect(screen.getByPlaceholderText(/select a city/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/select property type/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/min price/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/max price/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/select bedrooms/i)).toBeInTheDocument();
  });

  it('calls onFilterChange when filters are updated', () => {
    renderFilters();
    const citySelect = screen.getByPlaceholderText(/select a city/i);
    fireEvent.change(citySelect, { target: { value: 'yaounde' } });
    
    expect(mockOnFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      city: 'yaounde'
    }));
  });

  it('validates price inputs', () => {
    renderFilters();
    const minPrice = screen.getByPlaceholderText(/min price/i);
    const maxPrice = screen.getByPlaceholderText(/max price/i);

    fireEvent.change(minPrice, { target: { value: '100000' } });
    fireEvent.change(maxPrice, { target: { value: '50000' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      minPrice: '100000',
      maxPrice: '50000'
    }));
  });

  it('handles search button click', () => {
    renderFilters();
    const searchButton = screen.getByRole('button', { name: /search properties/i });
    fireEvent.click(searchButton);
    expect(mockOnFilterChange).toHaveBeenCalled();
  });
});