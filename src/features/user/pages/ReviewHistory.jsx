import { Outlet } from 'react-router-dom'
import TabBar from '../../../components/navbar/TabBar'
import usePageName from '../../../hooks/usePageName'

function ReviewHistory() {
  usePageName('리뷰내역')

  return (
    <>
      <TabBar
        routes={[
          { to: 'received', name: '받은 리뷰' },
          { to: 'written', name: '작성한 리뷰' },
        ]}
      />
      <Outlet />
    </>
  )
}

export default ReviewHistory
