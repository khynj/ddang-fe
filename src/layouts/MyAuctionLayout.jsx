import TabBar from '@/components/navbar/TabBar'
import { Outlet } from 'react-router-dom'
import usePageName from '@/hooks/usePageName'
import PropTypes from 'prop-types'

function MyAuctionLayout({ name, tabs }) {
  usePageName(name)
  return (
    <div className='flex flex-col'>
      <TabBar
        routes={tabs.map(tab => ({
          name: tab.name,
          to: tab.to,
          end: tab.end,
        }))}

        //   [
        //   {
        //     index: true,
        //     name: `${name}중인 상품`,
        //     to: '',
        //     end: true,
        //   },
        //   {
        //     name: '낙찰된 상품',
        //     to: 'sold',
        //   },
        // ]
      />
      <Outlet />
    </div>
  )
}

MyAuctionLayout.propTypes = {
  name: PropTypes.string,
  tabs: PropTypes.array,
}

export default MyAuctionLayout
