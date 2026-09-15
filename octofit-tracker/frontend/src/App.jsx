import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { API_BASE_URL } from './api.js'
import './App.css'

const navigation = [
  { to: '/', label: 'Overview', end: true },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Athletes' },
  { to: '/workouts', label: 'Workouts' },
]

function Overview() {
  return <section className="view-section overview"><span className="eyebrow">OCTOFIT TRACKER</span><h1>Make progress<br /><em>visible.</em></h1><p>One place for the movement, people, and momentum that keep your team going.</p><NavLink className="primary-action" to="/activities">View activity <span>→</span></NavLink></section>
}

function App() {
  return <div className="app-shell"><header className="topbar"><NavLink className="brand" to="/"><img src="/octofitapp-small.png" alt="" /> <span>octofit<span>.</span></span></NavLink><nav aria-label="Primary navigation">{navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end}>{item.label}</NavLink>)}</nav><div className="connection"><span /> API online <small>{API_BASE_URL.replace(/^https?:\/\//, '')}</small></div></header><main><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main><footer><span>Built for better habits.</span><span>OCTOFIT / 2026</span></footer></div>
}

export default App