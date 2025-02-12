import { useMemo, useState } from 'react'
import usePageName from '@/hooks/usePageName'
import ProductItemHorizontal from '../../product/components/ProductItemHorizontal'
import ProfileImage from '../components/ProfileImage'
import FilterChipArray from '../../product/components/FilterChipArray'
import FilterBar from '@/components/FilterBar'
import { useFollowingList } from '@/apis/member'
import { useFollowingAuctions } from '@/apis/auction'
import CategoryPickerSmall from '@/components/modals/CategoryPickerSmall'

function SubscriptionsPage() {
  const [sortType, setSortType] = useState('createdAt')
  const [deliveryMethod, setDeliveryMethod] = useState('any')
  const [categoryId, setCategoryId] = useState()
  const [status, setStatus] = useState('ongoing')

  const searchOptions = useMemo(() => {
    return {
      sortType,
      deliveryMethod,
      categoryId,
      status,
    }
  }, [sortType, deliveryMethod, categoryId, status])

  usePageName('모아보기')

  const { data: followings } = useFollowingList()
  const { data: products } = useFollowingAuctions(
    followings
      ? followings.followings.map(following => following.memberId)
      : [],
    searchOptions,
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

      <FilterBar sortType={sortType} setSortType={setSortType}>
        <FilterChipArray
          values={[
            { value: 'any', name: '직거래/택배' },
            { value: 'direct', name: '직거래' },
            { value: 'package', name: '택배' },
          ]}
          value={deliveryMethod}
          setValue={setDeliveryMethod}
        />
        <CategoryPickerSmall value={categoryId} setValue={setCategoryId} />
        <FilterChipArray
          values={[
            { value: 'ongoing', name: '경매중' },
            { value: 'upcoming', name: '경매예정' },
            { value: 'ended', name: '경매종료' },
          ]}
          value={status}
          setValue={setStatus}
        />
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
