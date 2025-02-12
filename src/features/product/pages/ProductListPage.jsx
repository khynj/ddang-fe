import { useMemo, useState } from 'react'
import FilterChipArray from '../components/FilterChipArray.jsx'
import FilterChipBool from '../components/FilterChipBool.jsx'
import ProductItemHorizontal from '../components/ProductItemHorizontal.jsx'
import PropTypes from 'prop-types'
import FilterBar from '../../../components/FilterBar.jsx'
import { useSearchAuctions } from '@/apis/auction.js'
import { useSearchParams } from 'react-router'
import CategoryPicker from '@/components/modals/CategoryPicker.jsx'

function ProductListPage({ filters, params = {} }) {
  const [searchParams] = useSearchParams()
  searchParams.forEach((value, key) => {
    if (!value) return
    params[key] = value
  })

  const [sortType, setSortType] = useState(params.sortType || 'createdAt')
  const [deliveryMethod, setDeliveryMethod] = useState(
    params.deliveryMethod || 'any',
  )
  const [categoryId, setCategoryId] = useState(null)
  const [status, setStatus] = useState(false)

  const searchOptions = useMemo(() => {
    return {
      ...params,
      sortType,
      deliveryMethod,
      categoryId,
      status,
    }
  }, [params, sortType, deliveryMethod, categoryId, status])

  const { data: products } = useSearchAuctions(searchOptions)

  return (
    <div className='flex flex-col'>
      <FilterBar sortType={sortType} setSortType={setSortType}>
        {filters && (
          <>
            <FilterChipArray
              values={[
                { value: 'any', name: '거래방식' },
                { value: 'direct', name: '직거래' },
                { value: 'package', name: '택배' },
              ]}
              value={deliveryMethod}
              setValue={setDeliveryMethod}
            />
            <CategoryPicker value={categoryId} setValue={setCategoryId} />
            <FilterChipArray
              values={[
                { value: '', name: '경매중' },
                { value: '', name: '경매예정' },
                { value: '', name: '경매종료' },
              ]}
              value={status}
              setValue={setStatus}
            />
          </>
        )}
      </FilterBar>
      <div className='flex flex-col'>
        {products?.auctionDetailProjection.map(product => (
          <ProductItemHorizontal key={product.auctionId} product={product} />
        ))}
      </div>
    </div>
  )
}

ProductListPage.propTypes = {
  filters: PropTypes.bool,
  params: PropTypes.object,
}

export default ProductListPage
