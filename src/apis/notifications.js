import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { axios_spring } from '@/utils/axiosInstances'

// 알림 관련 API
export function useNotifications(page = 1, size = 10) {
  return useQuery({
    queryKey: ['notifications', page, size],
    queryFn: () =>
      axios_spring
        .get('/notification', { params: { page, size } })
        .then(res => res.data),
  })
}

export function useUnreadNotificationStatus() {
  return useQuery({
    queryKey: ['unreadNotificationStatus'],
    queryFn: () =>
      axios_spring.get('/notification/unread').then(res => res.data),
  })
}
