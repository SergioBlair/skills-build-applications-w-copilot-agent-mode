import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection('users').then(setUsers).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <section className="view-section"><div className="section-heading"><span className="eyebrow">COMMUNITY</span><h1>People in motion</h1><p>Meet the athletes building stronger habits together.</p></div><CollectionState {...state} /><div className="people-grid">{users.map((user) => <article className="person-card" key={user._id}><div className="avatar">{user.name?.charAt(0)}</div><div><h2>{user.name}</h2><p>@{user.username}</p><small>{user.email}</small></div></article>)}</div></section>
}

export default Users