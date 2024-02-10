import User from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js ";
import { promisify } from "util";

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};

export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    phone: req.body.phone,
    password: req.body.password,
  });

  const token = generateToken(newUser._id);

  res.status(201).json({
    message: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

export const logIn = catchAsync(async (req, res, next) => {
  console.log(req.body)
  const { name, password } = req.body;

  if (!name || !password) {
    return next(new AppError("Please provide name and password", 400));
  }

  const user = await User.findOne({ name }).populate('bookedBookes').select("+password");

  if (!user || !(await user.comparePasswords(password, user.password))) {
    return next(new AppError("Failed to login. Incorect phone or pw", 401));
  }

  const token = generateToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

export const protect = catchAsync(async (req, res, next) => {
  //getting token and check if its there

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in. Please log in", 401));
  }

  //verify the token
  let result = jwt.verify(token, process.env.JWT_SECRET);

  //check if user still exists
  const user = await User.findById(result.id)
  if (!user) {
    return next(new AppError("The user doesn't exits anymore", 401));
  }

  //check if user changed password after the token is issued

  // if(user.changePasswordAfter(result.iat)){
  //   return next(new AppError("Password has changed. Log in again!"))
  // }

  //grant access to protected route
  req.user = user;

  next();
});

//user role management

export const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("User do not have permission"));
    }
    next();
  };
