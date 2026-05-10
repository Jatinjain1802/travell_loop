const { StatusCodes } = require('http-status-codes');

function notFoundHandler(_req, res) {
  return res.status(StatusCodes.NOT_FOUND).json({ message: 'Route not found' });
}

function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal server error';

  return res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
