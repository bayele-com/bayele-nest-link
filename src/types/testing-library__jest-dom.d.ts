/// <reference types="@testing-library/jest-dom" />

declare namespace jest {
  interface Matchers<R = void> {
    toBeInTheDocument(): R;
    toBeVisible(): R;
    toHaveTextContent(text: string | RegExp): R;
    toHaveClass(className: string): R;
    toHaveAttribute(attr: string, value?: string): R;
    toBeDisabled(): R;
    toBeEnabled(): R;
    toHaveValue(value: string | number | string[]): R;
    toBeChecked(): R;
    toBeEmpty(): R;
    toBeEmptyDOMElement(): R;
    toBePartiallyChecked(): R;
    toBeRequired(): R;
    toBeValid(): R;
    toBeInvalid(): R;
    toHaveAccessibleDescription(description?: string | RegExp): R;
    toHaveAccessibleName(name?: string | RegExp): R;
    toHaveFocus(): R;
    toHaveFormValues(values: { [key: string]: any }): R;
    toHaveStyle(css: { [key: string]: any }): R;
    toContainElement(element: HTMLElement | null): R;
    toContainHTML(html: string): R;
  }
}

export {};