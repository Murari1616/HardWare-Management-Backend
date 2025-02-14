/* eslint-disable @typescript-eslint/no-explicit-any */
class AppError extends Error {
    

    constructor(message, statusCode, errors = null) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; 
        this.errors = errors; 
        this.errorCode = 'APP_ERROR'; 
        this.userMessage = 'An error occurred. Please try again later.'; 
        // Log the error for debugging
        console.error(`Error occurred: ${message}, StatusCode: ${statusCode}`);

        // Captures the stack trace for debugging purposes
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
