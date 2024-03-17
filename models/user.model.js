import mongoose, { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const userSchema = new Schema({
  name: {
    type: String,
    required: "User name is required.",
    trim: true,
    unique: true,
    minlength: [3, "Name must be at least 3 letters"],
  },
  phone: {
    type: String,
    required: "Phone number is required",
    trim: true,
    unique: true,
    validate: [validator.isNumeric, "Please provide correct phone number "],
  },
  password: {
    type: String,
    select: false,
    required: "Password required",
    trim: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
    default: "user",
  },
  bookedBookes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Book",
    },
    
  ],
  passwordChangeAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});


// userSchema.pre(/^find/, function (next) {
//   this.populate({path:'bookedBookes',select:'name'})
//   next();
// });

userSchema.methods.comparePasswords = async function (
  inputPassword,
  userPassword
) {
  return bcrypt.compare(inputPassword, userPassword);
};

userSchema.methods.changePasswordAfter = async function (jwtTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = this.passwordChangeAt.getTime() / 1000;
  }
  return jwtTimestamp < changedTimestamp;
};

const User = model("User", userSchema);
export default User;
