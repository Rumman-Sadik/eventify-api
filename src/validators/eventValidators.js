import { body } from "express-validator";

export const createEventRules = [
  body("title").trim().notEmpty(),
  body("description").optional().isString(),
  body("date").trim().notEmpty(),
  body("time").trim().notEmpty(),
  body("location").trim().notEmpty(),
  body("organizerName").trim().notEmpty()
];

export const updateEventRules = [
  body("title").optional().trim().notEmpty(),
  body("description").optional().isString(),
  body("date").optional().trim().notEmpty(),
  body("time").optional().trim().notEmpty(),
  body("location").optional().trim().notEmpty(),
  body("organizerName").optional().trim().notEmpty()
];
