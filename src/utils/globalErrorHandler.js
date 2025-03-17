const AppError=require('./appError')

const sendErrorDev = (error, res) => {
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const stack = error.stack?.split('\n').map((line) => line.trim());
  
    res.status(statusCode).json({
        statusCode,
        success: false,  
        message,
        error,
        stack,
    });
};

const sendErrorProd = (error, res) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'Something went wrong';
    const message = error.message;

    if (error.isOperational) {
        return res.status(statusCode).json({
            status,
            message,
        });
    }

    console.log(error.name, error.message, error.stack); // Should not return stack trace in production

    return res.status(500).json({
        status: 'error',
        message: 'Something went very wrong',
    });
};

const globalErrorHandler = (err, req, res, _next) => {
    console.error('globalErrorHandler error========>', err);

    if (err.name === 'JsonWebTokenError') {
        err = new AppError('Invalid token', 401);
    }

    if (err.name === 'ValidationError') {
        // Mongoose validation error
        err = new AppError(err.message, 400);
    }

    if (err.code === 11000) {
      
        const field = Object.keys(err.keyValue || {}); 
        err = new AppError(`Duplicate field value: ${field}`, 400);
    }

    if (err.name === 'MongoError') {
     
        err = new AppError('Database error', 500);
    }

    if (process.env.NODE_ENV === 'development') {
        return sendErrorDev(err, res);
    }

    sendErrorProd(err, res);
};

module.exports= globalErrorHandler;
