import * as Sentry from "@sentry/react";

export const initializeMonitoring = () => {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [],
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }
};

export const trackError = (error: Error, context?: Record<string, any>) => {
  console.error(error);
  if (import.meta.env.PROD) {
    Sentry.captureException(error, { extra: context });
  }
};

export const trackEvent = (eventName: string, data?: Record<string, any>) => {
  console.log(`Event: ${eventName}`, data);
  if (import.meta.env.PROD) {
    Sentry.captureMessage(eventName, {
      level: "info",
      extra: data,
    });
  }
};