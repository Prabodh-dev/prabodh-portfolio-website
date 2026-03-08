import { Schema, model, models } from 'mongoose'

const ResumeSchema = new Schema({
  fileName: { type: String, required: true },
  uploadDate: { type: Date, required: true }
})

export const Resume = models.Resume || model('Resume', ResumeSchema)
