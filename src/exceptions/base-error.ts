export interface E_cleverBaseStackError extends Error {
  errors: Error;
  status: number;
  httpCode: number;
  message: string;
  isPublic: boolean;
  isOperational: boolean;
  title: string;
  constructor(message: string, ...args: any) {
    super(...args);
    // Object.setPrototypeOf(this, new.target.prototype);

    this.httpCode = this.httpCode;
    this.name = this.constructor.name;
    this.message = message;
    this.isPublic = this.isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = this.stack; // Error.captureStackTrace(this, this.constructor.name);
    this.title = this.title;
    Error.captureStackTrace(this);
  }
}


export abstract class CustomError extends Error{
  abstract statusCode: number;
  constructor(message: string){
      super(message);
      Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors(): {
      message: string,
      field?: string
  } [];
}

import { CustomError } from "./CustomError";
export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  constructor() {
    super('Error connecting to database');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [
      {
        message: "Error connecting to database",
      },
    ];
  }
}

import { ValidationError } from "express-validator";
export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super('Invalid Request Parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}

// error handler middlewares
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};