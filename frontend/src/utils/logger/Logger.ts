import type { LoggerStrategy } from './LoggerStrategy';

export class Logger {
    private strategy: LoggerStrategy;

    constructor(strategy: LoggerStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: LoggerStrategy): void {
        this.strategy = strategy;
    }

    debug(message: string, ...args: unknown[]): void {
        this.strategy.log('debug', message, ...args);
    }

    info(message: string, ...args: unknown[]): void {
        this.strategy.log('info', message, ...args);
    }

    warn(message: string, ...args: unknown[]): void {
        this.strategy.log('warn', message, ...args);
    }

    error(message: string, ...args: unknown[]): void {
        this.strategy.log('error', message, ...args);
    }
}
