import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection('activities').then(setActivities).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <section className="view-section"><div className="section-heading"><span className="eyebrow">ACTIVITY LOG</span><h1>Every effort counts</h1><p>A clear record of the work your community is putting in.</p></div><CollectionState {...state} /><div className="activity-list">{activities.map((activity) => <article className="activity-row" key={activity._id}><div className="activity-mark">{activity.type?.charAt(0)}</div><div><h2>{activity.type}</h2><p>{activity.user?.name || 'OctoFit athlete'} · {new Date(activity.completedAt).toLocaleDateString()}</p></div><strong>{activity.durationMinutes} min</strong><span>{activity.calories} kcal</span></article>)}</div></section>
}

export default Activities