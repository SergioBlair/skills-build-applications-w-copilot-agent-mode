import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    avatarUrl: String,
  },
  { timestamps: true },
)

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    color: { type: String, required: true },
  },
  { timestamps: true },
)

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
)

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    weeklyPoints: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
)

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ name: String, sets: Number, repetitions: Number }],
    recommendedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

export const User = mongoose.models.User || mongoose.model('User', userSchema)
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema)
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema)
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema)
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema)