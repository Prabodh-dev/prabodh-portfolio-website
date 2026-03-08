import { Schema, model, models } from 'mongoose'

const ProjectSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String, default: '' },
  description: { type: String, required: true },
  features: [{ type: String }],
  techStack: [{ type: String }],
  status: { type: String, required: true },
  featured: { type: Boolean, default: false },
  tags: [{ type: String }],
  order: { type: Number, required: true },
  githubLink: { type: String, default: '' },
  liveLink: { type: String, default: '' },
  images: [{ type: String }]
})

export const Project = models.Project || model('Project', ProjectSchema)
