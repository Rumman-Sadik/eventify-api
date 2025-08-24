import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  organizerName: { type: String, required: true },
  eventBanner: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
