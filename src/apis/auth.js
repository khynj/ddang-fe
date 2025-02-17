import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { axios_spring } from '@/utils/axiosInstances'
import { getFCMToken } from '@/features/notification/services/initFCM'

// 인증 관련 API
export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password, deviceToken }) =>
      axios_spring
        .post('/auth/login', {
          email,
          password,
          deviceToken,
        })
        .then(res => res.data),
  })
}

export function useMyInfo() {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: () =>
      axios_spring
        .get('/auth/me', {
          headers: {
            'Device-Token': getFCMToken(),
          },
        })
        .then(res => res.data),
    gcTime: 0,
  })
}

// /auth/logout
export function useSignout() {
  return useMutation({
    mutationFn: () =>
      axios_spring
        .post(
          '/auth/logout',
          {},
          {
            headers: {
              'Device-Token': getFCMToken(),
            },
          },
        )
        .then(res => res.data),
  })
}
