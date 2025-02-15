import { useEffect, useMemo, useState } from 'react'
import FilterChipArray from '../components/FilterChipArray.jsx'
import ProductItemHorizontal from '../components/ProductItemHorizontal.jsx'
import PropTypes from 'prop-types'
import FilterBar from '@/components/FilterBar.jsx'
import { useSearchAuctions } from '@/apis/auction.js'
import { useSearchParams } from 'react-router'
import CategoryPickerSmall from '@/components/modals/CategoryPickerSmall.jsx'
import InfiniteScrollWrapper from '@/components/InfiniteScrollWrapper.jsx'

function ProductListPage({ filters, isFavorite }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  const param = useMemo(() => {
    console.log(searchParams, page, isFavorite)
    const params = {}
    searchParams.forEach((value, key) => {
      if (!value) return
      params[key] = value
    })
    params.page = page
    params.isFavorite = isFavorite
    return params
  }, [searchParams, page, isFavorite])

  const { data: newProducts } = useSearchAuctions(param)

  useEffect(() => {
    setSearchParams(
      params => {
        params.get('sortType') || params.set('sortType', 'createdAt')
        searchParams.get('deliveryMethod') ||
          params.set('deliveryMethod', 'any')
        searchParams.get('status') || params.set('status', 'ongoing')

        return params
      },
      { replace: true },
    )
    setPage(1)
  }, [searchParams, setSearchParams])

  useEffect(() => {
    if (newProducts) {
      if (page == 1) setProducts(newProducts.auctionDetailProjection)
      else
        setProducts(prev => [...prev, ...newProducts.auctionDetailProjection])
    }
  }, [newProducts, page])

  return (
    <div className='flex flex-col h-full'>
      <FilterBar
        keyName={'sortType'}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      >
        {filters && (
          <>
            <FilterChipArray
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              options={[
                { value: 'any', name: '직거래/택배' },
                { value: 'direct', name: '직거래' },
                { value: 'package', name: '택배' },
              ]}
              keyName={'deliveryMethod'}
            />
            <CategoryPickerSmall
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
            <FilterChipArray
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              options={[
                { value: 'ongoing', name: '경매중' },
                { value: 'upcoming', name: '경매예정' },
                { value: 'ended', name: '경매종료' }, // todo
              ]}
              keyName={'status'}
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
