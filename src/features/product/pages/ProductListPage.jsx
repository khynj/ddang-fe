import { useMemo, useState } from 'react'
import FilterChipArray from '../components/FilterChipArray.jsx'
import ProductItemHorizontal from '../components/ProductItemHorizontal.jsx'
import PropTypes from 'prop-types'
import FilterBar from '@/components/FilterBar.jsx'
import { useSearchAuctions } from '@/apis/auction.js'
import { useSearchParams } from 'react-router'
import CategoryPickerSmall from '@/components/modals/CategoryPickerSmall.jsx'
import Pagenated from '@/components/Pagenated.jsx'

function ProductListPage({ filters, isFavorite }) {
  const [searchParams] = useSearchParams()
  const params = {}
  searchParams.forEach((value, key) => {
    if (!value) return
    params[key] = value
  })

  const [sortType, setSortType] = useState(params.sortType || 'createdAt')
  const [deliveryMethod, setDeliveryMethod] = useState(
    params.deliveryMethod || 'any',
  )
  const [categoryId, setCategoryId] = useState(params.categoryId)
  const [status, setStatus] = useState(params.status || 'ongoing')

  const searchOptions = useMemo(() => {
    return {
      sortType,
      deliveryMethod,
      categoryId,
      status,
      isFavorite,
    }
  }, [sortType, deliveryMethod, categoryId, status, isFavorite])

  const { data: products } = useSearchAuctions(searchOptions)

  return (
    <div className='flex flex-col h-full'>
      <FilterBar sortType={sortType} setSortType={setSortType}>
        {filters && (
          <>
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
          </>
        )}
      </FilterBar>
      <Pagenated>
        {products?.auctionDetailProjection.map(product => (
          <ProductItemHorizontal key={product.auctionId} product={product} />
        ))}
      </Pagenated>
    </div>
  )
}

ProductListPage.propTypes = {
  filters: PropTypes.bool,
  isFavorite: PropTypes.bool,
}

export default ProductListPage
