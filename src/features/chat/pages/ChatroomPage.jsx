import { useRef, useState } from 'react'
import usePageName from '../../../hooks/usePageName'
import ChatItem from '../components/ChatItem'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { useParams } from 'react-router'
import { useStompClient } from '../hooks/useStompClient'

function ChatroomPage() {
  usePageName('채팅방')

  const scrollRef = useRef(null)
  const chatRoomId = useParams().id
  const [content, setContent] = useState('')
  const [messages, sendMessage] = useStompClient(chatRoomId, scrollRef)

  const onSubmit = e => {
    e.preventDefault()
    if (content.trim() === '') return
    sendMessage(content)
    setContent('')
  }

  return (
    <div className='flex flex-col justify-between h-[calc(100dvh-56px)]'>
      <div
        className='max-w-svw overflow-x-hidden overflow-y-scroll max-h-[calc(100dvh-56px-5rem)]'
        ref={scrollRef}
      >
        {messages.map((chat, i) => {
          return <ChatItem key={i} chat={chat} />
        })}
      </div>
      <form onSubmit={onSubmit} className='px-4 py-3 flex gap-2'>
        <textarea
          type='text'
          className='w-full rounded-xl p-4 py-3 bg-gray-100'
          placeholder='메시지를 입력하세요.'
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={1}
        />
        <button
          className='p-3 m-auto bg-gray-100 text-gray-700 rounded-xl aspect-square shrink-0 flex items-center justify-center'
          type='submit'
        >
          <MaterialIcon name='send' size={24} filled />
        </button>
      </form>
    </div>
  )
}

export default ChatroomPage
