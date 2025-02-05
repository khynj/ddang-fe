import { Outlet } from 'react-router-dom'
import TabBar from '../../../components/navbar/TabBar'
import usePageName from '../../../hooks/usePageName'

function Favorites() {
  usePageName('찜 목록')

  return (
    <>
      <TabBar
        className='text-xs'
        routes={[
          { to: 'pre', name: '개찰 전 상품' },
          { to: 'ongoing', name: '입찰 중인 상품' },
          { to: 'after', name: '판매 완료 상품' },
        ]}
      />
      <Outlet />
    </>
  )
}

export default Favorites
