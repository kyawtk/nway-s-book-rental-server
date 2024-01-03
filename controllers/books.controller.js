import Book from "../models/book.model.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getBooks = catchAsync(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(Book.find(), req.query)
    .filter()
    .sort()
    .paginate();

  let data = await apiFeatures.query;

  res.status(200).json({
    status: "success",
    data: {
      books: data,
    },
  });
});
export const getBookById = catchAsync(async (req, res, next) => {
  let id = req.params.id;

  let data = await Book.findById(id);
  if (!data) {
    return next(new AppError("Book not Found", 404));
  }

  res.status(200).json(data);
});

export const postBook = catchAsync(async(req, res, next) => {
  console.log(y)
  let payload = req.body;
  console.log(payload);
  let data =await Book.create(payload);
  res.json({ message: "success", data });
});

export const updateBookById = catchAsync(async (req, res, next) => {
  let id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "Invalid request. Id is missing." });
  }

  var book = await Book.findById(id);
  if (!book) {
    res.status(404).json({ message: "Book not found." });
  } else {
    if (book.isAvailable == false) {
      return res.status(200).json({ message: "Book is not available." });
    } else {
      const updatedResult = await Book.findByIdAndUpdate(
        { _id: id },
        {
          isAvailable: false,
        }
      );
      res.json(updatedResult);
    }
  }
});

export const deleteBookById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "Invalid request. Id is missing." });
  }
  let book = await Book.findByIdAndDelete(id);
  if (!book) {
    res.status(400).json({ message: "Book is missing." });
  }
  res.json({message:'successfully deleted', data:{book}})
});
