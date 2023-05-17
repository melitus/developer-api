/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * @file App environment
 * @module app/environment
 */

import config from '../config';

export const environment = config.appKey.env;
export const isDevEnv = () => Object.is(environment, 'development');
export const isProdEnv = () => Object.is(environment, 'production');

export default {
  isDevEnv,
  isProdEnv,
  environment,
};
