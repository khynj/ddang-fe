import usePageName from '../../../hooks/usePageName'
import ChatroomItem from '../components/ChatroomItem'
import chatrooms from '../data/chatrooms'

function ChatroomListPage() {
  usePageName('채팅방')
  return (
    <div>
      {chatrooms.map(chatroom => (
        <ChatroomItem key={chatroom.chattingRoomId} chatroom={chatroom} />
      ))}
    </div>
  )
}

export default ChatroomListPage
