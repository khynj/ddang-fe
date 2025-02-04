import { useState } from 'react'
import usePageName from '../../../hooks/usePageName'
import ProductItemHorizontal from '../../product/components/ProductItemHorizontal'
import products from '../../product/data/products'
import ProfileImage from '../components/ProfileImage'
import SubscriptionsProfiles from '../data/SubscriptionsProfiles'
import SubscriptionsFilters from '../data/SubscriptionsFilters'
import FilterChipArray from '../../product/components/FilterChipArray'
import FilterBar from '../../../components/FilterBar'
import FilterChipBool from '../../product/components/FilterChipBool'

function Subscriptions() {
  usePageName('모아보기')

  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0)

  return (
    <div>
      <div className='flex overflow-x-scroll space-x-4 py-4 px-2'>
        {SubscriptionsProfiles.map(profile => (
          <div
            key={profile.memberId}
            className='flex flex-col w-[64px] items-center'
          >
            <ProfileImage src={profile.photo} size={60} />
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
            <FilterChipBool text='경매중' />
          </>
        }
      </FilterBar>

      <div>
        {products.map((product, index) => (
          <ProductItemHorizontal key={index} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Subscriptions
