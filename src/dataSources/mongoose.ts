import mongoose from 'mongoose';
import chalk from 'chalk';
import Promise = require('bluebird');

import config from '../config';
import getLogger from '../helpers/logger';

const logger = getLogger.db;

// make bluebird default Promise
(<any>mongoose).Promise = Promise;

if (config.appKey.env === 'development') {
  mongoose.set('debug', true);
}

export const connectMongoWithRetry = async (): Promise<typeof mongoose> => {
  const connectionString: any = config.mongo.uri;
  const connectionOptions: any = config.mongo.options;
  try {
    await mongoose.connect(connectionString, connectionOptions);
    logger.info(' 💻 Mongoose successfully connected to e-Clever database: ');
    return mongoose.connection;
  } catch (error) {
    if (error.message.code === 'ETIMEDOUT') {
      logger.info('Attempting to re-establish database connection.');
      mongoose.connect(connectionString, connectionOptions);
    } else {
      logger.error(
        chalk.bgRed.bold('Error while attempting to connect to database:', {
          error,
        }),
      );
    }
  }
};
