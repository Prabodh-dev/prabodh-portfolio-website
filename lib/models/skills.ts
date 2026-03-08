import { Schema, model, models } from 'mongoose'

const SkillSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true }
}, { _id: false })

const SkillCategorySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  order: { type: Number, required: true },
  skills: [SkillSchema]
})

export const SkillCategory = models.SkillCategory || model('SkillCategory', SkillCategorySchema)
