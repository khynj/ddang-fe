import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AXIOS from '@/utils/axios_'
// 채팅 관련 API
export function useChatRooms(type = 'GROUP') {
  return useQuery({
    queryKey: ['chatRooms', type],
    queryFn: () =>
      AXIOS.get('/chatting', { params: { type } }).then(res => res.data),
  })
}

export function useJoinChatRoom() {
  return useMutation({
    mutationFn: chattingRoomId =>
      AXIOS.post(`/chatting/${chattingRoomId}/join`).then(res => res.data),
  })
}

export function useLeaveChatRoom() {
  return useMutation({
    mutationFn: chattingRoomId =>
      AXIOS.post(`/chatting/${chattingRoomId}/leave`).then(res => res.data),
  })
}

export function useChatHistory(chattingRoomId) {
  return useQuery({
    queryKey: ['chatHistory', chattingRoomId],
    queryFn: () =>
      AXIOS.get(`/chatting/${chattingRoomId}`).then(res => res.data),
  })
}
