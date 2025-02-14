import { useChatHistory } from '@/apis/chat'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import Stomp from 'stompjs'

const SOCKET_URL = `${
  import.meta.env.PROD
    ? import.meta.env.VITE_SERVER_URL
    : import.meta.env.VITE_DEV_SERVER_URL
}/api/ws-stomp` // Replace with your WebSocket URL

export function useStompClient(id, scrollRef) {
  const [stompClient, setStompClient] = useState(null)
  const [messages, setMessages] = useState([])
  const { data: chatHistory, isSuccess } = useChatHistory(id)
  const { user } = useAuth()

  const sendMessage = message => {
    if (stompClient) {
      stompClient.send(
        `/pub/chat/message/${id}`,
        {},
        JSON.stringify({ memberId: user.memberId, content: message }),
      )
    }
  }

  useEffect(() => {
    if (!isSuccess || !chatHistory) return
    setMessages(chatHistory.chat)
  }, [isSuccess, chatHistory])

  useEffect(() => {
    const socket = new WebSocket(SOCKET_URL) // Use native WebSocket instead of SockJS
    const stomp = Stomp.over(socket)

    stomp.connect({}, () => {
      console.log('Connected to STOMP server')

      // Subscribe to chat room messages
      const subscription = stomp.subscribe(`/sub/chat/room/${id}`, message => {
        console.log(message)
        setMessages(prev => [...prev, JSON.parse(message.body)])
      })

      setStompClient(stomp)

      return () => {
        subscription.unsubscribe() // Unsubscribe on cleanup
        stomp.disconnect()
      }
    })
  }, [id])

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, scrollRef])

  return [messages, sendMessage]
}
