import MyPageMenu from '../components/MyPageMenu'
import usePageName from '@/hooks/usePageName'
import Profile from '../components/Profile'
import menus from '../data/menus'
import { useAuth } from '@/contexts/AuthContext'
import { useMemberInfo } from '@/apis/member'
import Payment from './Payment'

function MyPage() {
  usePageName('마이페이지')

  const { user } = useAuth()
  const { data: userData } = useMemberInfo(user?.memberId)

  return (
    <div>
      {/* 프로필 섹션 */}
      <Profile
        profileSrc={userData?.imageUrl}
        name={user?.nickname}
        trustScore={userData?.reliability}
        id={user?.memberId}
      />
      <hr className='border-gray-200' />

      {/* 땅땅머니 섹션 */}
      <Payment />

      {/* 메뉴 섹션 */}
      <section className='py-1'>
        <nav className='flex flex-col gap-2'>
          {menus &&
            menus.map(menuCategory => (
              <div key={menuCategory[0].to}>
                {menuCategory.map(menu => (
                  <MyPageMenu
                    key={menu.to}
                    {...menu}
                    icon={{ name: menu.icon }}
                  />
                ))}
                <hr className='border-gray-200' />
              </div>
            ))}
        </nav>
      </section>
    </div>
  )
}

export default MyPage
