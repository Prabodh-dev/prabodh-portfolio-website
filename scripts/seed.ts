import dotenv from 'dotenv'
import connectDB from '../lib/mongodb'
import fs from 'fs'
import path from 'path'
import { Hero } from '../lib/models/hero'
import { About } from '../lib/models/about'
import { SkillCategory } from '../lib/models/skills'
import { Project } from '../lib/models/projects'
import { Experience } from '../lib/models/experiences'
import { Certification } from '../lib/models/certifications'
import { Achievement } from '../lib/models/achievements'
import { Contact } from '../lib/models/contact'
import { Footer } from '../lib/models/footer'
import { Resume } from '../lib/models/resume'

// Load environment variables
dotenv.config({ path: '.env.local' })

async function seed() {
  try {
    console.log('⚠️  WARNING: This will clear all existing data in MongoDB!')
    console.log('Connecting to MongoDB...')
    await connectDB()
    console.log('Connected to MongoDB!')

    console.log('Reading db.json file...')
    const db = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'data/db.json'), 'utf-8')
    )
    console.log('db.json file read successfully!')

    // Seed Hero
    console.log('Seeding Hero...')
    await Hero.deleteMany({})
    await Hero.create(db.hero)
    console.log('Hero seeded!')

    // Seed About
    console.log('Seeding About...')
    await About.deleteMany({})
    await About.create(db.about)
    console.log('About seeded!')

    // Seed Skill Categories
    console.log('Seeding Skill Categories...')
    await SkillCategory.deleteMany({})
    await SkillCategory.insertMany(db.skillCategories)
    console.log('Skill Categories seeded!')

    // Seed Projects
    console.log('Seeding Projects...')
    await Project.deleteMany({})
    await Project.insertMany(db.projects)
    console.log('Projects seeded!')

    // Seed Experiences
    console.log('Seeding Experiences...')
    await Experience.deleteMany({})
    await Experience.insertMany(db.experiences)
    console.log('Experiences seeded!')

    // Seed Certifications
    console.log('Seeding Certifications...')
    await Certification.deleteMany({})
    await Certification.insertMany(db.certifications)
    console.log('Certifications seeded!')

    // Seed Achievements
    console.log('Seeding Achievements...')
    await Achievement.deleteMany({})
    await Achievement.insertMany(db.achievements)
    console.log('Achievements seeded!')

    // Seed Contact
    console.log('Seeding Contact...')
    await Contact.deleteMany({})
    await Contact.create(db.contact)
    console.log('Contact seeded!')

    // Seed Footer
    console.log('Seeding Footer...')
    await Footer.deleteMany({})
    await Footer.create(db.footer)
    console.log('Footer seeded!')

    // Seed Resume
    console.log('Seeding Resume...')
    await Resume.deleteMany({})
    await Resume.create(db.resume)
    console.log('Resume seeded!')

    console.log('✅ Seeding complete!')
    process.exit(0)
  } catch {
    console.error('❌ Error seeding database')
    process.exit(1)
  }
}

seed().catch(console.error)
