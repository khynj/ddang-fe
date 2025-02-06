import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AXIOS from '@/utils/axios_'

// 알림 관련 API
export function useNotifications(page = 1, size = 10) {
  return useQuery({
    queryKey: ['notifications', page, size],
    queryFn: () =>
      AXIOS.get('/notification', { params: { page, size } }).then(
        res => res.data,
      ),
  })
}

export function useUnreadNotificationStatus() {
  return useQuery({
    queryKey: ['unreadNotificationStatus'],
    queryFn: () => AXIOS.get('/notification/unread').then(res => res.data),
  })
}

// 인증 관련 API
export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }) =>
      AXIOS.post('/api/auth/login', { email, password }).then(res => res.data),
  })
}

export function useSocialLogin() {
  return useMutation({
    mutationFn: providerName =>
      AXIOS.post(`/auth/login/oauth2/authorization/${providerName}`).then(
        res => res.data,
      ),
  })
}

// 경매 관련 API
export function useCreateAuction() {
  return useMutation({
    mutationFn: formData =>
      AXIOS.post('/auction', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(res => res.data),
  })
}

export function useUpdateAuction() {
  return useMutation({
    mutationFn: ({ auctionId, formData }) =>
      AXIOS.patch(`/auction/${auctionId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(res => res.data),
  })
}

export function useDeleteAuction() {
  return useMutation({
    mutationFn: auctionId =>
      AXIOS.delete(`/auction/${auctionId}`).then(res => res.data),
  })
}

export function useToggleFavorite() {
  return useMutation({
    mutationFn: auctionId =>
      AXIOS.post(`/auction/${auctionId}/favorite`).then(res => res.data),
  })
}

export function useAuctionDetails(auctionId) {
  return useQuery({
    queryKey: ['auctionDetails', auctionId],
    queryFn: () => AXIOS.get(`/auction/${auctionId}`).then(res => res.data),
  })
}

export function useAuctionSearchHistory() {
  return useQuery({
    queryKey: ['auctionSearchHistory'],
    queryFn: () => AXIOS.get('/auction/search/history').then(res => res.data),
  })
}

export function useDeleteAuctionSearchHistory() {
  return useMutation({
    mutationFn: memberSearchHistoryId =>
      AXIOS.delete(`/auction/search/${memberSearchHistoryId}`).then(
        res => res.data,
      ),
  })
}

export function useSearchAuctions(params) {
  return useQuery({
    queryKey: ['searchAuctions', params],
    queryFn: () => AXIOS.get('/auction', { params }).then(res => res.data),
  })
}

export function useBidAuction() {
  return useMutation({
    mutationFn: ({ auctionId, bidPrice }) =>
      AXIOS.post(`/auction/${auctionId}/bid`, { bidPrice }).then(
        res => res.data,
      ),
  })
}

export function usePurchaseAuction() {
  return useMutation({
    mutationFn: auctionId =>
      AXIOS.post(`/auction/${auctionId}/purchase`).then(res => res.data),
  })
}

export function useConfirmPurchase() {
  return useMutation({
    mutationFn: auctionId =>
      AXIOS.post(`/auction/${auctionId}/confirm`).then(res => res.data),
  })
}

// 채팅 관련 API
export function useChatRooms(type = 'open') {
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
