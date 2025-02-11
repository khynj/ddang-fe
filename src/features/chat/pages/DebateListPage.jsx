import usePageName from '@/hooks/usePageName'
import DebateItem from '../components/DebateItem'
import { useChatRooms } from '@/apis/chat'
import NoChatroomItem from '../components/NoChatroomItem'

function DebateListPage() {
  usePageName('토론방')
  const { data: chatrooms } = useChatRooms('GROUP')

  return (
    <div>
      {chatrooms && chatrooms.length > 0 ? (
        chatrooms.map(chatroom => (
          <DebateItem key={chatroom.chattingRoomId} chatroom={chatroom} />
        ))
      ) : (
        <NoChatroomItem />
      )}
    </div>
  )
}

export default DebateListPage
