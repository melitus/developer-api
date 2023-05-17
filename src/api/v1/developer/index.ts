import { Router } from 'express';

import DeveloperController from './developer.controller';
import { validateBodySchema } from '../../../helpers/validation';

import { createDeveloperSchema } from './developer.validation';

const developerRouter = Router();

developerRouter
  .route('/')
  .get(DeveloperController.getDevelopers)
  .post(validateBodySchema(createDeveloperSchema), DeveloperController.createDeveloper);
developerRouter.route('/filter').get(DeveloperController.filterDeveloperByLevel);
developerRouter
  .route('/:developerId')
  .get(DeveloperController.getSingleDeveloper)
  .put(DeveloperController.editSingleDeveloper)
  .delete(DeveloperController.deleteDeveloper);

export default developerRouter;
