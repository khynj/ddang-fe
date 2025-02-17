import usePageName from '@/hooks/usePageName'
import ProductItemHorizontal from '../../product/components/ProductItemHorizontal'
import ProfileImage from '../components/ProfileImage'
import { useFollowingList } from '@/apis/member'
import { useFollowingAuctions } from '@/apis/auction'
import { useEffect, useState } from 'react'

function SubscriptionsPage() {
  usePageName('모아보기')
  const [selectedFollowings, setSelectedFollowings] = useState([])
  const { data: followings } = useFollowingList()
  const { data: products } = useFollowingAuctions(
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
    console.log(selectedFollowings)
  }, [selectedFollowings])

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
                  ? 'bg-gray-300'
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

      <div>
        {products?.map((product, index) => (
          <ProductItemHorizontal key={index} product={product} />
        ))}
      </div>
    </div>
  )
}

export default SubscriptionsPage
