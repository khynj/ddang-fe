import { useNavigate } from 'react-router'
import usePageName from '@/hooks/usePageName'
import { useEffect } from 'react'
import ROUTES from '@/data/ROUTES'
import { useMyInfo } from '@/apis/auth'
import LoadingPage from '@/pages/LoadingPage'

function SocialLandingPage() {
  usePageName('소셜 로그인')
  const route = useNavigate()
  const { data: myInfo } = useMyInfo()
  useEffect(() => {
    if (myInfo) {
      route(ROUTES.HOME)
    }
  }, [myInfo, route])

  return (
    <div className='flex h-full w-full justify-center items-center'>
      <LoadingPage />
    </div>
  )
}

export default SocialLandingPage
