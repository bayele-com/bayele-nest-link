import { logInfo } from "./error-logging";

interface PageViewEvent {
  path: string;
  title: string;
}

interface UserEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export const trackPageView = ({ path, title }: PageViewEvent) => {
  logInfo('Page View', { path, title });
  
  // Send to analytics service in production
  if (import.meta.env.PROD) {
    // Initialize your preferred analytics service here
    // Example: Google Analytics, Mixpanel, etc.
  }
};

export const trackEvent = ({ category, action, label, value }: UserEvent) => {
  logInfo('User Event', { category, action, label, value });
  
  // Send to analytics service in production
  if (import.meta.env.PROD) {
    // Initialize your preferred analytics service here
  }
};