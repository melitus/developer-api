import httpStatus from 'http-status';

import { DeveloperBaseStackError } from './base-error';

export class NotFoundError extends DeveloperBaseStackError {
  constructor(
    status = httpStatus.NOT_FOUND,
    title = 'Resource error',
    message = 'ResourceNotFoundError: The API endpoint requested does not exist',
  ) {
    super(message);
    this.status = status;
    this.title = title;
  }
}
