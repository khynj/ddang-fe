import { useRef, useState } from 'react'
import usePageName from '../../../hooks/usePageName'
import ChatItem from '../components/ChatItem'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { useParams } from 'react-router'
import { useStompClient } from '../hooks/useStompClient'
import Placeholder from '@/components/placeholder/Placeholder'

function ChatroomPage() {
  usePageName('채팅방')

  const scrollRef = useRef(null)
  const chatRoomId = useParams().id
  const [content, setContent] = useState('')
  const [messages, sendMessage] = useStompClient(chatRoomId, scrollRef)
  const [error, setError] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    if (content.trim() === '') return
    sendMessage(content)
    setError('')
    setContent('')
  }

  const onChange = e => {
    if (e.target.value.length > 500)
      return setError('500자 이내로 입력해주세요.')
    setError('')
    setContent(e.target.value)
  }

  return (
    <div className='flex flex-col justify-between h-[calc(100dvh-56px)]'>
      <div
        className='max-w-svw overflow-x-hidden overflow-y-scroll h-[calc(100dvh-56px-5rem)]'
        ref={scrollRef}
      >
        {messages.length > 0 ? (
          messages.map((chat, i) => {
            return <ChatItem key={i} chat={chat} />
          })
        ) : (
          <Placeholder>아직 채팅이 없어요.</Placeholder>
        )}
      </div>
      <form onSubmit={onSubmit} className='px-4 py-3 flex gap-2'>
        <p
          className='text-ddred-500 text-sm absolute 
          transform -translate-y-1/1
        '
        >
          {error}
        </p>
        <textarea
          type='text'
          className={`w-full rounded-xl p-4 py-3 bg-gray-100 no-scrollbar ${
            error ? 'text-ddred-500' : ''
          }`}
          placeholder='메시지를 입력하세요.'
          value={content}
          onChange={onChange}
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
