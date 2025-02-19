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
import Spinner from '@/components/placeholder/Spinner.jsx'
import InlineSpinner from '@/components/placeholder/InlineSpinner.jsx'

function ProductListPage({ filters, isFavorite, sellerId }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const param = useMemo(() => {
    const newParams = {}
    searchParams.forEach((value, key) => {
      if (!value) return
      newParams[key] = value
    })
    newParams.isFavorite = isFavorite
    newParams.sellerId = sellerId
    if (
      newParams.sortType == 'createdAt' ||
      newParams.sortType == 'hammeredTime'
    ) {
      newParams.sortOrder = 'desc'
    }
    return newParams
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
                { value: 'ongoing', name: '경매중' },
                { value: 'upcoming', name: '경매예정' },
                // { value: 'ended', name: '경매종료' },
              ]}
              keyName={'status'}
              defaultName={'경매상태'}
            />
          </>
        )}
      </FilterBar>
      {isPending ? (
        <Spinner />
      ) : products.pages[0].auctionDetailProjection.length > 0 ? (
        <InfiniteScrollWrapper
          fetchNextPage={fetchNextPage}
          isPending={isPending}
          isFetching={isFetching}
        >
          {products.pages.map(product =>
            product.auctionDetailProjection.map((product, i) => (
              <ProductItemHorizontal key={i} product={product} />
            )),
          )}
          {isPending && <InlineSpinner />}
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
  sellerId: PropTypes.number,
}

export default ProductListPage
