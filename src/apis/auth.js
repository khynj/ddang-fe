import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AXIOS from '@/utils/axios_'

// 인증 관련 API
export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }) =>
      AXIOS.post('/auth/login', {
        email,
        password,
      }).then(res => {
        console.log(document.cookie)
        return res.data
      }),
  })
}

export function useSocialLogin() {
  return useMutation({
    mutationFn: providerName =>
      AXIOS.post(`/oauth2/authorization/${providerName}`).then(res => res.data),
  })
}
