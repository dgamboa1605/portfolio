import { Logger } from './Logger';
import { ConsoleLogger } from './ConsoleLogger';

export const logger = new Logger(new ConsoleLogger());
