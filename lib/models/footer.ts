import { Schema, model, models } from 'mongoose'

const QuickLinkSchema = new Schema({
  label: { type: String, required: true },
  link: { type: String, required: true }
}, { _id: false })

const SocialLinkSchema = new Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true }
}, { _id: false })

const FooterSchema = new Schema({
  text: { type: String, required: true },
  copyright: { type: String, required: true },
  quickLinks: [QuickLinkSchema],
  socialLinks: [SocialLinkSchema]
})

export const Footer = models.Footer || model('Footer', FooterSchema)
