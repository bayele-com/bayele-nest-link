import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import PropertyImageCarousel from './PropertyImageCarousel';

describe('PropertyImageCarousel', () => {
  const mockImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
  ];

  it('renders images correctly', () => {
    render(<PropertyImageCarousel images={mockImages} title="Test Property" />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockImages.length);
    expect(images[0]).toHaveAttribute('src', expect.stringContaining(mockImages[0]));
  });

  it('shows placeholder when no images are provided', () => {
    render(<PropertyImageCarousel images={[]} title="Test Property" />);
    expect(screen.getByText(/no images available/i)).toBeInTheDocument();
  });

  it('handles image loading errors', () => {
    render(<PropertyImageCarousel images={mockImages} title="Test Property" />);
    const firstImage = screen.getAllByRole('img')[0];
    fireEvent.error(firstImage);
    expect(firstImage).toHaveAttribute('src', '/placeholder.svg');
  });

  it('shows navigation buttons only when multiple images', () => {
    const { rerender } = render(
      <PropertyImageCarousel images={mockImages} title="Test Property" />
    );
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();

    // Test with single image
    rerender(
      <PropertyImageCarousel images={[mockImages[0]]} title="Test Property" />
    );
    expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
  });

  it('optimizes images with correct width parameter', () => {
    render(<PropertyImageCarousel images={mockImages} title="Test Property" />);
    const firstImage = screen.getAllByRole('img')[0];
    expect(firstImage).toHaveAttribute('src', expect.stringContaining('width=1200'));
  });
});