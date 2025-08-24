import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { updateMe, updateProfileRules } from "../controllers/userController.js";
import { validationResult } from "express-validator";

const router = Router();

const apply = (rules) => [
  ...rules,
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(422).json({ errors: result.array() });
    next();
  }
];

router.patch("/me", protect, apply(updateProfileRules), updateMe);

export default router;
