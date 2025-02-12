import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from '@tanstack/react-query'
import AXIOS from '@/utils/axios_'

// 경매 관련 API
export function useCreateAuction() {
  return useMutation({
    mutationFn: formData =>
      AXIOS.post(`/auction`, formData, {
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
/**
 *
 * @param {
 * searchKey,
 * deliveryMethod,
 * status,
 * isFavorite,
 * categoryId,
 * sortType,
 * sortOrder,
 * page,
 * size,
 * isHammered,
 * role,
 * sellerId
 *} params
 * @returns
 */
export function useSearchAuctions(params) {
  const defaultParams = {
    searchKey: '',
    deliveryMethod: '',
    status: '',
    isFavorite: '',
    categoryId: '',
    sortType: 'createdAt',
    sortOrder: 'asc',
    page: 1,
    size: 10,
    isHammered: '',
    role: '',
    sellerId: '',
  }
  return useQuery({
    queryKey: ['searchAuctions', params],
    queryFn: () =>
      AXIOS.get('/auction', { params: { ...defaultParams, ...params } }).then(
        res => res.data,
      ),
  })
}

export function useFollowingAuctions(memberIds, params) {
  return useQueries({
    queries: memberIds.map(memberId => ({
      queryKey: ['searchAuctions', memberId, params],
      queryFn: () =>
        AXIOS.get('/auction', { params: { memberId, ...params } }).then(
          res => res.data,
        ),
    })),
    combine: results => {
      return results.reduce((acc, result) => {
        if (result.isLoading) return acc
        return [...acc, ...result.data]
      }, [])
    },
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
