import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, vi, expect } from 'vitest';
import PropertyCard from './PropertyCard';

describe('PropertyCard', () => {
  const mockProperty = {
    id: '1',
    title: 'Test Property',
    location: 'Test Location',
    price: '100000',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    image: '/test-image.jpg',
    status: 'available',
    amenities: ['wifi', 'parking'],
    whatsapp: '123456789',
    phone: '987654321'
  };

  const renderCard = () => {
    return render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} />
      </BrowserRouter>
    );
  };

  it('renders property details correctly', () => {
    renderCard();
    expect(screen.getByText(mockProperty.title)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.location)).toBeInTheDocument();
    expect(screen.getByText(`${mockProperty.bedrooms} bed`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProperty.bathrooms} bath`)).toBeInTheDocument();
  });

  it('handles image loading errors', () => {
    renderCard();
    const image = screen.getByAltText(mockProperty.title);
    fireEvent.error(image);
    expect(image.getAttribute('src')).toBe('/placeholder.svg');
  });

  it('opens WhatsApp when clicking WhatsApp button', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    renderCard();
    const whatsappButton = screen.getByLabelText(/whatsapp/i);
    fireEvent.click(whatsappButton);
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining(`https://wa.me/${mockProperty.whatsapp}`),
      '_blank'
    );
  });

  it('initiates call when clicking phone button', () => {
    const hrefSpy = vi.spyOn(window.location, 'href', 'set');
    renderCard();
    const callButton = screen.getByLabelText(/call/i);
    fireEvent.click(callButton);
    expect(hrefSpy).toHaveBeenCalledWith(`tel:${mockProperty.phone}`);
  });
});