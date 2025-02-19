import usePageName from '@/hooks/usePageName'
import ProductItemHorizontal from '../../product/components/ProductItemHorizontal'
import ProfileImage from '../components/ProfileImage'
import { useFollowingList } from '@/apis/member'
import { useFollowingAuctions } from '@/apis/auction'
import { useEffect, useState } from 'react'
import Placeholder from '@/components/placeholder/Placeholder'
import InlinePlaceholder from '@/components/placeholder/InlinePlaceholder'
import { useLocation } from 'react-router'
import Spinner from '@/components/placeholder/Spinner'
import InlineSpinner from '@/components/placeholder/InlineSpinner'

function SubscriptionsPage() {
  usePageName('모아보기')
  const location = useLocation()
  const [selectedFollowings, setSelectedFollowings] = useState(
    location.state ? location.state.selectedFollowings : [],
  )
  const {
    data: followings,
    isPending: isPendingFollowing,
    isLoadingFollowing,
  } = useFollowingList()
  const {
    data: products,
    isPending: isPendingProduct,
    isLoading: isLoadingProduct,
  } = useFollowingAuctions(
    selectedFollowings.map(following => following.memberId),
  )

  const onProfileClick = memberId => {
    setSelectedFollowings(prev => {
      const index = prev.findIndex(following => following.memberId === memberId)
      if (index === -1) {
        return [...prev, { memberId }]
      } else {
        return prev.filter(following => following.memberId !== memberId)
      }
    })
  }

  useEffect(() => {
    if (followings) {
      setSelectedFollowings(followings.followings)
    }
  }, [followings])

  useEffect(() => {
    if (!location || !followings) return
    location.state = { selectedFollowings: followings.followings }
  }, [selectedFollowings, followings, location])

  if (!followings) return <Spinner />
  if (followings.followings.length === 0)
    return <Placeholder>구독한 사용자가 없어요.</Placeholder>

  return (
    <div>
      <div className='flex overflow-x-scroll gap-1 p-2'>
        {followings?.followings.map(profile => (
          <div
            key={profile.nickname}
            className={`flex flex-col w-18 items-center p-2 rounded-xl
              ${
                selectedFollowings.some(
                  user => user.memberId === profile.memberId,
                )
                  ? 'bg-gray-200'
                  : ''
              }
                `}
            onClick={() => onProfileClick(profile.memberId)}
          >
            <ProfileImage src={profile.imageUrl} size={60} />
            <p
              className='text-sm mt-2 truncate w-full text-center'
              title={profile.nickname}
            >
              {profile.nickname}
            </p>
          </div>
        ))}
      </div>

      <hr className='border-gray-200' />

      <div>
        {isLoadingProduct || isLoadingFollowing ? (
          <InlineSpinner />
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <ProductItemHorizontal key={index} product={product} />
          ))
        ) : (
          <InlinePlaceholder>선택된 판매자의 경매가 없어요.</InlinePlaceholder>
        )}
      </div>
    </div>
  )
}

export default SubscriptionsPage
