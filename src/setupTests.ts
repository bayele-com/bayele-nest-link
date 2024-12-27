/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';
import type {} from '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(...classNames: string[]): R;
      toHaveAttribute(attr: string, value?: string): R;
    }
  }
}