import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <section className="view-section"><div className="section-heading"><span className="eyebrow">TEAMS</span><h1>Find your people</h1><p>Small groups make ambitious goals feel lighter.</p></div><CollectionState {...state} /><div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id}><div className="team-line" style={{ backgroundColor: team.color }} /><h2>{team.name}</h2><p>{team.description}</p><strong>{team.members?.length || 0} members</strong></article>)}</div></section>
}

export default Teams