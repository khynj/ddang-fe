import { useEffect, useState } from 'react'
import usePageName from '../../../hooks/usePageName'
import ChatItem from '../components/ChatItem'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { useParams } from 'react-router'
import Stomp from 'stompjs'

const SOCKET_URL = 'http://127.0.0.1:8080/ws-stomp' // Replace with your WebSocket URL

function ChatroomPage() {
  usePageName('채팅방')

  const [stompClient, setStompClient] = useState(null)
  const [messages, setMessages] = useState([])
  const [content, setContent] = useState('')
  const chatRoomId = useParams().id

  useEffect(() => {
    const socket = new WebSocket(SOCKET_URL) // Use native WebSocket instead of SockJS
    const stomp = Stomp.over(socket)

    stomp.connect({}, () => {
      console.log('Connected to STOMP server')

      // Subscribe to chat room messages
      const subscription = stomp.subscribe(
        `/sub/chat/room/${chatRoomId}`,
        message => {
          console.log(message)
          setMessages(prev => [...prev, JSON.parse(message.body)])
        },
      )

      setStompClient(stomp)

      return () => {
        subscription.unsubscribe() // Unsubscribe on cleanup
        stomp.disconnect()
      }
    })
  }, [chatRoomId])

  const sendMessage = () => {
    if (stompClient) {
      stompClient.send(
        `/pub/chat/message/${chatRoomId}`,
        {},
        JSON.stringify({ memberId: 1, content }),
      )
    }
  }

  return (
    <div className='flex flex-col justify-between h-[calc(100dvh-56px)]'>
      <div className='overflow-y-scroll max-h-[calc(100dvh-56px-5rem)]'>
        {messages.map((chat, i) => {
          return <ChatItem key={i} chat={chat} />
        })}
      </div>
      <div className='px-4 py-3 flex gap-2'>
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
          onClick={sendMessage}
        >
          <MaterialIcon name='send' size={24} filled />
        </button>
      </div>
    </div>
  )
}

export default ChatroomPage
