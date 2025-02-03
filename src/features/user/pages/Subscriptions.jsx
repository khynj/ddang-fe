import { useState } from 'react'
import usePageName from '../../../hooks/usePageName'
import ProductItemHorizontal from '../../product/components/ProductItemHorizontal'
import products from '../../product/data/products'
import ProfileImage from '../components/ProfileImage'
import SubscriptionsProfiles from '../data/SubscriptionsProfiles'
import SubscriptionsFilters from '../data/SubscriptionsFilters'
import FilterChipArray from '../../product/components/FilterChipArray'

function Subscriptions() {
  usePageName('모아보기')

  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0)

  return (
    <div>
      <div className='flex overflow-x-scroll space-x-4 py-4 px-2'>
        {SubscriptionsProfiles.map(profile => (
          <div key={profile.memberId} className='flex flex-col items-center'>
            <ProfileImage src={profile.photo} size={60} />
            <p
              className='text-sm mt-2 truncate w-16 text-center'
              title={profile.nickname}
            >
              {profile.nickname}
            </p>
          </div>
        ))}
      </div>

      <div className='flex py-4 px-2'>
        {SubscriptionsFilters.map((filter, index) => (
          <div
            key={index}
            onClick={() => setSelectedFilterIndex(index)}
            className={`cursor-pointer ${
              selectedFilterIndex === index
                ? 'font-semibold text-blue-500'
                : 'text-gray-500'
            }`}
          >
            <FilterChipArray values={SubscriptionsFilters} index={index} />
          </div>
        ))}
      </div>

      <div>
        {products.map((product, index) => (
          <ProductItemHorizontal key={index} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Subscriptions
