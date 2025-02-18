import { useLocation, useNavigate } from 'react-router'
import usePageName from '@/hooks/usePageName'
import { useEffect } from 'react'
import ROUTES from '@/data/ROUTES'
import { useMyInfo } from '@/apis/auth'
import LoadingPage from '@/pages/LoadingPage'
import { useAuth } from '@/contexts/AuthContext'

function LandingPage() {
  usePageName('로그인')
  const route = useNavigate()
  const state = useLocation().state

  const { data: myInfo } = useMyInfo()
  const { setUser } = useAuth()
  useEffect(() => {
    if (myInfo && setUser) {
      setUser(myInfo)
      route(ROUTES.HOME, { state })
    }
  }, [myInfo, route, setUser, state])

  return (
    <div className='flex h-full w-full justify-center items-center'>
      <LoadingPage />
    </div>
  )
}

export default LandingPage
