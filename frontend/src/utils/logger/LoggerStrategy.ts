export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LoggerStrategy {
    log(level: LogLevel, message: string, ...args: unknown[]): void;
}
