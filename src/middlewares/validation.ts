/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const handleErrorResponse = (error) => ({
  status: false,
  message: error && error.details[0] && error.details[0].message,
});

/**
 * @description returns the data to be validated for a request
 * @param {Object} req The Express Request Object
 * @param {String} bodyParamsOrQuery determines what part of the request should be validated
 * @returns {Object}
 */
const getDataToValidate = (req, bodyParamsOrQuery) => {
  const { body, query, params } = req;
  if (bodyParamsOrQuery === 'query') {
    return query;
  }
  if (bodyParamsOrQuery === 'params') {
    return params;
  }
  return body;
};

export const validateRequest = (schema, bodyParamsOrQuery = 'body') => (req, res, next) => {
  if (!schema) return next();
  const dataToValidate = getDataToValidate(req, bodyParamsOrQuery);
  const { error } = schema.validate(dataToValidate, { stripUnknown: true });
  if (error) {
    const { status, message } = handleErrorResponse(error);
    return res.status(400).send({ status, message });
  }
  return next();
};
