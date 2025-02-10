import { useChatRooms } from '@/apis/chat'
import usePageName from '@/hooks/usePageName'
import ChatroomItem from '../components/ChatroomItem'

function ChatroomListPage() {
  usePageName('채팅방')
  const { data: chatrooms } = useChatRooms('PRIVATE')
  return (
    <div>
      {chatrooms?.map(chatroom => (
        <ChatroomItem key={chatroom.chattingRoomId} chatroom={chatroom} />
      ))}
    </div>
  )
}

export default ChatroomListPage
