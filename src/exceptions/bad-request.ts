import httpStatus from 'http-status';

import { DeveloperBaseStackError } from './base-error';

export class BadRequestError extends DeveloperBaseStackError {
  constructor(status = httpStatus.BAD_REQUEST, title = 'Validation error', message = 'Bad Request') {
    super(message);
    this.status = status;
    this.title = title;
  }
}
