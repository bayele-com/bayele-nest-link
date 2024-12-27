import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toBeVisible(): R;
      toHaveTextContent(text: string): R;
      toHaveAttribute(attr: string, value?: string): R;
    }
  }
}

export {};