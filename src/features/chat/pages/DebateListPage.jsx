import usePageName from '@/hooks/usePageName'
import DebateItem from '../components/DebateItem'
import { useChatRooms } from '@/apis/chat'
import NoChatroomItem from '../components/NoChatroomItem'
import Spinner from '@/components/placeholder/Spinner'

function DebateListPage() {
  usePageName('토론방')
  const { data: chatrooms } = useChatRooms('GROUP')
  if (!chatrooms) return <Spinner />

  return (
    <div>
      {chatrooms.length > 0 ? (
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
