import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection('leaderboard').then(setLeaders).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <section className="view-section"><div className="section-heading"><span className="eyebrow">LEADERBOARD</span><h1>Momentum, measured</h1><p>Celebrate consistency, not just the finish line.</p></div><CollectionState {...state} /><div className="leaderboard">{leaders.map((leader) => <article className="leader-row" key={leader._id}><span className="rank">{String(leader.rank).padStart(2, '0')}</span><div><h2>{leader.user?.name || 'Athlete'}</h2><p>{leader.team?.name || 'Independent'}</p></div><strong>{leader.points.toLocaleString()} pts</strong><span>{leader.weeklyPoints} this week</span></article>)}</div></section>
}

export default Leaderboard