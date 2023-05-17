import { createLogger, format, transports } from 'winston';
import chalk from 'chalk';

import { isDevEnv } from './environment';
import config from '../config';

const { combine, colorize, label, printf, simple, splat, timestamp } = format;

const myFormat = printf((info) => {
  const { timestamp, label, level, message, ...meta } = info;
  return `[${timestamp}] ${chalk.cyan(label)} [${level}]: ${message}\n ${
    Object.keys(meta).length ? JSON.stringify(meta, null, 4) : ''
  }`;
});

const logFormat = (loggerLabel: string) =>
  combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    splat(),
    colorize(),
    simple(),
    label({ label: loggerLabel }),
    myFormat,
  );

const createLoggerWithLabel = (label?: any) =>
  createLogger({
    level: config.appKey.env ? 'info' : 'error',
    transports: [
      new transports.Console({
        format: format.combine(format.colorize(), format.simple(), myFormat),
        handleExceptions: false,
      }),
    ],
    format: logFormat(label),
  });

if (isDevEnv()) {
  createLoggerWithLabel().add(
    new transports.Console({
      format: combine(
        colorize(),
        label({ label: 'E-clever Restful API' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      ),
    }),
  );
}

export default {
  db: createLoggerWithLabel('[E-clever:Database Connection]'),
  initServer: createLoggerWithLabel('[E-clever:Init Server]'),
};
