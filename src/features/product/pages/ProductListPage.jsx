import { useEffect, useState } from 'react'
import FilterChipArray from '../components/FilterChipArray.jsx'
import FilterChipBool from '../components/FilterChipBool.jsx'
import ProductItemHorizontal from '../components/ProductItemHorizontal.jsx'
import productsData from '../data/products.js'
import PropTypes from 'prop-types'
import FilterBar from '../../../components/FilterBar.jsx'

function ProductListPage({ filter = _ => _, filters }) {
  const [isBidding, setIsBidding] = useState(false)
  const products = productsData.filter(filter)

  useEffect(() => {
    // get products by filters or param
  }, [])

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
        {products.map(product => (
          <ProductItemHorizontal key={product.auctionId} product={product} />
        ))}
      </div>
    </div>
  )
}

ProductListPage.propTypes = {
  filter: PropTypes.func,
  filters: PropTypes.bool,
}

export default ProductListPage
