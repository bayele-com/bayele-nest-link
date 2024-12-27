import * as Sentry from "@sentry/react";

export const logError = (error: Error, context?: Record<string, any>) => {
  console.error("Error:", error.message, "\nContext:", context);
  
  if (import.meta.env.PROD) {
    Sentry.captureException(error, {
      extra: context,
    });
  }
};

export const logWarning = (message: string, context?: Record<string, any>) => {
  console.warn("Warning:", message, "\nContext:", context);
  
  if (import.meta.env.PROD) {
    Sentry.captureMessage(message, {
      level: "warning",
      extra: context,
    });
  }
};

export const logInfo = (message: string, context?: Record<string, any>) => {
  console.info("Info:", message, "\nContext:", context);
  
  if (import.meta.env.PROD) {
    Sentry.captureMessage(message, {
      level: "info",
      extra: context,
    });
  }
};