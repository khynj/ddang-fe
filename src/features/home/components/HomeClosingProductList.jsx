import { useSearchAuctions } from '@/apis/auction'
import HomeListHeader from './HomeListHeader'
import HomeProductItem from './HomeProductItem'
import ROUTES from '@/data/ROUTES'
import InfiniteScrollWrapper from '@/components/InfiniteScrollWrapper'

function HomeClosingProductList() {
  const { data: closingProducts, fetchNextPage, isPending } = useSearchAuctions({
    sortType: 'endTime',
    size: 4,
  })

  return (
    <section>
      <HomeListHeader
        title={`마감 임박`}
        to={`${ROUTES.PRODUCT_LIST}?sortType=endTime`}
        icon='local_fire_department'
      />
      <InfiniteScrollWrapper
        fetchNextPage={fetchNextPage}
        isPending={isPending}
      >
        <div className='grid grid-cols-2 gap-4'>
          {closingProducts?.pages.map(page =>
            page.auctionDetailProjection.map((product, i) => (
              <HomeProductItem key={i} product={product} />
            ))
          )}
        </div>
      </InfiniteScrollWrapper>
    </section>
  )
}

export default HomeClosingProductList
