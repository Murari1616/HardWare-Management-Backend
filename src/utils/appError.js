class AppError extends Error {
    constructor(message, statusCode, errors = null) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.errors = errors;
        this.errorCode = 'APP_ERROR';
        this.userMessage = 'An error occurred. Please try again later.';

        // Log error only in non-production environments
        if (process.env.NODE_ENV !== 'production') {
            console.error(`Error: ${message}, StatusCode: ${statusCode}`);
        }

        // Ensure stack trace is captured
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = AppError; // ✅ Correct CommonJS export
