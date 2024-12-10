import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import AdminLayout from '../AdminLayout';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import '@testing-library/jest-dom';

// Mock dependencies
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
    })),
    auth: {
      getUser: vi.fn(),
      signOut: vi.fn(),
    },
  },
}));

describe('AdminLayout', () => {
  const renderAdminLayout = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <AdminLayout />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders admin layout for admin users', async () => {
    const mockGetProfile = vi.fn().mockResolvedValue({ 
      data: { role: 'admin' }, 
      error: null 
    });

    vi.mocked(supabase.from).mockImplementation(() => ({
      select: () => ({
        eq: () => ({
          single: mockGetProfile,
        }),
      }),
    }));

    renderAdminLayout();

    await waitFor(() => {
      expect(screen.getByText(/bayele admin/i)).toBeInTheDocument();
    });
  });

  it('redirects non-admin users', async () => {
    const mockGetProfile = vi.fn().mockResolvedValue({ 
      data: { role: 'user' }, 
      error: null 
    });

    vi.mocked(supabase.from).mockImplementation(() => ({
      select: () => ({
        eq: () => ({
          single: mockGetProfile,
        }),
      }),
    }));

    renderAdminLayout();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("You don't have permission to access this area");
    });
  });

  it('handles profile fetch error', async () => {
    const mockGetProfile = vi.fn().mockResolvedValue({ 
      data: null, 
      error: new Error('Failed to fetch profile') 
    });

    vi.mocked(supabase.from).mockImplementation(() => ({
      select: () => ({
        eq: () => ({
          single: mockGetProfile,
        }),
      }),
    }));

    renderAdminLayout();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error checking admin access');
    });
  });
});