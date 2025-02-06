import { Outlet } from 'react-router'
import TabBar from '@/components/navbar/TabBar'
import usePageName from '@/hooks/usePageName'

function ReviewHistoryLayout() {
  usePageName('리뷰내역')

  return (
    <>
      <TabBar
        className='text-sm'
        routes={[
          { to: 'received', name: '받은 리뷰' },
          { to: 'written', name: '작성한 리뷰' },
        ]}
      />
      <Outlet />
    </>
  )
}

export default ReviewHistoryLayout
