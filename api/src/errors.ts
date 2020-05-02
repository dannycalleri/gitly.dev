export class RestError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export function handleError(err: RestError, res: any) {
  const {statusCode, message} = err;
  res.status(statusCode || 500).json({
    message,
  });
};
