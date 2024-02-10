import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Book from "./models/book.model.js";
import Category from "./models/category.model.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);
const DB = mongoose.connection;
DB.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
  process.exit(1); // Exit the process on connection error
});

DB.once("connected", () => {
  console.log("MongoDB connected successfully");
});

const books = JSON.parse(fs.readFileSync(`./categories.json`, "utf-8"));

const importData = async () => {
  try {
    await Category.create(books);
    console.log("Data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Book.deleteMany();
    console.log("Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};


if(process.argv[2] === "--delete"){
  deleteData();
  
}else if(process.argv[2] === "--import"){
  importData();
}