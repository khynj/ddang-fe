import { useQuery, useMutation } from '@tanstack/react-query'
import { axios_spring } from '../utils/axiosInstances'

// 회원가입
export function useSignUp() {
  return useMutation({
    mutationFn: ({ name, nickname, email, password }) => {
      console.log({ name, nickname, email, password })
      return axios_spring
        .post('/member', {
          name,
          nickname,
          email,
          password,
        })
        .then(res => res.data)
    },
  })
}

// 소셜 회원가입 (요청 정보 없음)
export function useSocialSignUp() {
  return useMutation({
    mutationFn: ({ name, nickname, email }) =>
      axios_spring
        .post('/member/social', {
          name,
          nickname,
          email,
        })
        .then(res => res.data),
  })
}

// 프로필 사진 변경
export function useUpdateProfilePhoto() {
  return useMutation({
    mutationFn: formData =>
      axios_spring
        .put('/member/photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => res.data),
  })
}

// 이메일 및 닉네임 중복 조회
export function useCheckDuplicate({ email, nickname }) {
  return useQuery({
    queryKey: ['checkDuplicate', email, nickname],
    queryFn: () =>
      axios_spring
        .get('/member/exist', { params: { email, nickname } })
        .then(res => res.data),
    enabled: !!email || !!nickname,
  })
}

// 회원 정보 조회
export function useMemberInfo(memberId) {
  return useQuery({
    queryKey: ['memberInfo', memberId],
    queryFn: () =>
      axios_spring.get(`/member/${memberId}`).then(res => res.data),
    enabled: !!memberId,
  })
}

// 팔로잉 목록 조회
export function useFollowingList() {
  return useQuery({
    queryKey: ['followingList'],
    queryFn: () => axios_spring.get('/member/following').then(res => res.data),
  })
}

// 팔로우 / 취소
export function useToggleFollow() {
  return useMutation({
    mutationFn: memberId =>
      axios_spring.post(`/member/${memberId}/follow`).then(res => res.data),
  })
}

// 리뷰 조회
export function useMemberReviews({ memberId, type = 'received', role }) {
  return useQuery({
    queryKey: ['memberReviews', memberId, type, role],
    queryFn: () =>
      axios_spring
        .get(`/member/${memberId}/review`, { params: { type, role } })
        .then(res => res.data),
    enabled: !!memberId,
  })
}

// 리뷰 작성
export function useWriteReview() {
  return useMutation({
    mutationFn: reviewData =>
      axios_spring.post('/member/review', reviewData).then(res => res.data),
  })
}

// 선호 지역 조회
export function usePreferredLocations() {
  return useQuery({
    queryKey: ['preferredLocations'],
    queryFn: () => axios_spring.get('/member/location').then(res => res.data),
  })
}

// 선호 지역 등록
export function useAddPreferredLocation() {
  return useMutation({
    mutationFn: locationData =>
      axios_spring.post('/member/location', locationData).then(res => res.data),
  })
}

// 선호 지역 삭제
export function useDeletePreferredLocation() {
  return useMutation({
    mutationFn: memberLocationId =>
      axios_spring
        .delete(`/member/location/${memberLocationId}`)
        .then(res => res.data),
  })
}
