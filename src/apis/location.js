import { axios_spring } from '@/utils/axiosInstances'
import { useQuery } from '@tanstack/react-query'

export function useLocations(key) {
  return useQuery({
    queryKey: ['location', key],
    queryFn: () =>
      axios_spring.get(`/location?searchKey=${key}`).then(res => res.data),
  })
}
