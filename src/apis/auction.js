import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AXIOS from '@/utils/axios_'

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

export function useCategory(parent) {
  return useQuery({
    queryKey: ['category', { parent: parent }],
    queryFn: () =>
      AXIOS.get(`/category?parent=${parent}`).then(res => res.data),
  })
}
