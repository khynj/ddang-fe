import TabBar from '@/components/navbar/TabBar'
import { Outlet } from 'react-router-dom'
import usePageName from '@/hooks/usePageName'
import PropTypes from 'prop-types'

function MyAuctionLayout({ name }) {
  usePageName(`${name}현황`)
  return (
    <div className='flex flex-col'>
      <TabBar
        routes={[
          {
            index: true,
            name: `${name}중인 상품`,
            to: '',
            end: true,
          },
          {
            name: '낙찰된 상품',
            to: 'sold',
          },
        ]}
      />
      <Outlet />
    </div>
  )
}

MyAuctionLayout.propTypes = {
  name: PropTypes.string,
}

export default MyAuctionLayout
