const { StatusCodes } = require('http-status-codes');

function notFoundHandler(_req, res) {
  return res.status(StatusCodes.NOT_FOUND).json({ message: 'Route not found' });
}

function errorHandler(err, _req, res, _next) {
  const isZodError = err && err.name === 'ZodError';
  const statusCode = err.statusCode || (isZodError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR);
  const message = isZodError ? 'Validation failed' : (err.message || 'Internal server error');

  return res.status(statusCode).json({
    message,
    ...(isZodError && { errors: err.issues }),
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
