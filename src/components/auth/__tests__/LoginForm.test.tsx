import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import LoginForm from '../LoginForm';
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
    auth: {
      signInWithPassword: vi.fn(),
      getUser: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
    })),
  },
}));

describe('LoginForm', () => {
  const renderLoginForm = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form with all fields', () => {
    renderLoginForm();
    
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('displays validation errors for invalid inputs', async () => {
    renderLoginForm();
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('handles successful login for admin user', async () => {
    const mockSignIn = vi.fn().mockResolvedValue({ error: null });
    const mockGetUser = vi.fn().mockResolvedValue({ data: { user: { id: '123' } } });
    const mockGetProfile = vi.fn().mockResolvedValue({ 
      data: { role: 'admin' }, 
      error: null 
    });

    vi.mocked(supabase.auth.signInWithPassword).mockImplementation(mockSignIn);
    vi.mocked(supabase.auth.getUser).mockImplementation(mockGetUser);
    vi.mocked(supabase.from).mockImplementation(() => ({
      select: () => ({
        eq: () => ({
          single: mockGetProfile,
        }),
      }),
    }));

    renderLoginForm();

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Successfully logged in!');
    });
  });

  it('handles login error correctly', async () => {
    const mockSignIn = vi.fn().mockResolvedValue({ 
      error: new Error('Invalid credentials') 
    });

    vi.mocked(supabase.auth.signInWithPassword).mockImplementation(mockSignIn);

    renderLoginForm();

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid email or password');
    });
  });
});