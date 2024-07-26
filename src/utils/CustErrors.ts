export class MyHttpError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public logMSG: string = ""
  ) {
    super(message);
    this.name = "MyHttpError";
  }
}

export class ConflictError extends MyHttpError {
  constructor(
    message: string = "Conflict error happened",
    statusCode: number = 409,
    logMSG?: string
  ) {
    super(message, statusCode, logMSG);
    this.name = "Conflict Error";
  }
}
