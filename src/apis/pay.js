import { useQuery, useMutation } from '@tanstack/react-query'
import AXIOS from '@/utils/axios_'

// 페이 정보 조회
export function usePayInfo() {
  return useQuery({
    queryKey: ['payInfo'],
    queryFn: () => AXIOS.get('/pay').then(res => res.data),
  })
}

// 페이 내역 조회 (페이지네이션 지원)
export function usePayHistory(page = 1, size = 10) {
  return useQuery({
    queryKey: ['payHistory', page, size],
    queryFn: () =>
      AXIOS.get('/pay/history', { params: { page, size } }).then(
        res => res.data,
      ),
  })
}

// 페이 충전
export function usePayDeposit() {
  return useMutation({
    mutationFn: ({ amount, paymentMethod }) =>
      AXIOS.post('/pay/deposit', { amount, paymentMethod }).then(
        res => res.data,
      ),
  })
}
