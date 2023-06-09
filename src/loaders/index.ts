/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import expressLoader from './express';
import { connectMongoWithRetry } from '../dataSources/mongoose';
import getLogger from '../helpers/logger';

const logger = getLogger.initServer;

export const appInitLoader = ({ expressApp }) => {
  connectMongoWithRetry();
  logger.info('👌 Express Initialized');
  expressLoader({ app: expressApp });
};
