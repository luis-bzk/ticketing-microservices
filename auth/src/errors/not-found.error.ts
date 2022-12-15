import { CustomError } from "./custom-abstract.error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Route not found ");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
