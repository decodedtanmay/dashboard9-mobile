import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const LOG_FILE_PATH = FileSystem.documentDirectory + 'app_errors.log';

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'fatal';
  message: string;
  stack?: string;
}

// Function to append logs to a local file
export async function writeLog(level: 'info' | 'warn' | 'error' | 'fatal', message: string, stack?: string) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    stack,
  };

  const logString = JSON.stringify(entry) + '\n';
  console.log(`[${level.toUpperCase()}] ${message}`, stack || '');

  try {
    const fileInfo = await FileSystem.getInfoAsync(LOG_FILE_PATH);
    if (!fileInfo.exists) {
      await FileSystem.writeAsStringAsync(LOG_FILE_PATH, logString);
    } else {
      const existingContent = await FileSystem.readAsStringAsync(LOG_FILE_PATH);
      await FileSystem.writeAsStringAsync(LOG_FILE_PATH, existingContent + logString);
    }
  } catch (err) {
    console.error('Failed to write log to file:', err);
  }
}

// Read all accumulated logs
export async function readLogs(): Promise<LogEntry[]> {
  try {
    const fileInfo = await FileSystem.getInfoAsync(LOG_FILE_PATH);
    if (!fileInfo.exists) return [];
    
    const content = await FileSystem.readAsStringAsync(LOG_FILE_PATH);
    return content
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => JSON.parse(line) as LogEntry);
  } catch (err) {
    console.error('Failed to read logs:', err);
    return [];
  }
}

// Clear logs
export async function clearLogs() {
  try {
    await FileSystem.deleteAsync(LOG_FILE_PATH, { idempotent: true });
  } catch (err) {
    console.error('Failed to clear logs:', err);
  }
}

// Share logs via native share sheet
export async function shareLogs() {
  try {
    const fileInfo = await FileSystem.getInfoAsync(LOG_FILE_PATH);
    if (!fileInfo.exists) {
      console.log('No log file to share');
      return;
    }
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(LOG_FILE_PATH);
    } else {
      console.log('Sharing is not available on this platform');
    }
  } catch (err) {
    console.error('Failed to share logs:', err);
  }
}

// Set up global error tracking
export function initGlobalErrorTracking() {
  // Catch JS errors
  const originalErrorHandler = global.ErrorUtils?.getGlobalHandler();
  if (global.ErrorUtils) {
    global.ErrorUtils.setGlobalHandler(async (error: any, isFatal?: boolean) => {
      await writeLog(
        isFatal ? 'fatal' : 'error',
        error instanceof Error ? error.message : String(error),
        error instanceof Error ? error.stack : undefined
      );
      if (originalErrorHandler) {
        originalErrorHandler(error, isFatal);
      }
    });
  }

  // Catch promise rejections
  const tracking = require('promise/setimmediate/rejection-tracking');
  tracking.enable({
    allRejections: true,
    onUnhandled: (id: any, error: any) => {
      writeLog(
        'error',
        `Unhandled Promise Rejection: ${error instanceof Error ? error.message : String(error)}`,
        error instanceof Error ? error.stack : undefined
      );
    },
  });
}
