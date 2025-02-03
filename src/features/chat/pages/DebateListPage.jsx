import usePageName from '@/hooks/usePageName'
import chatrooms from '../data/chatrooms'
import DebateItem from '../components/DebateItem'

function DebateListPage() {
  usePageName('토론방')
  return (
    <div>
      {chatrooms.map(chatroom => (
        <DebateItem key={chatroom.id} chatroom={chatroom} />
      ))}
    </div>
  )
}

export default DebateListPage
