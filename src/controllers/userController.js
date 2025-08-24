import { validationResult, body } from "express-validator";
import createError from "http-errors";

export const updateProfileRules = [
  body("name").optional().trim().notEmpty(),
  body("phoneNumber").optional().isString()
];

export const updateMe = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw createError(422, { errors: errors.array() });
    const { name, phoneNumber } = req.body;
    if (!name && !phoneNumber) throw createError(400, "Nothing to update");
    if (name) req.user.name = name;
    if (phoneNumber) req.user.phoneNumber = phoneNumber;
    await req.user.save();
    res.json({ success: true, user: req.user });
  } catch (err) {
    next(err);
  }
};
