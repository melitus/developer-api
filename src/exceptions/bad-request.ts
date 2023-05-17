import httpStatus from 'http-status';

import { E_cleverBaseStackError } from './base-error';

export class BadRequestError extends E_cleverBaseStackError {
  constructor(status = httpStatus.BAD_REQUEST, title = 'Validation error', message = 'Bad Request') {
    super(message);
    this.status = status;
    this.title = title;
  }
}
