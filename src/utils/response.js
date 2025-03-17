
// Success response function
const sendSuccessResponse = (
  res,
  data,
  statusCode = 200,
  message = "",
  meta = null
) => {
  const response = {
    success: true,
    message,
    statuscode: statusCode,
    data,
    meta,
  };
  res.status(statusCode).json(response);
};

// Error response function
const sendErrorResponse = (
  res,
  statusCode,
  messages,
  meta = null
) => {
  const response = {
    success: false,
    messages,
    errorDetails: meta,
  };
  res.status(statusCode).json(response);
};

module.exports = { sendSuccessResponse, sendErrorResponse };

