import { Schema, model, models } from 'mongoose'

const AboutSchema = new Schema({
  summary: { type: String, required: true },
  detailed: { type: String, required: true },
  education: { type: String, required: true },
  currentFocus: { type: String, required: true },
  personalStatement: { type: String, required: true }
})

export const About = models.About || model('About', AboutSchema)
