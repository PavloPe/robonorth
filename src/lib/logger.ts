// ============================================================================
// RoboNorth.ca — Structured Logging Utility
// ============================================================================

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  service: string;
  message: string;
  [key: string]: unknown;
}

function createLogEntry(
  level: LogLevel,
  service: string,
  message: string,
  meta?: Record<string, unknown>
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    service,
    message,
    ...meta,
  };
}

function log(level: LogLevel, service: string, message: string, meta?: Record<string, unknown>) {
  const entry = createLogEntry(level, service, message, meta);
  const json = JSON.stringify(entry);

  switch (level) {
    case 'error':
      console.error(json);
      break;
    case 'warn':
      console.warn(json);
      break;
    case 'debug':
      if (process.env.NODE_ENV !== 'production') {
        console.debug(json);
      }
      break;
    default:
      console.log(json);
  }
}

export function createLogger(service: string) {
  return {
    debug: (message: string, meta?: Record<string, unknown>) => log('debug', service, message, meta),
    info: (message: string, meta?: Record<string, unknown>) => log('info', service, message, meta),
    warn: (message: string, meta?: Record<string, unknown>) => log('warn', service, message, meta),
    error: (message: string, meta?: Record<string, unknown>) => log('error', service, message, meta),
  };
}

export default createLogger;
