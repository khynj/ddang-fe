import { useEffect } from 'react'
import usePageName from '../../../hooks/usePageName'
import chats from '../data/chats'
import ChatItem from '../components/ChatItem'
import StickyContainer from '../../../components/StickyContainer'

function ChatroomPage() {
  usePageName('채팅방') // -> get setter
  useEffect(() => {
    // Fetch chatroom data
  }, [])
  return (
    <div>
      {chats.map(chat => {
        return <ChatItem key={chat.chattingId} chat={chat} />
      })}
      <StickyContainer>
        <input
          type='text'
          className='w-full border border-gray-200 rounded-xl p-4'
          placeholder='메시지를 입력하세요.'
        />
      </StickyContainer>
    </div>
  )
}

export default ChatroomPage
