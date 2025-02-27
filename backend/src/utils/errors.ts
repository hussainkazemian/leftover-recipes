export class CustomError extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export class NotFoundError extends CustomError {
    constructor(message: string = 'Not Found') {
      super(message, 404);
    }
  }
  
  export class BadRequestError extends CustomError {
    constructor(message: string = 'Bad Request') {
      super(message, 400);
    }
  }