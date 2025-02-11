import usePageName from '@/hooks/usePageName'
import DebateItem from '../components/DebateItem'
import { useChatRooms } from '@/apis/chat'

function DebateListPage() {
  usePageName('토론방')
  const { data: chatrooms } = useChatRooms('GROUP')

  return (
    <div>
      {chatrooms.map(chatroom => (
        <DebateItem key={chatroom.chattingRoomId} chatroom={chatroom} />
      ))}
    </div>
  )
}

export default DebateListPage
