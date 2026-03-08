import mongoose, { Schema, model, models } from 'mongoose'

const ButtonSchema = new Schema({
  label: { type: String, required: true },
  link: { type: String, required: true },
  type: { type: String, required: true }
}, { _id: false })

const HeroSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  profileImage: { type: String, required: true },
  buttons: [ButtonSchema]
})

export const Hero = models.Hero || model('Hero', HeroSchema)
