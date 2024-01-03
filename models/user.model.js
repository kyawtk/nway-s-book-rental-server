import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
  name: {
    type: String, 
    required: "User name is required.",
    trim: true,
    unique: true,
    minlength : [3,"Name must be at least 3 letters"]
  },
  phone: {
    type: String,
    required: "Phone number is required",
    trim: true,
    unique: true,
    validate: [ validator.isNumeric , "Please provide correct phone number "],
  }, 
  semester:{
    type:String,
    required: "Sememster number is required",
    trim:true,
    validate: [validator.isNumeric , "Please provide a correct semster number"], 
  },
  password: {
    type:String,
    required: "Password required",
    trim:true,
    minlength: [8, "Password must be at least 8 characters long"]
  }
});

const User = model("User" , userSchema)
export default User
 