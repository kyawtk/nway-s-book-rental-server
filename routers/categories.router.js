import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/category.controller.js";
import { protect, restrictTo } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", restrictTo("admin"), createCategory);
router.delete("/:id", restrictTo("admin"), deleteCategory);

export default router;
