import jwt from "jsonwebtoken";
import createError from "http-errors";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) throw createError(401, "Not authenticated");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw createError(401, "User not found");
    req.user = user;
    next();
  } catch (err) {
    next(createError(401, "Invalid or expired token"));
  }
};

export const requireOwner = (getOwnerId) => async (req, res, next) => {
  try {
    const ownerId = await getOwnerId(req);
    if (!ownerId) throw createError(404, "Resource not found");
    if (ownerId.toString() !== req.user._id.toString()) throw createError(403, "Forbidden");
    next();
  } catch (err) {
    next(err);
  }
};
