import mongoose, { Schema, model, models } from 'mongoose'

const ExperienceSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  organization: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, default: '' },
  highlights: [{ type: String }],
  order: { type: Number, required: true }
})

export const Experience = models.Experience || model('Experience', ExperienceSchema)
