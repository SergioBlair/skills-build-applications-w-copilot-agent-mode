export function CollectionState({ loading, error }) {
  if (loading) return <p className="status-message">Loading your OctoFit data...</p>
  if (error) return <p className="status-message status-error">{error}</p>
  return null
}