import { Schema, model, models } from 'mongoose'

const CustomLinkSchema = new Schema({
  label: { type: String, required: true },
  url: { type: String, required: true }
}, { _id: false })

const ContactSchema = new Schema({
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' },
  customLinks: [CustomLinkSchema]
})

export const Contact = models.Contact || model('Contact', ContactSchema)
