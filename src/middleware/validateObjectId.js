import mongoose from "mongoose";
import createError from "http-errors";

export default function validateObjectId(param = "id") {
  return (req, res, next) => {
    const id = req.params[param];
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, "Invalid ID"));
    next();
  };
}
