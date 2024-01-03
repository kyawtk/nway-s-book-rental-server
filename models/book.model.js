import mongoose from "mongoose";
import validator from 'validator'
const bookSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, unique: true  },
    isAvailable: { type: Boolean, default: true },
    author: { type: String, required: true , trim:true },
    price: { type: Number, required: true, validate: (val)=> {
      //this only works for saving new document/ not updating  / .save() .create()
      return val % 50 == 0  
    } },
    genre: String,
    image: String,
    timesRented: { type: Number, default: 0 },
    description: String,
  },
  {
    toJSON: { virtuals: true },
    validateBeforeSave: true,
  }
);

bookSchema.pre("save", function (next) {
  if (this.isAvailable == true) {
    this.timesRented = this.timesRented + 1;
  }
  next();
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
