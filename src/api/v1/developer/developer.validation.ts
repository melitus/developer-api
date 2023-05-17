import Joi from '@hapi/joi';

export const createDeveloperSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  level: Joi.string().valid('senior', 'junior').required(),
});
