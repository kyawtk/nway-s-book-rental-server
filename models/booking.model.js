import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.ObjectId, ref: "Book" },
    bookedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    message: String,
  },
  {
    timestamps: {
      createdAt: true,
    },
    toJSON: { virtuals: true },
    validateBeforeSave: true,
  }
);

// bookingSchema.pre("save", function (next) {
//   if (this.isAvailable == true) {
//     this.timesRented = this.timesRented + 1;
//   }
//   next();
// });
bookingSchema.pre(/^find/, function (next) {
  this.populate({ path: "book", select: "name" }).populate({
    path: "bookedBy",
    select: "name",
  });

  next();
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
