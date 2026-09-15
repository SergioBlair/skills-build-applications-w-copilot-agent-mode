import express from 'express'
import { connectDatabase } from './config/database.js'
import { Activity, Leaderboard, Team, User, Workout } from './models.js'

const app = express()
const port = Number(process.env.PORT) || 8000
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', baseUrl })
})

app.get('/api/users/', async (_request, response, next) => {
  try {
    response.json(await User.find().select('-passwordHash').sort({ name: 1 }).lean())
  } catch (error) {
    next(error)
  }
})

app.get('/api/teams/', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members', 'username name email').sort({ name: 1 }).lean())
  } catch (error) {
    next(error)
  }
})

app.get('/api/activities/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().populate('user', 'username name').sort({ completedAt: -1 }).lean())
  } catch (error) {
    next(error)
  }
})

app.get('/api/leaderboard/', async (_request, response, next) => {
  try {
    response.json(await Leaderboard.find().populate('user', 'username name').populate('team', 'name color').sort({ rank: 1 }).lean())
  } catch (error) {
    next(error)
  }
})

app.get('/api/workouts/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().populate('recommendedFor', 'username name').sort({ difficulty: 1 }).lean())
  } catch (error) {
    next(error)
  }
})

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening at ${baseUrl}`)
    })
  })
  .catch((error) => {
    console.error('Unable to start OctoFit Tracker API:', error)
    process.exit(1)
  })