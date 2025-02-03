import usePageName from '../../../hooks/usePageName.js'
import NotificationItem from '../components/NotificationItem.jsx'
import notifications from '../data/notifications.js'

function NotificationPage() {
  usePageName('알림')
  return (
    <div>
      {notifications.map((notification, index) => (
        <NotificationItem key={index} notification={notification} />
      ))}
    </div>
  )
}

export default NotificationPage
