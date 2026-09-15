import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <section className="view-section"><div className="section-heading"><span className="eyebrow">WORKOUT LIBRARY</span><h1>Train with intention</h1><p>Choose a session that meets you where you are today.</p></div><CollectionState {...state} /><div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><div className="workout-top"><span className="difficulty">{workout.difficulty}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><ul>{workout.exercises?.map((exercise) => <li key={exercise.name}>{exercise.name}<span>{exercise.sets} × {exercise.repetitions}</span></li>)}</ul></article>)}</div></section>
}

export default Workouts