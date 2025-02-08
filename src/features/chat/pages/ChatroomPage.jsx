import { useEffect } from 'react'
import usePageName from '../../../hooks/usePageName'
import chats from '../data/chats'
import ChatItem from '../components/ChatItem'
import MaterialIcon from '@/components/icons/MaterialIcon'

function ChatroomPage() {
  usePageName('채팅방') // -> get setter
  useEffect(() => {
    // Fetch chatroom data
  }, [])
  return (
    <div className='flex flex-col justify-between h-[calc(100dvh-56px)]'>
      <div className='overflow-y-scroll max-h-[calc(100dvh-56px-5rem)]'>
        {chats.map(chat => {
          return <ChatItem key={chat.chattingId} chat={chat} />
        })}
      </div>
      <div className='px-4 py-3 flex gap-2'>
        <textarea
          type='text'
          className='w-full rounded-xl p-4 py-3 bg-gray-100'
          placeholder='메시지를 입력하세요.'
          rows={1}
        />
        <button className='p-3 m-auto bg-gray-100 text-gray-700 rounded-xl aspect-square shrink-0 flex items-center justify-center'>
          <MaterialIcon name='send' size={24} filled />
        </button>
      </div>
    </div>
  )
}

export default ChatroomPage
