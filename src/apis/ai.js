import { useQuery, useMutation, useQueries } from '@tanstack/react-query'
import { axios_ai } from '@/utils/axiosInstances'

export function useCategoryRecommendation() {
  return useMutation({
    mutationFn: ({ title }) =>
      axios_ai.post(`/recommend/category`, { title }).then(res => res.data),
  })
}
