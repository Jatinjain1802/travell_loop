const { StatusCodes } = require('http-status-codes');

function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Admin access required' });
  }

  return next();
}

module.exports = adminMiddleware;
