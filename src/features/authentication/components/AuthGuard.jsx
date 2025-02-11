import { useAuth } from '@/contexts/AuthContext'
import ROUTES from '@/data/ROUTES'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

function AuthGuard() {
  const route = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      route(ROUTES.WELCOME)
    }
  }, [user, route])

  return <Outlet />
}

export default AuthGuard
