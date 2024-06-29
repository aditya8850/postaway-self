export class ApplicationError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    if (err instanceof ApplicationError) {
        console.log("err handler functioned")
      return res.status(err.statusCode).json({ message: err.message });
    }
  
    res.status(500).json({ message: 'Internal Server Error' });
  };
  