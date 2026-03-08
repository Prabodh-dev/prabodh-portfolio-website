import mongoose, { Schema, model, models } from 'mongoose'

const CertificationSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  issueDate: { type: String, required: true },
  order: { type: Number, required: true },
  credentialLink: { type: String, default: '' }
})

export const Certification = models.Certification || model('Certification', CertificationSchema)
