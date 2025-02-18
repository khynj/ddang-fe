import { useChatRooms } from '@/apis/chat'
import usePageName from '@/hooks/usePageName'
import ChatroomItem from '../components/ChatroomItem'
import NoChatroomItem from '../components/NoChatroomItem'
import Spinner from '@/components/placeholder/Spinner'

function ChatroomListPage() {
  usePageName('채팅방')
  const { data: chatrooms } = useChatRooms('PRIVATE')
  if (!chatrooms) return <Spinner />
  return (
    <div>
      {chatrooms.length > 0 ? (
        chatrooms.map(chatroom => (
          <ChatroomItem key={chatroom.chattingRoomId} chatroom={chatroom} />
        ))
      ) : (
        <NoChatroomItem />
      )}
    </div>
  )
}

export default ChatroomListPage
