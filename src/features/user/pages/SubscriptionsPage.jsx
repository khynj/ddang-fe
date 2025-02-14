import usePageName from '@/hooks/usePageName'
import ProductItemHorizontal from '../../product/components/ProductItemHorizontal'
import ProfileImage from '../components/ProfileImage'
import { useFollowingList } from '@/apis/member'
import { useFollowingAuctions } from '@/apis/auction'

function SubscriptionsPage() {
  usePageName('모아보기')

  const { data: followings } = useFollowingList()
  const { data: products } = useFollowingAuctions(
    followings
      ? followings.followings.map(following => following.memberId)
      : [],
  )

  return (
    <div>
      <div className='flex overflow-x-scroll space-x-4 py-4 px-2'>
        {followings?.followings.map(profile => (
          <div
            key={profile.nickname}
            className='flex flex-col w-[64px] items-center'
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
