"use strict";
import helmet from "helmet";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import config from "config";
import cors from "cors";
import cookieParser from "cookie-parser";
import AppError from "./utils/appError.js";
import errorHandler from "./controllers/error.controller.js";

import books from "./routers/books.router.js";
import users from "./routers/users.router.js";
import bookings from "./routers/booking.router.js";

import categories from "./routers/categories.router.js";
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
//Configuration

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("success dbs");
});

var app = express();

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("common"));
  console.log("Morgan enabled");
}

app.use("/users", users);
app.use("/books", books);
app.use("/categories", categories);
app.use("/bookings", bookings);
// Respond not found to all the wrong routes
app.use(function (req, res, next) {
  next(new AppError("Not found route specified", 404));
});

// Error Middleware
app.use(errorHandler);

//Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 4000, function () {
  console.log("Node.js listening on port " + listener.address().port);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  listener.close(() => {
    process.exit(1);
  });
});
