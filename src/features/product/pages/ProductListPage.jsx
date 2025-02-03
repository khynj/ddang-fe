import { useState } from 'react'
import FilterChipArray from '../components/FilterChipArray.jsx'
import FilterChipBool from '../components/FilterChipBool.jsx'
import ProductItemHorizontal from '../components/ProductItemHorizontal.jsx'
import MaterialIcon from '@/components/icons/MaterialIcon.jsx'
import productsData from '../data/products.js'
import PropTypes from 'prop-types'
import FilterBar from '../../../components/FilterBar.jsx'

function ProductListPage({ filter = _ => _ }) {
  const [isBidding, setIsBidding] = useState(false)
  const [category, setCategory] = useState('')
  const [dealType, setDealType] = useState('')
  const products = productsData.filter(filter)
  return (
    <div className='flex flex-col'>
      <FilterBar>
        <FilterChipArray values={['거래방식', '직거래', '택배']} index={0} />
        <FilterChipArray values={['카테고리', '전자제품', '의류']} index={0} />
        <FilterChipBool
          text='경매중'
          value={isBidding}
          onChange={() => {
            setIsBidding(!isBidding)
          }}
        />
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
}

export default ProductListPage
