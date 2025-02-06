import usePageName from '../../../hooks/usePageName'
import MyPageMenu from '../components/MyPageMenu'
import { Outlet } from 'react-router-dom'

function AppSettingPage() {
  usePageName('앱 설정')

  return (
    <div className='min-h-screen bg-white'>
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
      </main>
      <Outlet />
    </div>
  )
}

export default AppSettingPage
