import PropTypes from 'prop-types'
import { Link } from 'react-router'
import ProfileImage from './ProfileImage'
import MaterialIcon from '@/components/icons/MaterialIcon'
import TrustScoreBar from './TrustScoreBar'
import { useAuth } from '@/contexts/AuthContext'
import { useToggleFollow } from '@/apis/member'
import { useQueryClient } from '@tanstack/react-query'
import LoadingPage from '@/pages/LoadingPage'

function Profile({ userData }) {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const { mutate: toggleFollow } = useToggleFollow()
  const onToggleFollow = () => {
    toggleFollow(userData.memberId, {
      onSuccess: () => {
        queryClient.invalidateQueries('memberInfo')
      },
    })
  }

  if (!userData) return <LoadingPage />

  return (
    <div className='p-6 bg-white'>
      {/* 프로필 이미지 및 이름 섹션 */}
      <div className='flex items-center'>
        <ProfileImage src={userData.profileSrc} size={64} />
        <div className='flex flex-row justify-between items-center w-full ml-4'>
          <p className='text-base font-bold'>{userData.nickname}</p>
          {user.memberId === userData.memberId ? (
            <Link to='/mypage/edit-profile'>
              <button
                style={{
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                }}
              >
                <MaterialIcon
                  name='edit'
                  filled
                  className='text-gray-400'
                  size={20}
                >
                  edit
                </MaterialIcon>
              </button>
            </Link>
          ) : userData.isFollowing ? (
            <button
              onClick={onToggleFollow}
              className='text-sm bg-gray-100 text-black py-2 px-2 rounded-lg cursor-pointer'
            >
              구독취소
            </button>
          ) : (
            <button
              onClick={onToggleFollow}
              className='text-sm bg-ddblue-400 text-white py-2 px-2 rounded-lg cursor-pointer'
            >
              구독하기
            </button>
          )}
        </div>
      </div>

      {/* 신뢰도 섹션 */}
      <div className='mt-5'>
        <div className='flex items-center justify-between'>
          <p className='text-ddblue-400 font-bold text-[14px]'>신뢰도</p>
          <span className='text-sm font-bold'>{userData.reliability}%</span>
        </div>
        {/* 5단계 중 현재 3단계 */}
        <TrustScoreBar trustScore={userData.reliability} />
      </div>
    </div>
  )
}

Profile.propTypes = {
  userData: PropTypes.object.isRequired,
}

export default Profile
