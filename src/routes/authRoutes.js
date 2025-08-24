import { Router } from "express";
import { login, me, register, logout } from "../controllers/authController.js";
import { registerRules, loginRules } from "../validators/authValidators.js";
import { protect } from "../middleware/auth.js";
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

router.post("/register", apply(registerRules), register);
router.post("/login", apply(loginRules), login);
router.post("/logout", logout);
router.get("/me", protect, me);

export default router;
