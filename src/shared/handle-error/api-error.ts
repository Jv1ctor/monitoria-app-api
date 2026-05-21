export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly codeError: string;
  constructor(message: string, statusCode: number, codeError: string) {
    super(message);
    this.statusCode = statusCode;
    this.codeError = codeError;
  }
}
