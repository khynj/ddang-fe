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

/**


    @GetMapping("/deposit/success")
    public ResponseEntity<KakaoApproveResponse> depositSuccess(
            @RequestParam("pg_token") String pgToken,
            @RequestParam("order_id") String orderId) {
        log.info("결제 승인 요청: pg_token={}, order_id={}", pgToken, orderId);
        KakaoApproveResponse response = kakaoPayService.approveDeposit(pgToken, orderId);
        return ResponseEntity.ok(response);
    }
 */

// 페이 충전 성공
export function usePayDepositSuccess() {
  return useMutation({
    mutationFn: ({ pgToken, orderId }) =>
      AXIOS.get('/pay/deposit/success', { params: { pgToken, orderId } }).then(
        res => res.data,
      ),
  })
}
