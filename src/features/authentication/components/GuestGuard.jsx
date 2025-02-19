import { useAuth } from '@/contexts/AuthContext'
import ROUTES from '@/data/ROUTES'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

function GuestGuard() {
  const route = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      route(ROUTES.HOME)
    }
  }, [user, route])

  if (!user) return <Outlet />
  else return null
}

export default GuestGuard
