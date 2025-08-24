import { validationResult } from "express-validator";
import createError from "http-errors";
import User from "../models/User.js";
import { setAuthCookie, signToken } from "../utils/generateToken.js";

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw createError(422, { errors: errors.array() });
    const { name, email, password, phoneNumber } = req.body;
    const exists = await User.findOne({ email });
    if (exists) throw createError(409, "Email already in use");
    const user = await User.create({ name, email, password, phoneNumber });
    const token = signToken({ id: user._id });
    setAuthCookie(res, token);
    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw createError(422, { errors: errors.array() });
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const ok = user && (await user.comparePassword(password));
    if (!ok) throw createError(401, "Invalid credentials");
    const token = signToken({ id: user._id });
    setAuthCookie(res, token);
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
  res.json({ success: true, message: "Logged out" });
};

export const me = async (req, res) => {
  res.json({ success: true, user: req.user });
};
