/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { afterEach } from 'vitest';

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});
