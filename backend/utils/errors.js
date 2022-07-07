export class HttpError extends Error {
  constructor(msg, statusCode = 500) {
    super(msg);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends HttpError {
  constructor(msg) {
    super(msg, 400);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(msg) {
    super(msg, 401);
  }
}

export class ForbiddenError extends HttpError {
  constructor(msg) {
    super(msg, 403);
  }
}

export class NotFoundError extends HttpError {
  constructor(msg) {
    super(msg, 404);
  }
}

export function handleError(err, res) {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({ error: {message} });
}

