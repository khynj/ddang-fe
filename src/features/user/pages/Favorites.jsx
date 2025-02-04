import { Outlet } from 'react-router-dom'
import TabBar from '../../../components/navbar/TabBar'
import usePageName from '../../../hooks/usePageName'

function Favorites() {
  usePageName('찜 목록')

  return (
    <>
      <TabBar
        routes={[
          { to: 'pre', name: '개찰 전' },
          { to: 'ongoing', name: '개찰 후' },
          { to: 'after', name: '판매완료' },
        ]}
      />
      <Outlet />
    </>
  )
}

export default Favorites
