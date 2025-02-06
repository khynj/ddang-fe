import usePageName from '../../../hooks/usePageName'
import MyPageMenu from '../components/MyPageMenu'
import { Outlet } from 'react-router-dom'
import useFcmToken from '../hooks/useFcmToken'

function AppSettingPage() {
  usePageName('앱 설정')
  const fcmToken = useFcmToken()

  const copyToken = () => {
    navigator.clipboard.writeText(fcmToken)
  }

  return (
    <div className='flex flex-col bg-white'>
      <main>
        <MyPageMenu
          icon={{ name: 'lock', size: 24, color: 'gray-950' }}
          title='비밀번호 변경'
          to='/mypage/app-setting/change-password'
        />
        <MyPageMenu
          icon={{ name: 'logout', size: 24, color: 'gray-950' }}
          title='로그아웃'
          to='/logout'
        />
        <MyPageMenu
          icon={{ name: 'exit_to_app', size: 24, color: 'gray-950' }}
          title='탈퇴하기'
          to='/delete-account'
        />
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
