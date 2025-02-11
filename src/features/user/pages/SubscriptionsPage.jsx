import { useState } from 'react'
import usePageName from '@/hooks/usePageName'
import ProductItemHorizontal from '../../product/components/ProductItemHorizontal'
import ProfileImage from '../components/ProfileImage'
import FilterChipArray from '../../product/components/FilterChipArray'
import FilterBar from '@/components/FilterBar'
import FilterChipBool from '../../product/components/FilterChipBool'
import { useFollowingList } from '@/apis/member'
import { useFollowingAuctions } from '@/apis/auction'

function SubscriptionsPage() {
  const [isBidding, setIsBidding] = useState(false)
  usePageName('모아보기')

  const { data: followings } = useFollowingList()
  const { data: products } = useFollowingAuctions(
    followings
      ? followings.followings.map(following => following.memberId)
      : [],
  )

  // useEffect(() => {
  //   if (!followings) return
  // }, [followings])

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

      <FilterBar>
        {
          <>
            <FilterChipArray
              values={['거래방식', '직거래', '택배']}
              index={0}
            />
            <FilterChipArray
              values={['카테고리', '전자제품', '의류']}
              index={0}
            />
            <FilterChipBool
              text='경매중'
              value={isBidding}
              onChange={() => {
                setIsBidding(!isBidding)
              }}
            />
          </>
        }
      </FilterBar>

      <div>
        {products?.map((product, index) => (
          <ProductItemHorizontal key={index} product={product} />
        ))}
      </div>
    </div>
  )
}

export default SubscriptionsPage
