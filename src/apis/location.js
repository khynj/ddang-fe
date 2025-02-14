import { axios_spring } from '@/utils/axiosInstances'
import { useQuery } from '@tanstack/react-query'

export function useLocations(params) {
  return useQuery({
    queryKey: ['location', params],
    queryFn: () =>
      axios_spring.get(`/location`, { params }).then(res => res.data),
  })
}
