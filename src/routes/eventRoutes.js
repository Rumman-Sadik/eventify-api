import { Router } from "express";
import { protect, requireOwner } from "../middleware/auth.js";
import validateObjectId from "../middleware/validateObjectId.js";
import { upload } from "../utils/multer.js";
import {
  createEvent,
  getEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  getOwnerIdByEventId
} from "../controllers/eventController.js";
import { createEventRules, updateEventRules } from "../validators/eventValidators.js";
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

router.use(protect);
router.get("/", getEvents);
router.post("/", upload.single("eventBanner"), apply(createEventRules), createEvent);
router.get("/:id", validateObjectId(), getEvent);
router.patch("/:id", validateObjectId(), requireOwner(getOwnerIdByEventId), upload.single("eventBanner"), apply(updateEventRules), updateEvent);
router.delete("/:id", validateObjectId(), requireOwner(getOwnerIdByEventId), deleteEvent);

export default router;
