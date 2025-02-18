import { useNotifications } from '@/apis/notifications.js'
import usePageName from '../../../hooks/usePageName.js'
import NotificationItem from '../components/NotificationItem.jsx'
import Placeholder from '@/components/placeholder/Placeholder.jsx'

function NotificationPage() {
  usePageName('알림')
  const { data: notifications } = useNotifications()
  return (
    <div>
      {notifications && notifications.notifications.length > 0 ? (
        notifications.notifications.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))
      ) : (
        <Placeholder>아직 알림이 없네요.</Placeholder>
      )}
    </div>
  )
}

export default NotificationPage
