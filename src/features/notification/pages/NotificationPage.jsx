import { useNotifications } from '@/apis/notifications.js'
import usePageName from '../../../hooks/usePageName.js'
import NotificationItem from '../components/NotificationItem.jsx'
import { useEffect } from 'react'

function NotificationPage() {
  usePageName('알림')
  const { data: notifications } = useNotifications()
  return (
    <div>
      {notifications?.notifications.map((notification, index) => (
        <NotificationItem key={index} notification={notification} />
      ))}
    </div>
  )
}

export default NotificationPage
