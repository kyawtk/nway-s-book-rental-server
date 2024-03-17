import Booking from "../models/booking.model.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import {
  creatDocument,
  deleteDocumentById,
  getDocumentById,
  updateDocumentById,
} from "./controllerFactory.js";
import User from "../models/user.model.js";

// export const getBooks = catchAsync(async (req, res, next) => {
//   // let apiFeatures = new ApiFeatures(Book.find(), req.query)
//   // .filter()
//   // .sort()
//   // .paginate();

//   // let data = await apiFeatures.query;
//   let data = await Book.find();

//   res.status(200).json({
//     status: "success",
//     data: {
//       books: data,
//     },
//   });
// });


export const getBookings = catchAsync(async (req, res, next) => {
  let query = req.query.search || ''; // Assuming search parameter is part of the request query

  // Add search criteria to find books
  let data = await Booking.find({
    $or: [
      { book: { $regex: new RegExp(query, 'i') } },
      { bookedBy: { $regex: new RegExp(query, 'i') } },
      // Add more fields to search if needed
    ],
  });

  res.status(200).json({
    status: 'success',
    data: {
      bookings: data,
    },
  });
});


// export const bookBook = catchAsync(async (req, res, next) => {
  
//   const { bookIds } = req.body;
//   const userId = req.user._id;
//   // // Update books
//   const bookUpdates = bookIds.map(async (bookId) => {
//     return Book.findByIdAndUpdate(bookId, { bookedBy: userId , isAvailable:false });
//   });

//   // Wait for all book updates to complete
//   await Promise.all(bookUpdates);

//   // Update user's booked books using $addToSet to ensure uniqueness
//   await User.findByIdAndUpdate(userId, {
//     bookedBookes:[...bookIds]
//   });

//   res.status(200).json({ status: 200, message: "Booked" });
//   // res.status(200).json({ status: 200, message: "Booked" })
// });
export const getBookingById = getDocumentById(Booking, ['book', 'bookedBy']);
export const postBooking = creatDocument(Booking);
export const deleteBookingById = deleteDocumentById(Booking);
