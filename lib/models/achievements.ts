import mongoose, { Schema, model, models } from 'mongoose'

const AchievementSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  date: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true }
})

export const Achievement = models.Achievement || model('Achievement', AchievementSchema)
