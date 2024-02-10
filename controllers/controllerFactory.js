import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const creatDocument = (Modal) =>
  catchAsync(async (req, res, next) => {
    let payload = req.body;

    let doc = await Modal.create(payload);
    if (!doc) {
      return next(new AppError("Failed creating document", 500));
    }
    res.status(200).json({
      status: "success",
      data: {
        document: doc,
      },
    });
  });

export const deleteDocumentById = (Modal) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;

    let doc = await Modal.findByIdAndDelete(id);
    if (!doc) {
      return next(new AppError("Document missing!", 404));
    }
    res.status(204).json({ message: "Successfully deleted", data: { doc } });
  });

export const updateDocumentById = (Modal) =>
  catchAsync(async (req, res, next) => {
    let id = req.params.id;

    const doc = await Modal.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("NO document found with that id", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        document: doc,
      },
    });
  });

export const getDocumentById = (Modal, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let id = req.params.id;

    let query = Modal.findById(id);
    if (populateOptions) query = query.populate(populateOptions);
    let doc = await query;
    if (!doc) {
      return next(new AppError("NO document found with that id", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        document: doc,
      },
    });
  });
