import { useEffect, useState } from 'react'
import FilterChipArray from '../components/FilterChipArray.jsx'
import ProductItemHorizontal from '../components/ProductItemHorizontal.jsx'
import PropTypes from 'prop-types'
import FilterBar from '@/components/FilterBar.jsx'
import { useSearchAuctions } from '@/apis/auction.js'
import { useSearchParams } from 'react-router'
import CategoryPickerSmall from '@/components/modals/CategoryPickerSmall.jsx'
import InfiniteScrollWrapper from '@/components/InfiniteScrollWrapper.jsx'

function ProductListPage({ filters, isFavorite }) {
  const [searchParams] = useSearchParams()

  const [page, setPage] = useState(1)
  const [searchOptions, setSearchOptions] = useState({})
  const { data: newProducts } = useSearchAuctions({
    ...searchOptions,
    isFavorite,
  })

  const [products, setProducts] = useState([])

  useEffect(() => {
    setSearchOptions(prev => ({ ...prev, page }))
  }, [page])

  useEffect(() => {
    setProducts([])
    setPage(1)
    const params = {}
    searchParams.forEach((value, key) => {
      if (!value) return
      params[key] = value
    })
  }, [searchParams])

  useEffect(() => {
    if (newProducts) {
      if (page == 1) setProducts(newProducts.auctionDetailProjection)
      else
        setProducts(prev => {
          return [...prev, ...newProducts.auctionDetailProjection]
        })
    }
  }, [newProducts, page])

  return (
    <div className='flex flex-col h-full'>
      <FilterBar key={'sortType'}>
        {filters && (
          <>
            <FilterChipArray
              values={[
                { value: 'any', name: '직거래/택배' },
                { value: 'direct', name: '직거래' },
                { value: 'package', name: '택배' },
              ]}
              key={'deliveryMethod'}
            />
            <CategoryPickerSmall key={'categoryId'} />
            <FilterChipArray
              values={[
                { value: 'ongoing', name: '경매중' },
                { value: 'upcoming', name: '경매예정' },
                { value: 'ended', name: '경매종료' },
              ]}
              key={'status'}
            />
          </>
        )}
      </FilterBar>
      <InfiniteScrollWrapper setPage={setPage}>
        {products.map((product, i) => (
          <ProductItemHorizontal key={i} product={product} />
        ))}
      </InfiniteScrollWrapper>
    </div>
  )
}

ProductListPage.propTypes = {
  filters: PropTypes.bool,
  isFavorite: PropTypes.bool,
}

export default ProductListPage
