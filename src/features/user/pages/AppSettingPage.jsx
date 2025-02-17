import usePageName from '../../../hooks/usePageName'
import MyPageMenu from '../components/MyPageMenu'
import { Outlet } from 'react-router'
import useFcmToken from '../hooks/useFcmToken'
import { useAuth } from '@/contexts/AuthContext'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { useSignout } from '@/apis/auth'

function AppSettingPage() {
  usePageName('앱 설정')
  const fcmToken = useFcmToken()

  const copyToken = () => {
    navigator.clipboard.writeText(fcmToken)
  }

  const { user, login, logout } = useAuth()
  const { mutate: requestLogout } = useSignout()

  const onLogout = () => {
    requestLogout()
    logout()
  }

  return (
    <div className='flex flex-col bg-white'>
      <main>
        <MyPageMenu
          icon={{ name: 'lock', size: 24, color: 'gray-950' }}
          title='비밀번호 변경'
          to='/mypage/app-setting/change-password'
        />

        <button onClick={onLogout} className='flex items-center gap-2 p-4 px-6'>
          <MaterialIcon name='logout' size={24} color='gray-950' />
          <span className=' font-bold text-base text-gray-800'>로그아웃</span>
        </button>
        {/* <button onClick={signout} className='flex items-center gap-2 p-4 px-6'>
          <MyPageMenu
            icon={{ name: 'exit_to_app', size: 24, color: 'gray-950' }}
            title='탈퇴하기'
          />
        </button> */}
        <div className='flex flex-col p-4'>
          <p className='whitespace-normal break-normal'>{fcmToken}</p>
          <button className='p-2 bg-gray-200 rounded-xl' onClick={copyToken}>
            copy token
          </button>
        </div>
      </main>
      <Outlet />
    </div>
  )
}

export default AppSettingPage
