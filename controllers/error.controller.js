import AppError from "../utils/appError.js";

const handleValidationError = (err) => {
  let message = `Input Error : ${Object.values(err.errors)
    .map((el) => el.message)
    .join(". ")} `;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message,
    err: err,
    stack: err.stack,
  });
};
const sendErrorProduction = (err, res) => {
  if (!err.isOperational) {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  } else {
    res.status(err.statusCode || 500).json({
      status: err.status,
      message: err.message,
    });
  }
};
const handleJWTError = (err) => {
  return new AppError("Invalid Token, Please log in again", 401);
};
const handleJWTExpireError = (err) => {
  return new AppError("Token expired, Please log in again", 401);
};

function errorHandler(err, req, res, next) {
  if (process.env.NODE_ENV == "production") {
    let error = { ...err, name: err.name, message: err.message };
    let message = err.message;
    if (error.name == "ValidationError") error = handleValidationError(error);
    if (error.name == "JsonWebTokenError") error = handleJWTError(error);
    if (error.name == "TokenExpiredError") error = handleJWTExpireError(error);
    
    
    sendErrorProduction(error, res);
  } else {
    sendErrorDev(err, res);
  }
}

export default errorHandler;
