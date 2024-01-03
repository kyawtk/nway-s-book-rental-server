import express from "express";
import {
  getBooks,
  postBook,
  getBookById,
  updateBookById,
  deleteBookById,
} from "../controllers/books.controller.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", postBook);

router.get("/:id", getBookById);
router.put("/:id/", updateBookById);
router.delete("/:id/", deleteBookById);

export default router;
