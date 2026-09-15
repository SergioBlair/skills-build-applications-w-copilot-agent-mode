# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey SergioBlair!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/SergioBlair/skills-build-applications-w-copilot-agent-mode/issues/1)

## OctoFit Tracker Status

The OctoFit Tracker backend data tier is configured and working:

- Node.js and Express API runs on port `8000`.
- MongoDB uses `mongodb://localhost:27017/octofit_db` through Mongoose.
- Mongoose models exist for users, teams, activities, leaderboard, and workouts.
- The database seed script creates realistic sample data for every collection.
- API routes return data from MongoDB instead of placeholder arrays.
- The API base URL uses `https://$CODESPACE_NAME-8000.app.github.dev` in Codespaces and `http://localhost:8000` locally.

### Run the backend

Make sure MongoDB is running, then run:

```bash
npm install --prefix octofit-tracker/backend
npm run seed --prefix octofit-tracker/backend
npm run dev --prefix octofit-tracker/backend
```

The database name and connection string can be overridden with `MONGODB_URI`.

### Verify the API

With the backend running, these commands should return seeded JSON data:

```bash
curl http://localhost:8000/api/health
curl http://localhost:8000/api/users
curl http://localhost:8000/api/activities
```

The complete API also exposes `/api/teams`, `/api/leaderboard`, and `/api/workouts`.

