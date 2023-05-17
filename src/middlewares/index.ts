/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { initCors } from './cors';
import { initBodyParser } from './bodyparser';

export const initMiddlewares = (app) => {
  initCors(app);
  initBodyParser(app);
};
