import { validationResult } from "express-validator";
import createError from "http-errors";
import Event from "../models/Event.js";

export const createEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw createError(422, { errors: errors.array() });
    const payload = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      organizerName: req.body.organizerName,
      createdBy: req.user._id
    };
    if (req.file) payload.eventBanner = `/uploads/${req.file.filename}`;
    const event = await Event.create(payload);
    res.status(201).json({ success: true, event });
  } catch (err) {
    next(err);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }).populate("createdBy", "name email");
    res.json({ success: true, count: events.length, events });
  } catch (err) {
    next(err);
  }
};

export const getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email");
    if (!event) throw createError(404, "Event not found");
    res.json({ success: true, event });
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw createError(422, { errors: errors.array() });
    const updates = { ...req.body };
    if (req.file) updates.eventBanner = `/uploads/${req.file.filename}`;
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      updates,
      { new: true }
    );
    if (!event) throw createError(404, "Event not found or not owner");
    res.json({ success: true, event });
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    if (!event) throw createError(404, "Event not found or not owner");
    res.json({ success: true, message: "Event deleted" });
  } catch (err) {
    next(err);
  }
};

export const getOwnerIdByEventId = async (req) => {
  const event = await Event.findById(req.params.id).select("createdBy");
  return event?.createdBy;
};
