import type { LoggerStrategy, LogLevel } from './LoggerStrategy';

export class ConsoleLogger implements LoggerStrategy {
    log(level: LogLevel, message: string, ...args: unknown[]): void {
        const tag = `[${level.toUpperCase()}]`;

        switch (level) {
            case 'debug':
                import.meta.env.MODE === 'development' && console.debug(tag, message, ...args);
                break;
            case 'info':
                console.info(tag, message, ...args);
                break;
            case 'warn':
                console.warn(tag, message, ...args);
                break;
            case 'error':
                console.error(tag, message, ...args);
                break;
        }
    }
}
