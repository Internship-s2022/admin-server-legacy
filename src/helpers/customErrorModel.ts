export class CustomError extends Error {
  status!: number;
  message!: string;
  data?: undefined | Record<string, unknown>;
  error?: boolean;

  constructor(
    status = 500,
    message: string,
    data: undefined | Record<string, unknown> = undefined,
    error = true,
  ) {
    super();
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
