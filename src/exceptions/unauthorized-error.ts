import httpStatus from 'http-status';

import { E_cleverBaseStackError } from './base-error';

export class UnauthorizedError extends E_cleverBaseStackError {
  constructor(status = httpStatus.UNAUTHORIZED, title = 'UnauthorizedError', message = 'Unauthorized Error') {
    super(message);
    this.status = status;
    this.title = title;
  }
}
