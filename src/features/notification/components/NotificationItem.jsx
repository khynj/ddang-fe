import PropTypes from 'prop-types'
import { Link } from 'react-router'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { shortRelativeTime } from '@/utils/date'

const icon = {
  HAMMER_FOR_SELLER: 'check',
  HAMMER_FOR_BUYER: 'gavel',
  NEW_BID: 'gavel',
  FAILED_AUCTION: 'close',
  OUTBID: 'close',
}

function NotificationItem({ notification }) {
  const sentAt = shortRelativeTime(notification.sentAt)
  return (
    <Link
      to={notification.url}
      className={`flex items-center p-4 gap-4 border-b border-gray-200 ${
        notification.isRead ? `opacity-50` : ''
      }`}
    >
      <div className='flex flex-grow-0 border-1 border-gray-500 rounded-full p-1'>
        <MaterialIcon
          name={icon[notification.notificationType]}
          size={24}
          className={'text-gray-600'}
        />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div className='flex justify-between w-full text-sm text-gray-700'>
          <div>{notification.title}</div>
          <div>{sentAt}</div>
        </div>
        <div className='text-gray-900 font-bold'>{notification.content}</div>
      </div>
    </Link>
  )
}

NotificationItem.propTypes = {
  notification: PropTypes.object,
}

export default NotificationItem
