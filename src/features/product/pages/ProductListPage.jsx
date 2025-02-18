import { useEffect, useMemo } from 'react'
import FilterChipArray from '../components/FilterChipArray.jsx'
import ProductItemHorizontal from '../components/ProductItemHorizontal.jsx'
import PropTypes from 'prop-types'
import FilterBar from '@/components/FilterBar.jsx'
import { useSearchAuctions } from '@/apis/auction.js'
import { useSearchParams } from 'react-router'
import CategoryPickerSmall from '@/components/modals/CategoryPickerSmall.jsx'
import InfiniteScrollWrapper from '@/components/InfiniteScrollWrapper.jsx'
import Placeholder from '@/components/placeholder/Placeholder.jsx'

function ProductListPage({ filters, isFavorite, sellerId }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const param = useMemo(() => {
    const params = {}
    searchParams.forEach((value, key) => {
      if (!value) return
      params[key] = value
    })
    params.isFavorite = isFavorite
    params.sellerId = sellerId
    return params
  }, [searchParams, isFavorite, sellerId])

  const {
    data: products,
    fetchNextPage,
    isPending,
    isFetching,
  } = useSearchAuctions(param)

  useEffect(() => {
    setSearchParams(
      params => {
        params.get('sortType') || params.set('sortType', 'createdAt')
        return params
      },
      { replace: true },
    )
  }, [searchParams, setSearchParams])
  console.log(products)
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
              defaultName={'배송방식'}
            />
            <CategoryPickerSmall
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
            <FilterChipArray
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              options={[
                // { value: 'any', name: '경매상태' },
                { value: 'ongoing', name: '경매중' },
                { value: 'upcoming', name: '경매예정' },
                { value: 'ended', name: '경매종료' }, // todo
              ]}
              keyName={'status'}
              defaultName={'경매상태'}
            />
          </>
        )}
      </FilterBar>
      {products && products.pages[0].length > 0 ? (
        <InfiniteScrollWrapper
          fetchNextPage={fetchNextPage}
          isPending={isPending}
          isFetching={isFetching}
        >
          {products?.pages.map(product =>
            product.auctionDetailProjection.map((product, i) => (
              <ProductItemHorizontal key={i} product={product} />
            )),
          )}
        </InfiniteScrollWrapper>
      ) : (
        <Placeholder>상품이 없어요.</Placeholder>
      )}
    </div>
  )
}

ProductListPage.propTypes = {
  filters: PropTypes.bool,
  isFavorite: PropTypes.bool,
}

export default ProductListPage
