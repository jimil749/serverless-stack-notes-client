import * as Sentry from '@sentry/browser';

const isLocal = process.env.NODE_ENV === "development";

export function initSentry() {
  if (isLocal) {
    return;
  }

  Sentry.init({dsn: "https://68986eede26e4574ae2ee3983826a25a@o408858.ingest.sentry.io/5280352"});
}

export function logError(error, errorInfo = null) {
  if (isLocal) {
    return;
  }

  Sentry.withScope((scope) => {
    errorInfo && scope.setExtras(errorInfo);
    Sentry.captureException(error);
  });
}

export function onError(error) {
  let errorInfo = {};
  let message = error.toString();

  //Auth error
  if (!(error instanceof Error) && error.message) {
    errorInfo = error;
    message = error.message;
    error = new Error(message);
    //API error
  } else if (error.config && error.config.url) {
    errorInfo.url = error.config.url;
  }

  logError(error, errorInfo);

  alert(message);
}
  