import User from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

export const getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('bookedBookes');
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});


