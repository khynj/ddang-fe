import { axios_spring } from '@/utils/axiosInstances'
import { useInfiniteQuery } from '@tanstack/react-query'

export function useLocations(params) {
  return useInfiniteQuery({
    queryKey: ['location', params],
    queryFn: ({ pageParam }) =>
      axios_spring
        .get(`/location`, { params: { ...params, page: pageParam } })
        .then(res => res.data),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPageParam + 1
    },
    initialPageParam: 1,
  })
}
