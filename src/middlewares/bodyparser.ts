/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import express, { Application } from 'express';

export const initBodyParser = (app: Application) => {
  app.use(express.json({ limit: '30kb' })); // parse body params and attach them to req.body
  app.use(
    express.urlencoded({
      extended: true,
      limit: '50mb',
      parameterLimit: 500000000,
    }),
  );
};
