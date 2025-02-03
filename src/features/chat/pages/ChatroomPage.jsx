import { useEffect } from 'react'
import usePageName from '../../../hooks/usePageName'

function ChatroomPage() {
  usePageName('채팅방') // -> get setter
  useEffect(() => {
    // Fetch chatroom data
  }, [])
  return <div>ChatroomPage</div>
}

export default ChatroomPage
