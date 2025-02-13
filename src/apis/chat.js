import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { axios_spring } from '@/utils/axiosInstances'
// 채팅 관련 API
export function useChatRooms(type = 'GROUP') {
  return useQuery({
    queryKey: ['chatRooms', type],
    queryFn: () =>
      axios_spring.get('/chatting', { params: { type } }).then(res => res.data),
  })
}

export function useJoinChatRoom() {
  return useMutation({
    mutationFn: chattingRoomId =>
      axios_spring
        .post(`/chatting/${chattingRoomId}/join`)
        .then(res => res.data),
  })
}

export function useLeaveChatRoom() {
  return useMutation({
    mutationFn: chattingRoomId =>
      axios_spring
        .post(`/chatting/${chattingRoomId}/leave`)
        .then(res => res.data),
  })
}

export function useChatHistory(chattingRoomId) {
  return useQuery({
    queryKey: ['chatHistory', chattingRoomId],
    queryFn: () =>
      axios_spring.get(`/chatting/${chattingRoomId}`).then(res => res.data),
  })
}
