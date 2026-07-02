import { Schema, model, models } from "mongoose";

const ResumeSchema = new Schema({
  fileName: { type: String, required: true },
  uploadDate: { type: Date, required: true },
  url: { type: String, required: false },
  downloadUrl: { type: String, required: false },
});

export const Resume = models.Resume || model("Resume", ResumeSchema);
