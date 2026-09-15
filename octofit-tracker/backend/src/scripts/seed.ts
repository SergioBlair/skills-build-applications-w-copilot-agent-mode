import mongoose from 'mongoose'
import { connectionString } from '../config/database.js'
import { Activity, Leaderboard, Team, User, Workout } from '../models.js'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.create([
      { username: 'alex-morgan', email: 'alex@example.com', name: 'Alex Morgan', passwordHash: 'demo-password', avatarUrl: '/avatars/alex.png' },
      { username: 'jamie-lee', email: 'jamie@example.com', name: 'Jamie Lee', passwordHash: 'demo-password', avatarUrl: '/avatars/jamie.png' },
      { username: 'casey-rivera', email: 'casey@example.com', name: 'Casey Rivera', passwordHash: 'demo-password', avatarUrl: '/avatars/casey.png' },
      { username: 'taylor-kim', email: 'taylor@example.com', name: 'Taylor Kim', passwordHash: 'demo-password', avatarUrl: '/avatars/taylor.png' },
    ])

    const teams = await Team.create([
      { name: 'Summit Striders', description: 'Consistent training and steady progress.', members: [users[0]._id, users[1]._id], color: '#ef8354' },
      { name: 'North Star', description: 'A balanced crew chasing strong habits.', members: [users[2]._id, users[3]._id], color: '#2f6690' },
    ])

    await Activity.create([
      { user: users[0]._id, type: 'Run', durationMinutes: 42, distanceKm: 6.8, calories: 510, completedAt: new Date('2026-09-13T07:30:00Z') },
      { user: users[1]._id, type: 'Strength', durationMinutes: 35, calories: 280, completedAt: new Date('2026-09-13T18:00:00Z') },
      { user: users[2]._id, type: 'Cycle', durationMinutes: 55, distanceKm: 18.4, calories: 620, completedAt: new Date('2026-09-12T09:15:00Z') },
      { user: users[3]._id, type: 'Yoga', durationMinutes: 30, calories: 150, completedAt: new Date('2026-09-12T17:45:00Z') },
    ])

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 1240, weeklyPoints: 320, rank: 1 },
      { user: users[2]._id, team: teams[1]._id, points: 1185, weeklyPoints: 295, rank: 2 },
      { user: users[1]._id, team: teams[0]._id, points: 980, weeklyPoints: 240, rank: 3 },
      { user: users[3]._id, team: teams[1]._id, points: 875, weeklyPoints: 215, rank: 4 },
    ])

    await Workout.create([
      { title: 'Foundation Full Body', description: 'A practical strength session for building consistency.', difficulty: 'beginner', durationMinutes: 30, exercises: [{ name: 'Squat', sets: 3, repetitions: 10 }, { name: 'Push-up', sets: 3, repetitions: 8 }, { name: 'Plank', sets: 3, repetitions: 30 }], recommendedFor: [users[0]._id, users[1]._id] },
      { title: 'Tempo Intervals', description: 'Short running intervals to improve speed and stamina.', difficulty: 'intermediate', durationMinutes: 35, exercises: [{ name: 'Warm-up jog', sets: 1, repetitions: 10 }, { name: 'Fast interval', sets: 6, repetitions: 1 }, { name: 'Cool-down walk', sets: 1, repetitions: 8 }], recommendedFor: [users[2]._id] },
      { title: 'Athlete Power Circuit', description: 'A demanding circuit for experienced athletes.', difficulty: 'advanced', durationMinutes: 45, exercises: [{ name: 'Kettlebell swing', sets: 4, repetitions: 12 }, { name: 'Burpee', sets: 4, repetitions: 10 }, { name: 'Mountain climber', sets: 4, repetitions: 20 }], recommendedFor: [users[3]._id] },
    ])

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
