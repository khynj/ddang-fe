import { useEffect, useState } from 'react'
import FilterChipArray from '../components/FilterChipArray.jsx'
import FilterChipBool from '../components/FilterChipBool.jsx'
import ProductItemHorizontal from '../components/ProductItemHorizontal.jsx'
import PropTypes from 'prop-types'
import FilterBar from '../../../components/FilterBar.jsx'
import { useSearchAuctions } from '@/apis/auction.js'
import { useSearchParams } from 'react-router'

function ProductListPage({ filters }) {
  const [isBidding, setIsBidding] = useState(false)
  const [searchParams] = useSearchParams()

  const params = {}
  searchParams.forEach((value, key) => {
    if (!value) return
    params[key] = value
  })

  const { data: products } = useSearchAuctions(params)

  return (
    <div className='flex flex-col'>
      <FilterBar>
        {filters && (
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
}

export default ProductListPage
