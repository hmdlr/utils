import winston from 'winston';
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';

const transports: ConsoleTransportInstance[] = [];
if (process.env.NODE_ENV !== 'development') {
  transports.push(
    new winston.transports.Console()
  );
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat()
      ),
    })
  );
}

const LoggerInstance = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.prettyPrint({ colorize: true })
  ),
  transports,
});

export default LoggerInstance;
