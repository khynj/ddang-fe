import AXIOS from '@/utils/axios_'
import { useQuery } from '@tanstack/react-query'

export function useLocations(key) {
  return useQuery({
    queryKey: ['location', key],
    queryFn: () =>
      AXIOS.get(`/location?searchKey=${key}`).then(res => res.data),
  })
}
