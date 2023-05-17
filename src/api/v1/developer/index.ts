import { Router } from 'express';

import DeveloperController from './developer.controller';
import { validateRequest } from '../../../middlewares/validation';

import { createDeveloperSchema, developerIdSchema } from './developer.validation';

const developerRouter = Router();

developerRouter
  .route('/')
  .get(DeveloperController.getDevelopers)
  .post(validateRequest(createDeveloperSchema, 'body'), DeveloperController.createDeveloper);
developerRouter.route('/filter').get(DeveloperController.filterDeveloperByLevel);
developerRouter
  .route('/:developerId')
  .get(validateRequest(developerIdSchema, 'query'), DeveloperController.getSingleDeveloper)
  .put(validateRequest(developerIdSchema, 'query'), DeveloperController.editSingleDeveloper)
  .delete(validateRequest(developerIdSchema, 'query'), DeveloperController.deleteDeveloper);

export default developerRouter;
