import User from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js"; 
import jwt from 'jsonwebtoken'

export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name, 
    semester : req.body.semester,
    phone : req.body.phone,
    password: req.body.password, 
  }); 

  const token   =  jwt.sign({id: newUser._id} , process.env.JWT_SECRET, {expiresIn: '1d'})
  res.status(201).json({
    message: "success",
    token,
    data: {
      user: newUser,
    },
  });
});
