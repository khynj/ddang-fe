import { useChatRooms } from '@/apis/chat'
import usePageName from '@/hooks/usePageName'
import ChatroomItem from '../components/ChatroomItem'
import NoChatroomItem from '../components/NoChatroomItem'

function ChatroomListPage() {
  usePageName('채팅방')
  const { data: chatrooms } = useChatRooms('PRIVATE')
  return (
    <div>
      {chatrooms && chatrooms.length > 0 ? (
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
