// src/middleware/authentication.js
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { getUserById } = require('../repositories/userRepo');
const { sendSuccessResponse } = require('../utils/response');
const dotenv = require('dotenv');

dotenv.config();

// Read keys from env
const privateKey = process.env.JWT_SECRET?.replace(/\\n/g, '\n');

// === Generate JWT Token ===
const generateToken = (id, email) => {
  const expiresIn = process.env.JWT_EXPIRY || '30d';
  const payload = {id,email};

  const signOptions = {
    algorithm: 'HS256',
    expiresIn: expiresIn,
  };

  return jwt.sign(payload, privateKey, signOptions);
};

// === MIDDLEWARE: Authenticate User ===
const authenticate = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Please login to get access", 401));
  }

  try {
    const decoded = jwt.verify(token, privateKey, { algorithms: ['HS256'] });
    const user = await getUserById(decoded.id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError('Token expired, please refresh your token', 401));
    } else if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Invalid token, please log in again', 401));
    }
    return next(new AppError("Authentication failed", 401, error));
  }
};

// === VERIFICATION ENDPOINT ===
const verifyToken = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Please login to get access", 401));
  }

  try {
    const decoded = jwt.verify(token, privateKey, { algorithms: ['HS256'] });
    const user = await getUserById(decoded.id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    sendSuccessResponse(res, user, 200, "Token Verified Successfully");
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError('Token expired, please refresh your token', 401));
    } else if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Invalid token, please log in again', 401));
    }
    return next(new AppError("Authentication failed", 401, error));
  }
};

module.exports = {
  generateToken,
  authenticate,
  verifyToken,
};
