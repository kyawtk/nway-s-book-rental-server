import express from "express";
import {
  deleteBookingById,
  getBookingById,
  getBookings,
  postBooking
} from "../controllers/booking.controller.js";
import { protect, restrictTo } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", getBookings);
router.post("/", postBooking);


router.get("/:id", getBookingById);
router.delete("/:id/", protect ,  restrictTo('admin'), deleteBookingById);


export default router;
