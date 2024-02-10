import express from "express";
import {
  getBooks,
  postBook,
  getBookById,
  updateBookById,
  deleteBookById,
  bookBook,
} from "../controllers/books.controller.js";
import { protect, restrictTo } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", postBook);


router.get("/:id", getBookById);
router.put("/:id/", updateBookById);
router.delete("/:id/", protect ,  restrictTo('admin'), deleteBookById);

router.post("/book" ,protect, bookBook);

export default router;
