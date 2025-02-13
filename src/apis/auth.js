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
        .then(res => {
          console.log(document.cookie)
          return res.data
        }),
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
  })
}

// export function useSocialLogin() {
//   // return useMutation({
//   //   mutationFn: providerName =>
//   //     axios_spring.post(`/oauth2/authorization/${providerName}`).then(res => res.data),
//   // })
//   // to get

//   return useQuery({
//     queryKey: ['socialLogin'],
//     queryFn: providerName =>
//       axios_spring.get(`/oauth2/authorization/${providerName}`).then(res => res.data),
//   })
// }
