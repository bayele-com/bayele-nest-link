const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

class RateLimiter {
  private requests: { [key: string]: number[] } = {};

  isRateLimited(actionKey: string): boolean {
    const now = Date.now();
    if (!this.requests[actionKey]) {
      this.requests[actionKey] = [];
    }

    // Remove old requests outside the window
    this.requests[actionKey] = this.requests[actionKey].filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
    );

    // Check if we're over the limit
    if (this.requests[actionKey].length >= MAX_REQUESTS) {
      return true;
    }

    // Add new request
    this.requests[actionKey].push(now);
    return false;
  }

  getRemainingAttempts(actionKey: string): number {
    if (!this.requests[actionKey]) return MAX_REQUESTS;
    return Math.max(0, MAX_REQUESTS - this.requests[actionKey].length);
  }

  getTimeUntilReset(actionKey: string): number {
    if (!this.requests[actionKey] || this.requests[actionKey].length === 0) {
      return 0;
    }
    const oldestRequest = Math.min(...this.requests[actionKey]);
    return Math.max(0, RATE_LIMIT_WINDOW - (Date.now() - oldestRequest));
  }
}

export const rateLimiter = new RateLimiter();