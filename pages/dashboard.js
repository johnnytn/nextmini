import useAuth from '../hooks/useAuth'

export default function Dashboard() {
  const { user } = useAuth()
  return (
    <div>
      <h2>Dashboard: {user?.displayName}</h2>
    </div>
  )
}
